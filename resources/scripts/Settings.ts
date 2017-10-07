import {ILoggerOptions} from './Helpers/Logger'

const logger: ILoggerOptions = {
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

export default {
  logger,
  defaultLocale: 'lv',
}
