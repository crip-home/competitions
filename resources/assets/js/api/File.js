import Entity from './Entity'

/**
 * @property {String} name
 * @property {String} short
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
