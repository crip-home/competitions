import Vue from 'vue'

import CKEditor from './modules/helpers/forms/CKEditor.vue'
import Datepicker from './modules/helpers/bootstrap/Datepicker.vue'
import FilesysModal from './modules/helpers/forms/FilesysModal.vue'
import FormErrors from './modules/helpers/forms/FormErrors.vue'
import FormGroup from './modules/helpers/forms/FormGroup.vue'
import FormPanel from './modules/helpers/forms/FormPanel.vue'
import Gravatar from './modules/user/Gravatar.vue'
import Grid from './modules/helpers/grid/Grid.vue'
import NavbarItems from './modules/helpers/bootstrap/nav/NavbarItems.vue'
import Paging from './modules/helpers/grid/Paging.vue'
import Panel from './modules/helpers/panel/Panel.vue'
import PanelAction from './modules/helpers/panel/PanelAction.vue'
import Select2 from './modules/helpers/forms/select2/Select2.vue'
import SubmitArea from './modules/helpers/forms/SubmitArea.vue'
import Tab from './modules/helpers/bootstrap/tabs/Tab.vue'
import Tabs from './modules/helpers/bootstrap/tabs/Tabs.vue'

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
