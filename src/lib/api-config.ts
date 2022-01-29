export const apiConfig = {
  baseUrl: () => 'https://user-api-stagin.herokuapp.com/api',
  session: {
    signUp: () => '/session/sign-up',
    signIn: () => '/session/login'
  },
  toDo: {
    base: () => '/to-do'
  }
}