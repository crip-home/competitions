import settings from '../../../../settings'

export default class Select2Options {
  constructor (options = [], initialSelection = false) {
    this.initialSelection = initialSelection

    if (options.length > 0) {
      this.data = options
    }

    this.asSerchable()
  }

  /**
   * Configure select2 component to load selection data from server
   * @param {String}   url
   * @param {Function} resultMap Mapper to convert server data object to select2 compatible ({id, text})
   * @param {Number}   delay Delay for request frequency
   * @returns {Select2Options}
   */
  asAjax ({url, resultMap, delay = 250}) {
    this.ajax = {
      url,
      delay,
      headers: {
        Authorization: settings.getAuthToken()
      },
      processResults ({data}) {
        return {
          results: data.map(resultMap)
        }
      }
    }

    return this
  }

  /**
   * Configure option to make available creation of
   * new element in existing selection
   * @param {Boolean} value Flag to enable/disable tags property
   * @returns {Select2Options}
   */
  asTagable (value = true) {
    this.tags = value
    this.createTag = tag => {
      return {
        id: tag.term,
        text: tag.term,
        // add indicator:
        isNew: true
      }
    }

    return this
  }

  /**
   * Configure option to make search unavailable on UI
   * @param {Boolean} value Flag to enable/disable search property
   * @returns {Select2Options}
   */
  asSerchable (value = true) {
    if (value) {
      this.minimumResultsForSearch = 0
    } else {
      this.minimumResultsForSearch = Infinity
    }

    return this
  }
}
