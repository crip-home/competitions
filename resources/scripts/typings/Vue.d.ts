import Vue from 'vue'
import {ILogger} from '../Helpers/Logger'

declare module 'vue/types/vue' {
    interface Vue {
        $logger: ILogger
    }

    namespace Vue {
        let logger: ILogger
    }
}
