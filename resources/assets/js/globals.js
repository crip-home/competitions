import Vue from 'vue'

import focusDirective from './directives/focus'
import loadingDirective from './directives/loading'
import CKEditor from './components/helpers/CKEditor.vue'
import Panel from './components/helpers/Panel.vue'
import FormPanel from './components/helpers/forms/Panel.vue'
import FormGroup from './components/helpers/forms/FormGroup.vue'
import SubmitArea from './components/helpers/forms/SubmitArea.vue'
import Datepicker from './components/helpers/bootstrap/Datepicker.vue'
import Select2 from './components/helpers/Select2.vue'
import Paging from './components/helpers/grid/Paging.vue'
import NavbarItems from './components/helpers/bootstrap/nav/NavbarItems.vue'
import Grid from './components/helpers/grid/Grid.vue'

export default {
    init() {
        Vue.directive('focus', focusDirective);
        Vue.directive('loading', loadingDirective);
        Vue.component('ckeditor', CKEditor);
        Vue.component('panel', Panel);
        Vue.component('form-panel', FormPanel);
        Vue.component('form-group', FormGroup);
        Vue.component('submit', SubmitArea);
        Vue.component('date-picker', Datepicker);
        Vue.component('select2', Select2);
        Vue.component('paging', Paging);
        Vue.component('navbar-items', NavbarItems);
        Vue.component('grid', Grid);
    }
}