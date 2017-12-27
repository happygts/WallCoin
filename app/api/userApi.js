import { API_URL } from './env'

const userApi = {
    me() {
        fetch(API_URL + "/me", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            console.log("response :", response);
        }).catch((error) => {
            console.log("error :", error);
        });
    },
    login(email, password) {
        fetch(API_URL + "/login", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        }).then((response) => {
            console.log("response :", response);
        }).catch((error) => {
            console.log("error :", error);
        });
    },
    createUser(email, password) {
        fetch(API_URL + "/users", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        }).then((response) => {
            console.log("response :", response);
        }).catch((error) => {
            console.log("error :", error);
        });
    }
}

export default userApi;