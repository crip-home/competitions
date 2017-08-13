import help from '../../help'

export default {
  /**
   * Create new Element object
   * @param {string} [options.tag ] Created element tag name
   * @param {string} [options.bg] Background color
   * @param {string} [options.text] Element text content
   * @param {string} [options.className] Element class
   * @returns {Element}
   */
  create (options) {
    const {tag = 'div', bg, text, className} = options
    let node = document.createElement(tag)
    if (help.hasValue(className)) { node.className = className }

    if (help.hasValue(bg)) { node.style.backgroundColor = bg }

    if (help.hasValue(text)) { node.textContent = text }

    return node
  }
}
