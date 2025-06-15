import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { SessionStrategy } from "next-auth";
import { isMatched } from "@/app/lib/globalfunctions";
import UserService from "@/app/services/UserService";
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "demo@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const userService = new UserService(process.env.BASE_URL);
        const user = await userService.GetUserByEmail(credentials?.email ?? "");
        const hashedPassword = credentials?.password?.toString() ?? "";
        const matched = await isMatched(hashedPassword, user.password);
        return credentials?.email === user.email && matched ? user : null;
      }
    })
  ],
  session: { strategy: "jwt" as SessionStrategy }, 
});

export { handler as GET, handler as POST };