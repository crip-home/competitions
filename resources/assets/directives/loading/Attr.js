import help from '../../help'

export default {
  /**
   * Get attribute value from DOM Node or default value
   * @param {Element} el Element where allocate value
   * @param {string} attrKey Attribute key
   * @param {string|object|number} [defaultValue]
   * @returns {*}
   */
  getOrDefault (el, attrKey, defaultValue = '') {
    if (!el || !el.getAttribute) { return defaultValue }

    const value = el.getAttribute(attrKey)
    if (help.hasValue(value)) { return value }

    return defaultValue
  },

  /**
   * Get data attribute value from DOM Node or default value
   * @param {Element} el Element where allocate value
   * @param {string} dataAttrKey data attribute key
   * @param {string|object|number} [defaultValue]
   * @returns {*}
   */
  dataOrDefault (el, dataAttrKey, defaultValue = '') {
    return this.getOrDefault(el, `data-${dataAttrKey}`, defaultValue)
  }
}
