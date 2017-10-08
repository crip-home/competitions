import {Route} from '@/Router/Routes'

export type NavItemType = NavItem | NavGroup

export interface NavOptions {
  route?: Route
  href?: string
  click?: () => void
  divider?: boolean
  text?: string
  isActive?: boolean
}

export class NavItem {
  isActive: boolean
  divider: boolean
  text: string

  route?: Route
  href?: string
  click?: () => void

  constructor(options: NavOptions = {
    text: '',
    divider: false,
    isActive: false
  }) {
    this.route = options.route
    this.href = options.href
    this.click = options.click
    this.divider = options.divider
    this.text = options.text
    this.isActive = options.isActive
  }
}

export class NavGroup {
  public items: NavItemType[]
  public parent: { text: string }

  constructor(text: string, items: NavItemType[] = []) {
    this.parent = {text}
    this.items = items
  }

  add(item: NavItemType) {
    this.items.push(item)
  }

  create(options: NavOptions = {
    text: '',
    divider: false,
    isActive: false
  }) {
    this.items.push(new NavItem(options))
  }
}
