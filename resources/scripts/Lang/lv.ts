import {GlobalLang} from './GlobalLang'
import nav from '@/Components/Nav/Lang/lv'
import posts from '../Modules/Posts/Lang/lv'
import auth from '../Modules/Auth/Lang/lv'

export default {
  locale: 'LV',
  appTitle: 'Sacensību Administrātors',
  api: {
    actionNotAllowed: 'Darbība nav atļauta',
    unknownHttpError: 'Nezināma komunikācijas kļūda',
    unexpectedError: 'Nezināma iekšējā kļūda'
  },
  posts, nav, auth,
} as GlobalLang