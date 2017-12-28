import { API_URL } from './env'
import myFetch from './fetch'

export default coinsApi = {
    getCoins: () => {
        return myFetch(API_URL  + "/coins", "GET");
    },
    getOneCoins: (id) => {
        return myFetch(API_URL  + "/coins/" + id, "GET");
    }
}