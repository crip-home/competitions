import Vue from 'vue'

import CKEditor from './components/helpers/forms/CKEditor.vue'
import Datepicker from './components/helpers/bootstrap/Datepicker.vue'
import FilesysModal from './components/helpers/forms/FilesysModal.vue'
import FormErrors from './components/helpers/forms/FormErrors.vue'
import FormGroup from './components/helpers/forms/FormGroup.vue'
import FormPanel from './components/helpers/forms/FormPanel.vue'
import Gravatar from './components/user/Gravatar.vue'
import Grid from './components/helpers/grid/Grid.vue'
import Modal from './components/helpers/bootstrap/Modal.vue'
import NavbarItems from './components/helpers/bootstrap/nav/NavbarItems.vue'
import Paging from './components/helpers/grid/Paging.vue'
import Panel from './components/helpers/panel/Panel.vue'
import PanelAction from './components/helpers/panel/PanelAction.vue'
import Select2 from './components/helpers/forms/select2/Select2.vue'
import SubmitArea from './components/helpers/forms/SubmitArea.vue'
import Tab from './components/helpers/bootstrap/tabs/Tab.vue'
import Tabs from './components/helpers/bootstrap/tabs/Tabs.vue'

import focusDirective from './directives/focus'
import loadingDirective from './directives/loading'

export default {
  init () {
    Vue.component('ckeditor', CKEditor)
    Vue.component('date-picker', Datepicker)
    Vue.component('FilesysModal', FilesysModal)
    Vue.component('form-errors', FormErrors)
    Vue.component('form-group', FormGroup)
    Vue.component('form-panel', FormPanel)
    Vue.component('gravatar', Gravatar)
    Vue.component('grid', Grid)
    Vue.component('modal', Modal)
    Vue.component('navbar-items', NavbarItems)
    Vue.component('paging', Paging)
    Vue.component('panel', Panel)
    Vue.component('panel-action', PanelAction)
    Vue.component('select2', Select2)
    Vue.component('submit', SubmitArea)
    Vue.component('tab', Tab)
    Vue.component('tabs', Tabs)

    Vue.directive('focus', focusDirective)
    Vue.directive('loading', loadingDirective)

    Vue.http.interceptors.push((request, next) => {
      /* request.headers.set('X-CSRF-TOKEN', Laravel.csrfToken) */

      next()
    })
  }
}
