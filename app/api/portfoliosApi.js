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
    getPortfoliosOneMyCoinsOperations: (page = 0, idPortfolios, idMyCoins, token) => {
        return myFetch(API_URL + "/portfolios/" + idPortfolios + "/coins/" + idMyCoins + "/operations?page=" + page + "&token=" + token, "GET");
    },
    /**
     * 
     * @param {string} idPortfolios 
     * @param {string} idMyCoins 
     * @param {string} type ("buy" or "sell")
     * @param {string} price 
     * @param {string} quantity 
    */
    createPortfoliosMyCoinsOperations: (idPortfolios, idMyCoins, type, price, quantity, token) => {
        return myFetch(API_URL + "/portfolios/" + idPortfolios + "/coins/" + idMyCoins + "/operations" + "?token=" + token, "POST", JSON.stringify({
            type,
            price,
            quantity
        }));
    },
    /**
     * 
     * @param {string} idPortfolios 
     * @param {string} idMyCoins 
     * @param {string} idOperation
     * @param {object} operation
    */
    editPortfoliosMyCoinsOperations: (idPortfolios, idMyCoins, idOperation, operation, token) => {
        return myFetch(API_URL + "/portfolios/" + idPortfolios + "/coins/" + idMyCoins + "/operations/" + idOperation + "?token=" + token, "PATCH", JSON.stringify(operation));
    },
    deletePortfoliosMyCoinsOperations: (idPortfolios, idMyCoins, idOperation, token) => {
        return myFetch(API_URL + "/portfolios/" + idPortfolios + "/coins/" + idMyCoins + "/operations/" + idOperation + "?token=" + token, "DELETE");
    },
};

export default portfoliosApi;