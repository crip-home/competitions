import settings from './../settings'

/**
 * @param {String} type
 * @param {Array.<*>} args
 * @param {String} [section]
 * @private
 */
const _log = (type, args, section = 'global') => {
    const logType = settings.logs;

    if (!~settings.logSections.indexOf(section))
        return;

    if (logType === 'console')
        return _consoleLog(type, args);
};

/**
 * @param {String} type
 * @param {Array.<*>} args
 * @private
 */
const _consoleLog = (type, args) => {
    if (console && console[type])
        console[type].apply(console, args);
};

/**
 * Log arguments
 *
 * @param {...*} args
 */
export const log = (...args) => {
    _log('log', args);
};

/**
 * Log informational arguments
 *
 * @param {...*} args
 */
export const info = (...args) => {
    _log('info', args, 'info');
};

/**
 * Log error arguments
 *
 * @param {...*} args
 */
export const error = (...args) => {
    _log('error', args, 'error');
};

/**
 * Section log allows to log messages to sections
 *
 * @param {String} section
 * @returns {function}
 */
export function sLog(section) {
    return function (...args) {
        args.unshift(section);
        _log('log', args, section);
    };
}
