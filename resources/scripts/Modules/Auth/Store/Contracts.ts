export interface Role {
  key: string
}

export interface UpdateUserDetails {
  name: string
  email: string
  id: number
  roles: Array<Role>
}

export interface User {
  authenticated: boolean
  details: boolean
  name: string
  email: string
  id: number
}

export interface State {
  user: User
  roles: Array<string>
}