# Process Flow: Next.js Authentication

This document outlines the end-to-end process of how a user is created, authenticated, and verified using your Next.js application.

---
## 1. User Creation and Authentication (NextAuth Integration)

### 1.1 Registration Flow
  You can create users for now by running the script command:
  
  ```powershell
    npx tsx app/utils/createUsers.ts
  ```

### 3.2 Authentication Flow (NextAuth)

- **User Authentication:**  
  - NextAuth is configured with a credentials provider (and optionally with OAuth providers) to authenticate users.
  - The `GetUserByEmail` function fetches the user record from the API.
  - The provided password is verified against the stored hashed password using bcrypt.
    
- **Session & JWT Management:**  
  - On successful authentication, NextAuth stores essential user data (such as the user ID) in the session and JWT token.
  
- **Route Protection:**  
  - Middleware intercepts requests to protected routes (e.g., `/list`) and redirects unverified or unauthenticated users to `/` or for now just displaying UnAuthorized message.

---

## Summary Flow Diagram

```mermaid
flowchart TD
    A[Create users by running createUsers.ts script]
    A --> B[Insert users records into users.json file]
    B --> C[NextAuth Authenticates User on Login]
    C --> D[JWT & Session Creation ]
    D --> E[Middleware Checks session, redirect to the List Page]
    E --> F[UI Renders the List Page]

```
## Detailed Process Sequence Diagram
```mermaid
sequenceDiagram
    %% Participants
    participant U as User
    participant C as Client (Browser)
    participant M as Middleware (/middleware.ts)
    participant LP as Landing (/app/page.tsx)
    participant NA as NextAuth (/api/auth/[...nextauth]/route.ts)
    participant API as API (UserService)
    participant DB as Database (users.json)
    participant LST as ListPage (/list)

    %% 1. Users Creation
    U->>C: Manually creates the users.json file
    C->>API: Call create user API
    API->>DB: Store user record in users.json
    
    %% 2. Login Process
    U->>C: Enters email & password in login form
    C->>NA: Sends credentials to NextAuth
    NA->>API: Fetch user by email
    API->>DB: Retrieve user details from users.json
    API->>NA: Return user details
    NA->>C: Validate password with bcrypt
    NA->>C: Issue JWT & session token

    %% 3. Landing & Auto Sign‑In
    C->>M: Requests landing page
    M->>NA: Check session status
    NA-->>M: User is authenticated
    M->>C: Allow access to protected routes
    C->>LP: Render landing page

    %% 4. Navigate to Dashboard
    U->>C: Clicks "Go to List Page"
    C->>M: Middleware validates session
    M->>NA: Check session
    NA-->>M: Session valid
    M->>C: Allow access to /list
    C->>LST: Render list page

```
---
## Conclusion

This process flow integrates the following components:

- User Creation & Authentication (NextAuth):
Handles manual creation of users and authenticates users only after logging in.

---

This document provides a comprehensive understanding of how sunvoy web application components interact, from users creation through authentication. 
