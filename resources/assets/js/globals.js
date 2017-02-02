import Vue from 'vue'

import focusDirective from './directives/focus'
import loadingDirective from './directives/loading'
import Datepicker from './components/helpers/bootstrap/Datepicker.vue'
import NavbarItems from './components/helpers/bootstrap/nav/NavbarItems.vue'
import Modal from './components/helpers/bootstrap/Modal.vue'
import Panel from './components/helpers/panel/Panel.vue'
import PanelAction from './components/helpers/panel/PanelAction.vue'
import FormPanel from './components/helpers/forms/FormPanel.vue'
import FormGroup from './components/helpers/forms/FormGroup.vue'
import FormErrors from './components/helpers/forms/FormErrors.vue'
import SubmitArea from './components/helpers/forms/SubmitArea.vue'
import CKEditor from './components/helpers/forms/CKEditor.vue'
import Select2 from './components/helpers/forms/select2/Select2.vue'
import Paging from './components/helpers/grid/Paging.vue'
import Grid from './components/helpers/grid/Grid.vue'

export default {
  init () {
    Vue.directive('focus', focusDirective)
    Vue.directive('loading', loadingDirective)
    Vue.component('date-picker', Datepicker)
    Vue.component('navbar-items', NavbarItems)
    Vue.component('modal', Modal)
    Vue.component('panel', Panel)
    Vue.component('panel-action', PanelAction)
    Vue.component('form-panel', FormPanel)
    Vue.component('form-group', FormGroup)
    Vue.component('form-errors', FormErrors)
    Vue.component('submit', SubmitArea)
    Vue.component('ckeditor', CKEditor)
    Vue.component('select2', Select2)
    Vue.component('paging', Paging)
    Vue.component('grid', Grid)

    Vue.http.interceptors.push((request, next) => {
      request.headers.set('X-CSRF-TOKEN', Laravel.csrfToken)

      next()
    })
  }
}
