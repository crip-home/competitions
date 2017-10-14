import {GlobalLang} from './GlobalLang'
import nav from '@/Components/Nav/Lang/en'
import posts from '@/Modules/Posts/Lang/en'
import auth from '@/Modules/Auth/Lang/en'

export default {
  locale: 'EN',
  appTitle: 'Competition Manager',
  api: {
    actionNotAllowed: 'Action is not allowed',
    unknownHttpError: 'Unknown communication error occurred',
    unexpectedError: 'Unexpected error occurred',
  },
  posts, nav, auth,
} as GlobalLang