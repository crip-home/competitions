import {LocaleMessageObject} from 'vue-i18n'
import {PostsLang} from '@/Modules/Posts/Lang'
import {NavLang} from '@/Components/Nav/Lang'

export interface GlobalLang extends LocaleMessageObject {
  locale: string
  appTitle: string
  posts: PostsLang,
  nav: NavLang,
}