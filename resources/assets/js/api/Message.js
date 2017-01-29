import { messageRoute } from '../router/routes'
import Entity from './Entity'

/**
 * @property {String}  subject
 * @property {String}  body
 * @property {Boolean} is_read
 * @property {Number}  importance_level
 * @property {String}  type
 * @property {String}  from_name
 * @property {String}  to_name
 * @property {String}  created_at
 * @property {String}  date_from_now
 * @property {Number}  reply
 * @property {Number}  reply_count
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
    this.to_name = data.to_name
    this.created_at = data.created_at
    this.date_from_now = data.date_from_now
    this.reply = data.reply
    this.reply_count = data.reply_count
    if (data.reply_on) {
      this.reply_on = new Message(data.reply_on)
    }

    this.isOpen = false
    this.colors = {
      10: 'not-important',
      9: 'semi-not-important',
      8: 'middle-important',
      7: 'semi-important'
    }
  }

  readRoute () {
    const id = this.id
    return {...messageRoute, params: {id}}
  }

  colorClass () {
    let color = this.colors[this.importance_level] || 'important'

    return `text-${color}`
  }
}
