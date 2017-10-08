import {State as AuthState} from '@/Modules/Auth/Store/Contracts'

export interface State extends Object {
  auth: AuthState
}
