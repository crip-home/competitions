/**
 * @property {Number} id
 * @property {Object} created
 * @property {String} created.at
 * @property {String} created.by
 * @property {String} created.name
 * @property {Object} updated
 * @property {String} updated.at
 * @property {String} updated.by
 * @property {String} updated.name
 */
export default class Entity {
  /**
   * @param {Object} data
   * @param {Number} data.id
   * @param {Number} data.created_by
   * @param {Number} data.updated_by
   * @param {String} data.created_at
   * @param {String} data.updated_at
   * @param {String} data.created_by_name
   * @param {String} data.updated_by_name
   */
  constructor (data) {
    this.id = data.id

    this.created = {
      at: data.created_at,
      by: data.created_by,
      name: data.created_by_name
    }

    this.updated = {
      at: data.updated_at,
      by: data.updated_by,
      name: data.updated_by_name
    }
  }
}