/**
 * @property {Number}         current_page   Determine the current page being paginated.
 * @property {Number}         from           Get the number of the first item in the slice.
 * @property {Number}         to             Get the number of the last item in the slice.
 * @property {Number}         total          Determine the total number of items in the data store.
 * @property {Number}         last_page      Get the page number of the last available page.
 * @property {Number}         per_page       Determine how many items are being shown per page.
 * @property {String}         next_page_url  The URL for the next page, or null.
 * @property {String}         prev_page_url  Get the URL for the previous page, or null.
 * @property {Array.<Entity>} items          Collection of items if paging results.
 */
export default class PagingResult {
  constructor (response) {
    this.current_page = response.current_page | 0
    this.from = response.from | 0
    this.to = response.to | 0
    this.total = response.total | 0
    this.last_page = response.last_page | 0
    this.per_page = response.per_page | 0

    this.next_page_url = response.next_page_url
    this.prev_page_url = response.prev_page_url

    this.items = []
  }

  /**
   * Convert server response to PagingResult object
   *
   * @param {Object} response
   * @param {Function} resolver
   * @returns {PagingResult}
   */
  static handle (response, resolver = i => i) {
    let result = new PagingResult(response)
    response.data.forEach(row => {
      let entity = resolver(row)
      result.items.push(entity)
    })

    return result
  }
}