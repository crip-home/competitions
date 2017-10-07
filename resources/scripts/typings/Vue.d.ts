import Vue from 'vue'
import {ILogger} from '../Helpers/Logger'

declare module 'vue/types/vue' {
    interface Vue {
        $log: ILogger
    }

    namespace Vue {
        let log: ILogger
    }
}