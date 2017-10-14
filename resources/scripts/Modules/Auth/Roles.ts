export const SUPER_ADMIN = 'SUPER_ADMIN'

export const CREATE_POST = 'CREATE_POST'
export const MANAGE_POSTS = 'MANAGE_POSTS'
export const posts = [CREATE_POST, MANAGE_POSTS]

export const CREATE_TEAMS = 'CREATE_TEAMS'
export const teams = [CREATE_TEAMS]

export const EDIT_COMPETITIONS = 'EDIT_COMPETITIONS'
export const CREATE_COMPETITIONS = 'CREATE_COMPETITIONS'
export const competitions = [EDIT_COMPETITIONS, CREATE_COMPETITIONS]

export const all = [
  SUPER_ADMIN,
  ...posts,
  ...teams,
  ...competitions,
]