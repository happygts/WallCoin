import { API_URL } from './env'

const coinsApi = {
    getCoins() {
        fetch(API_URL  + "/coins", {
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
    getOneCoins(id) {
        fetch(API_URL  + "/coins/" + id, {
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
    }
}

export default coinsApi;