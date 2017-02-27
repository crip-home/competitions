import Entity from './Entity'
import User from './User'
import Team from './Team'
import { editTeamMember } from '../router/routes'

/**
 * @property {Number}  user_id
 * @property {Number}  team_id
 * @property {String}  name
 * @property {String}  membership_type
 * @property {User}   [user]
 * @property {Team}   [team]
 */
export default class TeamMember extends Entity {
  constructor (data) {
    super(data)

    this.user_id = data.user_id
    if (data.user) {
      this.user = new User(data.user)
    }

    this.team_id = data.team_id
    if (data.team) {
      this.team = new Team(data.team)
    }

    this.name = data.name
    this.membership_type = data.membership_type
  }

  static get activeMemberType () { return 'member' }

  static get invitedMemberType () { return 'invited' }

  /**
   * Determines is the member in active state
   * @returns {boolean}
   */
  get isActive () { return this.membership_type === TeamMember.activeMemberType }

  /**
   * Determines is the member in invited state
   * @returns {boolean}
   */
  get isInvited () { return this.membership_type === TeamMember.invitedMemberType }

  /**
   * Generates route to edit current member
   * @returns {{name: string, params: {id: Number}}}
   */
  get editRoute () { return {...editTeamMember, params: {id: this.id}} }
}
