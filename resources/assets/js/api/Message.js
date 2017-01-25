import Entity from './Entity'

/**
 * @property {String} subject
 */
export default class Message extends Entity {
  constructor (data) {
    super(data)

    this.subject = data.subject
    this.body = data.body
    this.is_read = data.is_read
    this.importance_level = data.importance_level
    this.type = data.type
    this.from_name = data.from_name
    this.created_at = data.created_at
    this.date_from_now = data.date_from_now
  }
}
