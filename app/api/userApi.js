import { API_URL } from './env'
import myFetch from './fetch'

const userApi = {
    me: (token) => {
        return myFetch(API_URL + "/me?token=" + token, "GET");
    },
    login: (email, password) => {
        return myFetch(API_URL + "/login", "POST", JSON.stringify({
            "email": email,
            "password": password
        }));
    },
    createUser: (email, password) => {
        return myFetch(API_URL + "/users", "POST", JSON.stringify({
            "email": email,
            "password": password
        }));
    },
    token: (userId, refreshToken) => {
        return myFetch(API_URL + "/token", "POST", JSON.stringify({
            "userId": userId,
            "refreshToken": refreshToken
        }));
    }
}

export default userApi;