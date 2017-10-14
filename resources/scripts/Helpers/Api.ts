import Vue from 'vue'
import {AxiosResponse} from 'axios'
import settings from '@/Settings'
import store from '@/Store'
import router from '@/Router'
import {login} from '@/Router/Routes'
import Utils from '@/Helpers/Utils'
import {i18n} from '@/Lang'
import {LogoutPayload} from '@/Modules/Auth/Store/Contracts'

const web = settings.web

type Dictionary<T> = { [key: string]: T }

interface UrlParams {
  path: string
  params?: Dictionary<string>
  urlReplace?: Dictionary<string>
}

export class Api {
  public static url({path, params = {}, urlReplace = {}}: UrlParams) {
    let url = path.replace(new RegExp('^[\\/]+'), '')
    url = `${web.domain}/${web.apiRoot}${url}`
    url = Utils.supplant(url, urlReplace)

    Object.keys(params).forEach(index => {
      let val = params[index]
      if (Utils.hasValue(val)) {
        url = Api.addParameter(url, index, val)
      }
    })

    return url
  }

  /**
   * Handle application error.
   * @param error
   */
  public static handle(error) {
    if (error && error.response) {
      Api.handleHttpError(error.response)
    }

    Vue.logger.error('Api.handle -> unknown', error)

    throw i18n.t('api.unexpectedError')
  }

  /**
   * Add GET parameter to url string.
   * @param {string} url
   * @param {string} param
   * @param {string} value
   * @returns {string}
   */
  private static addParameter(url: string, param: string, value: string) {
    // Using a positive lookahead (?=\=) to find the
    // given parameter, preceded by a ? or &, and followed
    // by a = with a value after than (using a non-greedy selector)
    // and then followed by a & or the end of the string
    const val = new RegExp(`(\\?|\\&)${param}=.*?(?=(&|$))`)
    const parts = url.toString().split('#')
    const hash = parts[1]
    const qstring = /\?.+$/
    let newURL = url = parts[0]

    // Check if the parameter exists
    if (val.test(url)) {
      // if it does, replace it, using the captured group
      // to determine & or ? at the beginning
      newURL = url.replace(val, `$1${param}=${value}`)
    } else if (qstring.test(url)) {
      // otherwise, if there is a query string at all
      // add the param to the end of it
      newURL = `${url}&${param}=${value}`
    } else {
      // if there's no query string, add one
      newURL = `${url}?${param}=${value}`
    }

    if (hash) {
      // if hash exists, append it to new url
      newURL += `#${hash}`
    }

    return newURL
  }

  /**
   * Handle http error and throw details.
   * @param {AxiosResponse} response
   */
  private static handleHttpError(response: AxiosResponse) {
    if (response.status !== 422) {
      Api.handleUnexpectedHttpError(response)
      return
    }

    Vue.logger.log('Api.error -> validation', response.data)

    // Simply throw validation response data.
    throw response.data
  }

  /**
   * Handle unexpected http error and handle its details.
   * @param {AxiosResponse} response
   */
  private static handleUnexpectedHttpError(response: AxiosResponse) {
    switch (response.status) {
      case 401:
        Vue.logger.error('Api.http -> unauthorized', response.data)
        store.commit<LogoutPayload>({type: 'logout'})

        // Redirect user to login page, but with query to current path. This
        // will allow redirect user to expected route after authorization will
        // be completed.
        router.push({
          ...login,
          query: {redirect: router.currentRoute.fullPath}
        })
        break
      case 403:
      case 405:
        Vue.logger.log('Api.http -> not allowed', response)
        // TODO: send this as email to admin to be able detect users who is
        // trying hack app or some places has not enough protection and simple
        // user can open it and create not allowed requests.
        throw i18n.t('api.actionNotAllowed')
      default:
        Vue.logger.log('Api.http -> unknown', response)
        // TODO: send this as email to admin to be able detect unexpected http
        // errors.
        throw i18n.t('api.unknownHttpError')
    }
  }
}