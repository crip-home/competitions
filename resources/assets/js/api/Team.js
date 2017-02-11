import Entity from './Entity'
import File from './File'
import {
  listTeamMembers, editTeam, createTeamMember,
  publicTeamDetailsRoute
} from '../router/routes'

/**
 * @property {String} name
 * @property {String} short
 */
export default class Team extends Entity {
  constructor (data) {
    super(data)

    this.name = data.name
    this.short = data.short
    this.logo_id = data.logo_id
    this.created_from_now = data.created_from_now
    if (data.logo) {
      this.logo = new File(data.logo)
    }
  }

  /**
   * Gets route to open current team edit route
   * @returns {{name: string, params: {id: Number}}}
   */
  get editRoute () { return {...editTeam, params: {id: this.id}} }

  /**
   * Gets route to list current team members
   * @returns {{name: string, params: {team: Number}}}
   */
  get membersListRoute () { return {...listTeamMembers, params: {team: this.id}} }

  /**
   * Gets route to create new current team member
   * @returns {{name: string, params: {team: Number}}}
   */
  get newMemberRoute () { return {...createTeamMember, params: {team: this.id}} }

  /**
   * Gets route to public team details screen
   * @returns {{params: {team: Number}}}
   */
  get pDetailsRoute () { return {...publicTeamDetailsRoute, params: {tab: 'members', team: this.id}} }
}
