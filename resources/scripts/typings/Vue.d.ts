import Vue from 'vue'
import {Logger} from '../Helpers/Logger'

declare module 'vue/types/vue' {
  interface Vue {
    $logger: Logger
  }

  namespace Vue {
    let logger: Logger
  }
}
