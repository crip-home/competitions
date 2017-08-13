export default {
  /**
   * Install log in to vue object.
   * @param                 Vue
   * @param {Object}        options
   * @param {String}        options.logs
   * @param {Array<String>} options.logSections
   */
  install (Vue, options) {
    const log = new Log(options)
    Vue.log = log

    Object.defineProperties(Vue.prototype, {
      '$log': {get: () => log}
    })
  }
}

const log = Symbol('log')
const consoleLog = Symbol('consoleLog')
const isInSection = Symbol('isInSection')

class Log {
  constructor (settings) {
    this.logType = settings.logs
    this.sections = settings.logSections
  }

  /**
   * Log a message
   * @param args
   */
  log (...args) {
    this[log]('log', args)
  }

  /**
   * Log informational message.
   * @param args
   */
  info (...args) {
    this[log]('info', args, 'info')
  }

  /**
   * Log error message.
   * @param args
   */
  error (...args) {
    this[log]('error', args, 'error')
  }

  /**
   * Predefine section for a logs.
   * @param   {String} section
   * @param   {String} [type]
   * @returns {function(...[*]=)}
   */
  group (section, type = 'log') {
    return (...args) => {
      args.unshift(section)
      this[log](type, args, section)
    }
  }

  /**
   * Log all major values of component
   * @param vm   Component view model instance
   * @param args Additional arguments to be logged
   */
  component (vm, ...args) {
    let route = {...vm.$route.params, path: vm.$route.fullPath}

    this[log](
      'debug', [`component ${vm.$options.name}`, {route}, ...args], 'component'
    )
  }

  [log] (type, args, section = 'global') {
    if (!this[isInSection](section)) { return }

    if (this.logType === 'console') {
      return this[consoleLog](type, args)
    }
  }

  [consoleLog] (type, args) {
    if (window.console && console[type]) {
      console[type].apply(console, args)
    }
  }

  [isInSection] (section) {
    return ~this.sections.indexOf(section)
  }
}
