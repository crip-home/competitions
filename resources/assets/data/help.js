export default {
  /**
   * Determines is value undefined
   * @param value
   * @returns {boolean}
   */
  isUndefined (value) {
    return typeof value === 'undefined'
  },

  /**
   * Determines is value defined
   * @param value
   * @returns {boolean}
   */
  isDefined (value) {
    return !this.isUndefined(value)
  },

  /**
   * Determines is value defined as javascript function
   * @param {*} func
   * @returns {Boolean}
   */
  isFunction (func) {
    const getType = {}
    return (
      this.isDefined(func) &&
      getType.toString.call(func) === '[object Function]'
    )
  },

  /**
   * Determines is value empty
   * @param value
   * @returns {boolean}
   */
  isEmpty (value) {
    /* eslint-disable no-self-compare */
    return this.isUndefined(value) || value === '' || value === null || value !== value
  },

  /**
   * Determines is value in object
   * @param value
   * @returns {boolean}
   */
  hasValue (value) {
    return !this.isEmpty(value)
  },

  /**
   * Determines is object containing properties chain
   * @param {object} object
   * @param {...string} properties
   * @returns {boolean}
   */
  hasProperty (object, properties) {
    let a = arguments

    if (a.length === 0 || this.isEmpty(a[0])) { return false }

    let target = a[0]
    for (let arg in a) {
      if (arg === '0') { continue }

      if (!target.hasOwnProperty(a[arg])) { return false }

      target = target[a[arg]]
      if (this.isUndefined(target)) { return false }
    }

    return true
  },

  /**
   * Generates random guid like string
   * @returns {string}
   */
  newGuid () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      let r = Math.random() * 16 | 0
      let v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  }
}
