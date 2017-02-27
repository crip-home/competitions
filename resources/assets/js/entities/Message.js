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
 * @property {string} userMessageType
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
    this.to_id = data.to_id
    this.to_name = data.to_name
    this.created_at = data.created_at
    this.date_from_now = data.date_from_now
    this.reply = data.reply
    this.reply_count = data.reply_count
    this.payload = data.payload
    if (data.reply_on) {
      this.reply_on = new Message(data.reply_on)
    }

    this.isOpen = false
  }

  /**
   * Gets user message type identifier
   * @returns {string}
   */
  static get userMessageType () { return 'USER_MESSAGE' }

  /**
   * Gets team member invitation type identifier
   * @returns {string}
   */
  static get teamMemberInvitationType () { return 'TEAM_MEMBER_INVITATION' }

  /**
   * Gets available colors for message importance level
   * @returns {{10: string, 9: string, 8: string, 7: string, 6: string}}
   */
  static get colors () {
    return {
      10: 'not-important',
      9: 'semi-not-important',
      8: 'middle-important',
      7: 'semi-important',
      6: 'important'
    }
  }

  /**
   * Determines is the current type of user message
   * @returns {boolean}
   */
  get isUserMessage () { return this.type === Message.userMessageType }

  /**
   * Determines is the current type of team member invitation
   * @returns {boolean}
   */
  get isTeamMemberInvitation () { return this.type === Message.teamMemberInvitationType }

  /**
   * Gets current importance level color class
   * @returns {string}
   */
  get colorClass () { return `text-${Message.colors[this.importance_level] || 'important'}` }

  /**
   * Get current message read route
   * @returns {{params: {id: Number}}}
   */
  get readRoute () { return {...messageRoute, params: {id: this.id}} }
}
