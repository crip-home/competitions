export default class Tabs {
  constructor () {
    this.items = []
  }

  /**
   * Add new tab in to current tabs collection
   * @param tab
   */
  add (tab) {
    if (this.items.length === 0) {
      tab.select()
    }
    this.items.push(tab)
  }
}
