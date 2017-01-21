import Entity from './Entity'
import {list_team_members, edit_team, create_team_member} from '../router/routes'

/**
 * @property {String} name
 * @property {String} short
 */
export default class Team extends Entity {
    constructor(data) {
        super(data);

        this.name = data.name;
        this.short = data.short;
    }

    /**
     * @returns {{name: string, params: {id: Number}}}
     */
    editRoute() {
        const id = this.id;
        return {
            name: edit_team.name,
            params: {id}
        }
    }

    /**
     * Generates route to list current team members
     * @returns {{name: string, params: {team: Number}}}
     */
    membersListRoute() {
        const id = this.id;
        return {
            ...list_team_members,
            params: {team: id, ...list_team_members}
        };
    }

    /**
     * Generates route to create new current team member
     * @returns {{name: string, params: {team: Number}}}
     */
    newMemberRoute() {
        const team = this.id;
        return {
            ...create_team_member,
            params: {team}
        }
    }
}