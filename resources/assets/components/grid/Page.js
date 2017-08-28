export default class Page {
  /**
   * @param {*} [text]
   * @param {Number} [nr]
   */
  constructor (text = '', nr = 1) {
    this.text = text
    this.nr = nr
  }

  /**
   * @param {Number} current
   * @returns {Page}
   */
  static prev (current) {
    let nr = current > 1 ? current - 1 : 1
    return new Page('«', nr)
  }

  /**
   * @param {Number} current
   * @param {Number} last
   * @returns {Page}
   */
  static next (current, last) {
    let nr = current < last ? current + 1 : last
    return new Page('»', nr)
  }

  isCurr (curr) {
    return (this.nr | 0) === (curr | 0)
  }

  isDisabled (curr) {
    return this.isCurr(curr) && (this.text | 0) === 0
  }

  isActive (curr) {
    return !this.isDisabled(curr) && this.isCurr(curr)
  }
}
