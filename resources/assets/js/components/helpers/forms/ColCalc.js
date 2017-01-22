const offset = Symbol('offset')

export default {
  [offset] (size, mediaSize) {
    const space = 12 - size
    if (space === 0)
      return 12

    let col = (space / 2) + 1
    if ((col + size) >= 12)
      col -= 1
    return col
  },

  /**
   * Calculate class for label
   *
   * @param {number} size Size taken by input
   * @param {string} mediaSize Media query where apply calculation (xs|sm|md|lg)
   * @returns {string} Class like 'col-sm-4'
   */
  label (size, mediaSize) {
    return `col-${mediaSize}-${this[offset](size, mediaSize)}`
  },

  /**
   * Calculate class for form-control
   *
   * @param {number} size Size taken by input
   * @param {string} mediaSize Media query where apply calculation (xs|sm|md|lg)
   * @returns {string} Class like 'col-sm-8'
   */
  control (size, mediaSize) {
    return `col-${mediaSize}-${size}`
  },

  /**
   * Calculate class for element under form-control
   *
   * @param {number} size Size taken by input
   * @param {string} mediaSize Media query where apply calculation (xs|sm|md|lg)
   * @returns {string} Class like 'col-sm-8 col-sm-offset-2'
   */
  space (size, mediaSize) {
    return `col-${mediaSize}-${size} col-${mediaSize}-offset-${this[offset](size, mediaSize)}`
  }
}