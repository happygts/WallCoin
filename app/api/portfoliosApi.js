import { API_URL } from './env'
import myFetch from './fetch'

const portfoliosApi = {
    getPortfolios: (page = 0, token) => {
        return myFetch(API_URL + "/portfolios?page=" + page + "&token=" + token, "GET");
    },
    createPortfolios: (name, token) => {
        return myFetch(API_URL + "/portfolios?token=" + token, "POST", JSON.stringify({
            name
        }));
    },
    editPortfolios: (id, name, token) => {
        return myFetch(API_URL + "/portfolios/" + id + "?token=" + token, "PUT", JSON.stringify({
            name
        }));
    },
    deletePortfolios: (id, token) => {
        return myFetch(API_URL + "/portfolios/" + id  + "?token=" + token, "DELETE");
    },
    getPortfoliosMyCoins: (page = 0, idPortfolios, token) => {
        return myFetch(API_URL + "/portfolios/" + idPortfolios + "/coins?page=" + page + "&token=" + token, "GET");
    },
    getPortfoliosMyCoinsFavorites: (page = 0, idPortfolios, token) => {
        return myFetch(API_URL + "/portfolios/" + idPortfolios + "/coins?isFavorite=true&page=" + page + "&token=" + token, "GET");
    },
    getPortfoliosMyCoinsWithOperations: (page = 0, idPortfolios, token) => {
        return myFetch(API_URL + "/portfolios/" + idPortfolios + "/coins?hasOperations=true&page=" + page + "&token=" + token, "GET");
    },
    createPortfoliosMyCoins: (idPortfolios, coinId, isFavorite, token) => {
        return myFetch(API_URL + "/portfolios/" + idPortfolios + "/coins?token=" + token, "POST", JSON.stringify({
            coinId,
            isFavorite
        }));
    },
    editPortfoliosMyCoins: (idPortfolios, myCoinId, isFavorite, token) => {
        return myFetch(API_URL + "/portfolios/" + idPortfolios + "/coins/" + myCoinId + "?token=" + token, "PUT", JSON.stringify({
            isFavorite
        }));
    },
    getPortfoliosOneMyCoins: (idPortfolios, myCoinId, token) => {
        return myFetch(API_URL + "/portfolios/" + idPortfolios + "/coins/" + myCoinId + "&token=" + token, "GET");
    },
    deletePortfoliosMyCoins: (idPortfolios, myCoinId, token) => {
        return myFetch(API_URL + "/portfolios/" + idPortfolios + "/coins/" + myCoinId  + "?token=" + token, "DELETE");
    },
    getPortfoliosOneMyCoinsOperations: (page = 0, idPortfolios, myCoinId, token) => {
        return myFetch(API_URL + "/portfolios/" + idPortfolios + "/coins/" + myCoinId + "/operations?page=" + page + "&token=" + token, "GET");
    },
    /**
     * 
     * @param {string} idPortfolios 
     * @param {string} myCoinId 
     * @param {string} type ("buy" or "sell")
     * @param {string} price 
     * @param {string} quantity 
    */
    createPortfoliosMyCoinsOperations: (idPortfolios, myCoinId, type, price, quantity, token) => {
        console.log("createPortfoliosMyCoinsOperations idPortfolios :", idPortfolios, "myCoinId :", myCoinId, "type :", type, "price :", price, "quantity :", quantity);
        return myFetch(API_URL + "/portfolios/" + idPortfolios + "/coins/" + myCoinId + "/operations" + "?token=" + token, "POST", JSON.stringify({
            type,
            price,
            quantity
        }));
    },
    /**
     * 
     * @param {string} idPortfolios 
     * @param {string} myCoinId 
     * @param {string} idOperation
     * @param {object} operation
    */
    editPortfoliosMyCoinsOperations: (idPortfolios, myCoinId, idOperation, type, price, quantity, token) => {
        console.log("createPortfoliosMyCoinsOperations idPortfolios :", idPortfolios, "myCoinId :", myCoinId, "type :", type, "price :", price, "quantity :", quantity);
        return myFetch(API_URL + "/portfolios/" + idPortfolios + "/coins/" + myCoinId + "/operations/" + idOperation + "?token=" + token, "PATCH", JSON.stringify({
            type,
            price,
            quantity
        }));
    },
    deletePortfoliosMyCoinsOperations: (idPortfolios, myCoinId, idOperation, token) => {
        return myFetch(API_URL + "/portfolios/" + idPortfolios + "/coins/" + myCoinId + "/operations/" + idOperation + "?token=" + token, "DELETE");
    },
};

export default portfoliosApi;