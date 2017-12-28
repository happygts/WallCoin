import * as types from './types'
import Api from '../lib/api'

export function login(email, password) {
    return {
        type: types.START_LOGIN,
        payload: {
            email,
            password
        }
    }
}

export function register(email, password) {
    return {
        type: types.START_REGISTER,
        payload: {
            email,
            password
        }
    }
}