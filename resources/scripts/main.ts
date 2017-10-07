import axios from 'axios'
import Vue from 'vue'

import {installer as LoggerInstaller} from './Helpers/Logger'
import settings from './Settings'

Vue.use(LoggerInstaller, settings.logger)
