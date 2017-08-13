import Attr from './Attr'
import Node from './Node'

const show = Symbol('show')
const hide = Symbol('hide')

export default class {
  /**
   * Initialize Handler class object
   * @param {Element} el
   * @param {object} binding
   */
  constructor (el, binding) {
    this.el = el
    this.binding = binding

    this.static = false
    this.loadingBox = null
    this.first = true
    this.text = Attr.dataOrDefault(el, 'text', 'Loading ...')
    this.bg = Attr.dataOrDefault(el, 'bg', 'rgba(230, 233, 236, 0.8)')
  }

  /**
   * Define method in binding and start listen dom events
   */
  bind () {
    this.binding.def.onChange = value => {
      if (value) {
        this.first = false
        this[show]()
      } else {
        if (this.first) {
          this.first = false
          return
        }
        this[hide]()
      }
    }
  }

  /**
   * Show loading box element
   */
  [show] () {
    if (this.el.getElementsByClassName('v-loading').length === 0) {
      let position = window.getComputedStyle(this.el).position
      if (position === 'static' || position === '') {
        this.static = true
        this.el.style.position = 'relative'
      }

      let box = Node.create({className: 'v-loading', bg: this.bg})
      this.el.appendChild(box)

      let msg = Node.create({className: 'v-loading-msg', text: this.text})
      box.appendChild(msg)

      window.requestAnimationFrame(() => {
        box.style.opacity = 1
      })

      this.loadingBox = box
    }
  }

  /**
   * Hide loading box element
   */
  [hide] () {
    if (this.loadingBox) {
      this.loadingBox.addEventListener('transitionend', _ => {
        if (this.loadingBox.parentElement) {
          this.loadingBox.parentElement.removeChild(this.loadingBox)
        }

        if (this.static) {
          this.el.style.removeProperty('position')
        }
      })

      this.loadingBox.style.opacity = 0.01
    }
  }
}
