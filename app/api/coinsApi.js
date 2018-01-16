import { API_URL } from './env'
import myFetch from './fetch'

export default coinsApi = {
    getCoins: (page = 0, token) => {
        console.log("Url :", API_URL  + "/coins?page=" + page + "&token=" + token);
        return myFetch(API_URL  + "/coins?page=" + page + "&token=" + token, "GET");
    },
    getOneCoins: (id, token) => {
        return myFetch(API_URL  + "/coins/" + id + "&token=" + token, "GET");
    }
}