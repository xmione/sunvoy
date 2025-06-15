# Sunvoy Web Application
- This web application is developed as a solution to https://challenge.sunvoy.com/ challenge.
- It implements the following:
    - NextAuth.js for authentication 
    - router and session for navigation and user validation.
    - users.json file, /app/api/auth/[...nextauth].router.ts for api functions like fetching data.
- It initially implemented the Page router but eventually switched to App router for a more flexible and modern solution.
- Next improvements:
    - Use a separate middleware.ts to manage the routing and authentication.
    - Use a nav_link.tsx and sideNave.tsx files to handle the side panel menus for many menu and submenu items.
    - Use a dbService.ts and dbClient.ts for handling database services and database connections and transactions.
    - Use ML as an App Assistant.

## Build and Run

### If you want to run the compiled version:
```powershell
    pnpm build
    pnpm start
```

### If you want to debug while running the code:

```powershell
    pnpm dev
```

### If you want to expose your production web app:

```powershell
    pnpm build
    pnpm starttunnel
```

### If you want to expose your production web app while debugging:

```powershell
    pnpm devtunnel
```

### Note: For exposing your web app using your local tunnel, see the [Steps - How to Expose Your Local Web App to the Web.md](Docs/Steps%20-%20How%20to%20Expose%20Your%20Local%20Web%20App%20to%20the%20Web.md) document.

## Other documentations:

[Steps - Development Environment Setup.md](Docs/Steps%20%-%20%Development%20%Environment%20%Setup.md) document.

[Process Flow - Next.js Authentication.md](Docs/Process%20Flow%20-%20Next.js%20Authentication.md) document.

[Steps - How to Expose Your Local Web App to the Web.md](Docs/Steps%20-%20How%20to%20Expose%20Your%20Local%20Web%20App%20to%20the%20Web.md) document.

[Video Link](https://www.loom.com/share/b437458930484b3f8977c58450065a5e?sid=ad5203c4-7d2d-40b1-9f3f-8315e260386c)