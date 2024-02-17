namespace NodeJS {
  interface ProcessEnv extends nodeJS.ProcessEnv {
      NEXTAUTH_SECRET: string
      NEXTAUTH_URL: string
  }
}