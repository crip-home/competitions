import Vue from 'vue'

import CKEditor from './components/forms/CKEditor.vue'
import Datepicker from './components/bootstrap/Datepicker.vue'
import FilesysModal from './components/forms/FilesysModal.vue'
import FormErrors from './components/forms/FormErrors.vue'
import FormGroup from './components/forms/FormGroup.vue'
import FormPanel from './components/forms/FormPanel.vue'
import Gravatar from './modules/user/Gravatar.vue'
import Grid from './components/grid/Grid.vue'
import NavbarItems from './components/bootstrap/nav/NavbarItems.vue'
import Paging from './components/grid/Paging.vue'
import Panel from './components/panel/Panel.vue'
import PanelAction from './components/panel/PanelAction.vue'
import Select2 from './components/forms/select2/Select2.vue'
import SortTH from './components/grid/SortTableHeader.vue'
import SubmitArea from './components/forms/SubmitArea.vue'
import Tab from './components/bootstrap/tabs/Tab.vue'
import Tabs from './components/bootstrap/tabs/Tabs.vue'

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
    Vue.component('sort-th', SortTH)

    Vue.directive('focus', focusDirective)
    Vue.directive('loading', loadingDirective)
  }
}
