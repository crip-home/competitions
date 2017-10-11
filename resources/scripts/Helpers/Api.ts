import settings from '@/Settings'
import Utils from '@/Helpers/Utils'

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

  public static handle(error) {
    console.log(error)
  }

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
}