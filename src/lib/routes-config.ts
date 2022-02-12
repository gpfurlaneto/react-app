export const routesConfig = {
  session: {
    signIn: () => '/session/signin',
    loadUser: () => '/session/user'
  },
  home: () => '/home',
  users: {
    list: () => '/users',
    form: (id?: number) => `/users/form/${id || ''}`
  }
}