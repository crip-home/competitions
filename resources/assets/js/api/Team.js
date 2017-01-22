import Entity                                          from './Entity'
import { listTeamMembers, editTeam, createTeamMember } from '../router/routes'

/**
 * @property {String} name
 * @property {String} short
 */
export default class Team extends Entity {
  constructor (data) {
    super(data)

    this.name = data.name
    this.short = data.short
  }

  /**
   * @returns {{name: string, params: {id: Number}}}
   */
  editRoute () {
    const id = this.id
    return {
      name: editTeam.name,
      params: {id}
    }
  }

  /**
   * Generates route to list current team members
   * @returns {{name: string, params: {team: Number}}}
   */
  membersListRoute () {
    const id = this.id
    return {
      ...listTeamMembers,
      params: {team: id, ...listTeamMembers}
    }
  }

  /**
   * Generates route to create new current team member
   * @returns {{name: string, params: {team: Number}}}
   */
  newMemberRoute () {
    const team = this.id
    return {
      ...createTeamMember,
      params: {team}
    }
  }
}