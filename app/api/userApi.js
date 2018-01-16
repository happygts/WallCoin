import { API_URL } from './env'
import myFetch from './fetch'

const userApi = {
    me: (token) => {
        console.log("token :", token);
        return myFetch(API_URL + "/me?token=" + token, "GET");
    },
    login: (email, password) => {
        console.log("email :", email, "password :", password);
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
        console.log("refreshToken :", refreshToken);
        return myFetch(API_URL + "/token", "POST", JSON.stringify({
            "userId": userId,
            "refreshToken": refreshToken
        }));
    }
}

export default userApi;