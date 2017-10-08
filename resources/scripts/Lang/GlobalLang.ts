import {LocaleMessageObject} from 'vue-i18n'
import {PostsLang} from '../Modules/Posts/Lang'

export interface GlobalLang extends LocaleMessageObject {
  locale: string
  appTitle: string
  posts: PostsLang
}