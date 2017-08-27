import Entity from './Entity'
import User from './User'
import settings from '../settings'

/**
 * @property {String} title
 * @property {String} subtitle
 * @property {String} ambulance
 * @property {String} cooperation
 * @property {String} equipment
 * @property {String} invitation
 * @property {String} price
 * @property {String} prizes
 * @property {String} program
 * @property {String} rules
 * @property {Number} judge_id
 * @property {String} judge_name
 * @property {User}   [judge]
 * @property {Number} [organization_date]
 * @property {Number} [registration_till]
 */
export default class Competition extends Entity {
  constructor (data) {
    super(data)
    Object.assign(this, data)

    this.organizationDate = settings.parseServerDate(data.organization_date)
    this.registrationTill = settings.parseServerDate(data.registration_till)

    if (data.judge) {
      this.judge = new User(data.judge)
    }
  }
}
