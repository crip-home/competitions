import Entity from './Entity'

/**
 * @property {String} name
 * @property {String} extension
 * @property {String} mimetype
 * @property {String} [thumb]
 * @property {String} [xs]
 */
export default class File extends Entity {
  constructor (data) {
    super(data)

    this.name = data.name
    this.extension = data.extension
    this.mimetype = data.mimetype

    if (data.payload && data.payload.thumbs) {
      this.thumb = data.payload.thumbs.thumb
      this.xs = data.payload.thumbs.xs
    }
  }
}
