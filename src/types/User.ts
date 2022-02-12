export interface User {
  id: number,
  username: string
  email: string
}

export interface UserSignIn {
  user: User,
  token: string
}

export interface SignInPayload {
  username: string
  password: string,
}

export interface UserPayload {
  username: string
  email: string
  password?: string
}