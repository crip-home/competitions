import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from './en'
import lv from './lv'

Vue.use(VueI18n);

Vue.config.lang = 'lv';
Vue.config.fallbackLang = 'en';

export const translations = {en, lv};

export const locales = {
    lv: {key: 'lv', text: translations.lv.locale},
    en: {key: 'en', text: translations.en.locale},
};

export function checkLocale() {
    const locale = localStorage.getItem('locale');
    if (locale) {
        setLocale(locale);
    }
}

export function setLocale(locale = 'lv') {
    // set locale only if it is in set of defined locales
    if (!!~Object.keys(locales).indexOf(locale)) {
        localStorage.setItem('locale', locale);
        Vue.config.lang = locale;
    }
}

// set locales
Object.keys(translations).forEach(function (lang) {
    Vue.locale(lang, translations[lang])
});