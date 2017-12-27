import { API_URL } from './env'
import myFetch from './fetch'

const userApi = {
    me: () => {
        myFetch(API_URL + "/me", "GET");
    },
    login: (email, password) => {
        myFetch(API_URL + "/login", "POST", JSON.stringify({
            "email": email,
            "password": password
        }));
    },
    createUser: (email, password) => {
        myFetch(API_URL + "/users", "POST", JSON.stringify({
            "email": email,
            "password": password
        }));
    }
}

export default userApi;