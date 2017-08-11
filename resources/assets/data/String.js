class Initializer {
  init () {
    if (!String.prototype.supplant) {
      String.prototype.supplant = function (o) {
        return this.replace(/\{([^{}]*)\}/g, (a, b) => {
          let r = o[b]
          return typeof r === 'string' || typeof r === 'number' ? r : a
        }
        )
      }
    }
  }
}

export default new Initializer()
