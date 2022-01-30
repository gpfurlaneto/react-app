export const apiConfig = {
  baseUrl: () => {
    console.log(process.env.API_BASE_URL)
    return process.env.API_BASE_URL || 'http://localhost:4000/api'
  },
  session: {
    signUp: () => '/session/sign-up',
    signIn: () => '/session/login'
  },
  toDo: {
    base: () => '/to-do'
  }
}