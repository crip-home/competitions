import Entity from './Entity'
import User from './User'
import Select2Options from '../components/helpers/forms/select2'

const states = Symbol('states')

/**
 * @property {String}          title
 * @property {String}          body
 * @property {String}          short_body
 * @property {String}          image
 * @property {String}          publish_at
 * @property {String}          date_from_now
 * @property {Number}          author_id
 * @property {String}          locale
 * @property {User}           [author]
 */
export default class Post extends Entity {
  constructor (data) {
    super(data)

    this.title = data.title
    this.body = data.body
    this.short_body = data.short_body
    this.image = data.image
    this.state = data.state
    this.publish_at = data.publish_at
    this.date_from_now = data.date_from_now
    this.author_id = data.author_id
    this.locale = data.locale
    if (data.author) {
      this.author = new User(data.author)
    }

    this[states] = [
      'DRAFT',
      'PENDING',
      'PRIVATE',
      'PUBLISHED',
      'TRASH'
    ]
  }

  static stateSelectOptions ($t) {
    let post = new Post({})
    let options = []
    post[states].forEach(state => {
      options.push({id: state, text: $t(`entities.post.states.${state}`)})
    })

    return (new Select2Options(options)).asSerchable(false)
  }
}
