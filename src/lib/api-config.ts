import env from './env';

const apiConfig = {
  baseUrl: () => {
    return env.API_BASE_URL || 'http://localhost:4000/api';
  },
  session: {
    signUp: () => '/session/sign-up',
    signIn: () => '/session/login',
  },
  users: {
    loadUser: (id: string) => `/users/${id}`,
    loadAll: () => '/users',
    delete: (id: number) => `/users/${id}`,
    save: (id: number | string) => `/users/${id}`,
  },
};

export default apiConfig;
