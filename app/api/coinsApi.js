import { API_URL } from './env'
import myFetch from './fetch'

export default coinsApi = {
    getCoins: () => {
        myFetch(API_URL  + "/coins", "GET");
    },
    getOneCoins: (id) => {
        myFetch(API_URL  + "/coins/" + id, "GET");
    }
}