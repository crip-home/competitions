window.noop = () => {};
$.fn.select2.defaults.set('theme', 'bootstrap');

import Vue from 'vue'
import VueResource from 'vue-resource'
import * as Lang from './lang'

Lang.checkLocale();
Vue.use(VueResource);

import router from './router'
import guard from './router/guard'
import store from './store'
import App from './components/App.vue'

guard.start();

Vue.http.interceptors.push((request, next) => {
    request.headers.set('X-CSRF-TOKEN', Laravel.csrfToken);

    next();
});

import focusDirective from './directives/focus'
import loadingDirective from './directives/loading'
import CKEditor from './components/helpers/CKEditor.vue'
import Panel from './components/helpers/Panel.vue'
import FormPanel from './components/helpers/forms/Panel.vue'
import FormGroup from './components/helpers/forms/FormGroup.vue'
import SubmitArea from './components/helpers/forms/SubmitArea.vue'
import Datepicker from './components/helpers/bootstrap/Datepicker.vue'
import Select2 from './components/helpers/Select2.vue'
import Paging from './components/helpers/paging/Paging.vue'

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

let app = new Vue(Vue.util.extend({
    router,
    store
}, App));

app.$mount('#app');