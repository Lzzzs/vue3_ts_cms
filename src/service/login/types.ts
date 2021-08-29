export interface ILoginForm {
  name: string
  password: string
}

export interface ILoginResult {
  token: string
  id: number
  name: string
}
