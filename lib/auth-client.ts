import { createAuthClient } from "better-auth/react"

export const { signIn, signUp, useSession, forgetPassword, resetPassword } = createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL
})
