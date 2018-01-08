import { API_URL } from './env'
import myFetch from './fetch'

export default coinsApi = {
    getCoins: (page = 0) => {
        return myFetch(API_URL  + "/coins?page=" + page, "GET");
    },
    getOneCoins: (id) => {
        return myFetch(API_URL  + "/coins/" + id, "GET");
    }
}