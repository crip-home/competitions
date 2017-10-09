import {LoggerOptions} from './Helpers/Logger'

const logger: LoggerOptions = {
  logs: 'console',
  logSections: [
    'global',
    'api',
    'component',
    'error',
    'info',
    // Uncomment line below to see all changes in select2 helper.
    // 'select2',
  ],
}

const web = {
  domain: 'http://crip-competitions.dev',
  apiRoot: `api/`,
  serverDateFormat: 'YYYY-MM-DD HH:mm:ss',
}

export default {
  logger, web,
  defaultLocale: 'lv',
}
