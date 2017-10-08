import {LocaleMessageObject} from 'vue-i18n'
import {NavLang} from '@/Components/Nav/Lang'
import {PostsLang} from '@/Modules/Posts/Lang'
import {AuthLang} from '@/Modules/Auth/Lang'

export interface GlobalLang extends LocaleMessageObject {
  locale: string
  appTitle: string
  posts: PostsLang,
  nav: NavLang,
  auth: AuthLang,
}