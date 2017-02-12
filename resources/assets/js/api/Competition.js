import Entity from './Entity'
import User from './User'

export default class Competition extends Entity {
  constructor (data) {
    super(data)
    this.ambulance = data.ambulance
    this.cooperation = data.cooperation
    this.equipment = data.equipment
    this.invitation = data.invitation
    this.judge_id = data.judge_id
    this.judge_name = data.judge_name
    if (data.judge) {
      this.judge = new User(data.judge)
    }
    this.organization_date = data.organization_date
    this.price = data.price
    this.prizes = data.prizes
    this.program = data.program
    this.registration_till = data.registration_till
    this.rules = data.rules
    this.subtitle = data.subtitle
    this.title = data.title
  }
}