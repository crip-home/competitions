import {LocaleMessageObject} from 'vue-i18n'
import {NavLang} from '@/Components/Nav/Lang'
import {PostsLang} from '@/Modules/Posts/Lang'
import {AuthLang} from '@/Modules/Auth/Lang'

interface Api extends LocaleMessageObject {
  actionNotAllowed: string
  unknownHttpError: string
  unexpectedError: string
}

export interface GlobalLang extends LocaleMessageObject {
  locale: string
  appTitle: string
  api: Api
  posts: PostsLang
  nav: NavLang
  auth: AuthLang
}