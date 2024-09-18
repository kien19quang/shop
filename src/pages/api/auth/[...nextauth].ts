import UserService from "@/services/UserService";
import NextAuth, { NextAuthOptions } from "next-auth"
import { Provider } from "next-auth/providers";
import Credentials from "next-auth/providers/credentials";


const providers: Provider[] = [
  Credentials({
    id: 'credentials',
    name: 'Credentials',
    credentials: {
      email: {
        label: 'Email',
        type: 'text'
      },
      password: {
        label: 'Password',
        type: 'passord'
      },
    },
    authorize: async (credentials: Record<"email" | "password", string> | undefined, req) => {
      if (!credentials?.email || !credentials?.password) {
        throw new Error('Bạn cần điền đầy đủ thông tin');
      }

      const result = await UserService.login({
        email: credentials.email,
        password: credentials.password,
      })

      if (result?.error_message) {
        throw new Error('Vui lòng kiểm tra lại thông tin đăng nhập');
      }

      return result
    }
  })
]

export const authOptions: NextAuthOptions = {
  providers,
  callbacks: {
    jwt: async({token, user, account, trigger}) => {
      if (trigger === 'signIn') {
        const data: any = user
        const dataUser = (user as any).user
        token.email = dataUser.email
        token.name = dataUser.fullname
        token.role = dataUser.role
        token.accessToken = data.accessToken
        token.exp = data.expiresIn
      }
      return token;
    },
    session: async({session, token}) => {
      session.accessToken = token.accessToken;
      session.user.id = token.sub as any
      session.user.role = token.role
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
    error: '/_error'
  },
  logger: {
    error(code, metadata) {
      console.log(code, metadata)
    },
    warn(code) {
      console.log(code)
    },
    debug(code, metadata) {
      console.log(code, metadata)
    },
  },
  secret: process.env.NEXTAUTH_SECRET
}

export default NextAuth(authOptions)