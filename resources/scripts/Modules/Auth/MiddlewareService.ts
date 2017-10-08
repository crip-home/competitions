import store from '@/Store'

class MiddlewareService {
  /**
   * Determines user authenticated sate.
   * @returns {boolean}
   */
  isAuthenticated(): boolean {
    return store.state.auth.user.authenticated
  }

  /**
   * Determine has a auth user presented role
   * @param {string} role
   * @returns {boolean}
   */
  hasRole(role: string): boolean {
    if (!this.isAuthenticated()) return false

    let check = (role) => !!~store.state.auth.roles.indexOf(role)

    // if user has an super_admin role, allow him to do anything
    if (check('SUPER_ADMIN')) return true

    return check(role)
  }

  /**
   * Determine has a auth user any of role presented in list of roles.
   * @param {string[]} roles
   * @returns {boolean}
   */
  hasAnyRole(roles: string[]): boolean {
    if (!this.isAuthenticated()) return false

    const hasAny = roles.find(
      role => this.hasRole(role)
    )

    return !!hasAny
  }

  /**
   * Determine has a auth user all roles presented in list.
   * @param {string[]} roles
   * @returns {boolean}
   */
  hasAllRoles(roles: string[]): boolean {
    if (!this.isAuthenticated()) return false

    const hasNoAny = roles.find(
      role => !this.hasRole(role)
    )

    return !hasNoAny
  }
}

export default new MiddlewareService()
