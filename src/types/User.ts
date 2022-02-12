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