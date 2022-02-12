export const apiConfig = {
  baseUrl: () => {
    // TODO FIX ENV VARS
    return process.env.API_BASE_URL || 'https://user-api-stagin.herokuapp.com/api'
  },
  session: {
    signUp: () => '/session/sign-up',
    signIn: () => '/session/login'
  },
  users: {
    loadUser: (id: string) => `/users/${id}`,
    loadAll: () => '/users',
    delete: (id: number) => `/users/${id}`,
    save: (id: number | string) => `/users/${id}`
  }
}