import Entity from './../Entity'
import {list_team_members, edit_team} from './../../router/routes'

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
     * @returns {{name: string, params: {team: Number}}}
     */
    membersListRoute() {
        const id = this.id;
        return {
            name: list_team_members.name,
            params: {
                team: id,
                page: list_team_members.page ? list_team_members.page : 1
            }
        };
    }
}