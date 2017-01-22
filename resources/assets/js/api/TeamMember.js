import Entity             from './Entity'
import User               from './User'
import Team               from './Team'
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
    if (data.user)
      this.user = new User(data.user)

    this.team_id = data.team_id
    if (data.team)
      this.team = new Team(data.team)

    this.name = data.name
    this.membership_type = data.membership_type
  }

  /**
   * Determines is the member already active
   *
   * @returns {boolean}
   */
  isActive () {
    return this.membership_type === 'member'
  }

  /**
   * Generates route to edit current member
   * @returns {{name: string, params: {id: Number}}}
   */
  editRoute () {
    const id = this.id
    return {...editTeamMember, params: {id}}
  }
}