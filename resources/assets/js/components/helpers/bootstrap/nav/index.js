/**
 * @property {Boolean|Object}   [route]
 * @property {Boolean|String}   [href]
 * @property {Boolean|Function} [click]
 * @property {Boolean}          [divider]
 * @property {String}           [text]
 */
export class NavbarItem {
  /**
   * @param {Boolean|String}         [text]
   * @param {Object|String|Function} [action]
   */
  constructor (text = '', action = false) {
    this.route = false
    this.href = false
    this.click = false
    this.divider = false
    this.text = text

    if (typeof text === 'boolean') {
      this.divider = text
    } else {
      if (typeof action === 'object') {
        this.route = action
      }

      if (typeof action === 'string') {
        this.href = action
      }

      if (typeof action === 'function') {
        this.click = action
      }
    }
  }
}
/**
 *
 * @param {...*} args
 * @returns {Array}
 * @private
 */
function _NavbarItems (...args) {
  let arr = new Array(...args)

  /**
   * @param {NavbarItem|NavbarGroup} item
   */
  arr.add = item => {
    arr.push(item)
  }

  return arr
}
/**
 * @property {Object}                         parent
 * @property {String}                         parent.text
 * @property {Array.<NavbarGroup|NavbarItem>} items
 */
export class NavbarGroup {
  /**
   * @param {String}                          text
   * @param {Array.<NavbarGroup|NavbarItem>} [items]
   */
  constructor (text, items = []) {
    this.parent = {text}
    this.items = new _NavbarItems(...items)
  }

  /**
   * Add new item or initiate constructor of NavbarItem
   * @param {NavbarGroup|NavbarItem} item
   */
  add (item) {
    if (item instanceof NavbarItem || item instanceof NavbarGroup) {
      this.items.add(item)
    } else {
      this.items.add(new NavbarItem(...arguments))
    }
  }
}
/**
 * @type {_NavbarItems<Array>}
 */
export const NavbarItems = _NavbarItems
