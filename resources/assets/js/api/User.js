import Entity from './Entity'

/**
 * @property {String} name
 */
export default class User extends Entity {
    constructor(data) {
        super(data);

        this.name = data.name;
    }
}