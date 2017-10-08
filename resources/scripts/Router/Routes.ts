export interface Route {
  name: string

  [key: string]: any
}

export const home: Route = {name: 'home'}

export const login: Route = {name: 'login'}
