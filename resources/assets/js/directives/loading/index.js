import Handler from './Handler'
import './styles.css'

export default {
  // Called only once, when the directive is first bound to the element
  bind (el, binding) {
    let handler = new Handler(el, binding)
    handler.bind()
  },

  // Called after the containing component has updated
  update (el, {def, value}) {
    def.onChange(value)
  }
}
