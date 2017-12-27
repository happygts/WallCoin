import * as types from './types'
import Api from '../lib/api'

export function login(username, password) {
    return {
        type: types.START_LOGIN,
        payload: {
            username,
            password
        }
    }
}