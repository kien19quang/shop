import { ERole } from "@/models/common";
import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      BACKEND_URL: string;
    }
  }
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: IUSer
    accessToken: string
    refreshToken: string;
    expiresIn: number;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    accessToken: string;
    refreshToken?: string;
    exp: number;
    role: string;
  }
}

interface IUSer {
  id: string;
  email: string;
  name: string;
  image: string;
  accessToken?: string;
  expiresIn?: number;
  role: string;
}