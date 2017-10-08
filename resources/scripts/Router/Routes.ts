export interface Route {
  name: string

  [key: string]: any
}

export const home: Route = {name: 'home'}

export const login: Route = {name: 'login'}
export const signup: Route = {name: 'signup'}
export const profile: Route = {name: 'profile'}
export const passwordReset: Route = {name: 'passwordReset'}

export const createPost: Route = {name: 'createPost'}
export const listPosts: Route = {name: 'listPosts'}

export const createTeam: Route = {name: 'createTeam'}
export const listTeams: Route = {name: 'listTeams'}

export const createCompetition: Route = {name: 'createCompetition'}
export const listCompetitions: Route = {name: 'listCompetitions'}