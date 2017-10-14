export interface Role {
  key: string
}

export interface Payload {
  type: string
}

export interface LogoutPayload extends Payload {
  type: 'logout'
}

export interface UpdateUserDetailsPayload extends Payload {
  type: 'updateAuthUserDetails'
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
