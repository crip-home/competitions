type Errors = { [key: string]: string[] }

export default class Form<T> {
  public unknownError: string = ''
  public errors: Errors
  public data: T

  public constructor(initialData: T) {
    this.data = initialData
    this.errors = {}
  }

  public get hasErrors() {
    return Object.keys(this.errors).length > 0 || this.hasUnknownError
  }

  public get hasUnknownError() {
    return this.unknownError != ''
  }

  public clearErrors() {
    this.unknownError = ''
    this.errors = {}
  }

  public addErrors(errors: Errors | string) {
    if (typeof errors === 'string') {
      this.unknownError = errors
      return
    }

    this.errors = errors
  }
}
