import {DirectiveOptions} from 'vue'

export default {
  // Called when the bound element has been inserted into its parent node (this only guarantees parent node presence,
  // not necessarily in-document).
  inserted: (el, {modifiers, value}) => {
    if (value) el.focus() || (modifiers.focusDone = true)
    else el.blur()
  },

  // Called after the containing component and its children have updated.
  componentUpdated: (el, {modifiers, value}) => {
    if (modifiers.focusDone) return

    if (value) el.focus() || (modifiers.focusDone = true)
    else el.blur()
  }
} as DirectiveOptions
