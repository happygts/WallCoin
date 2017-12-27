import { API_URL } from './env'
import myFetch from './fetch'

const portfoliosApi = {
    getPortfolios: (page = 0) => {
        myFetch(API_URL + "/portfolios?page=" + page, "GET");
    },
    createPortfolios: (name) => {
        myFetch(API_URL + "/portfolios", "POST", JSON.stringify({
            name
        }));
    },
    editPortfolios: (id, name) => {
        myFetch(API_URL + "/portfolios/" + id, "PUT", JSON.stringify({
            name
        }));
    },
    deletePortfolios: (id) => {
        myFetch(API_URL + "/portfolios/" + id, "DELETE");
    },
    getPortfoliosMyCoins: (idPortfolios, page = 0) => {
        myFetch(API_URL + "/portfolios/" + idPortfolios + "/coins?page=" + page, "GET");
    },
    getPortfoliosMyCoinsFavorites: (idPortfolios, page = 0) => {
        myFetch(API_URL + "/portfolios/" + idPortfolios + "/coins?isFavorite=true&page=" + page, "GET");
    },
    getPortfoliosMyCoinsWithOperations: (idPortfolios, page = 0) => {
        myFetch(API_URL + "/portfolios/" + idPortfolios + "/coins?hasOperations=true&page=" + page, "GET");
    },
    createPortfoliosMyCoins: (idPortfolios, coinId, isFavorite) => {
        myFetch(API_URL + "/portfolios/" + idPortfolios + "/coins", "POST", JSON.stringify({
            coinId,
            isFavorite
        }));
    },
    editPortfoliosMyCoins: (idPortfolios, myCoinId, isFavorite) => {
        myFetch(API_URL + "/portfolios/" + idPortfolios + "/coins/" + myCoinId, "PUT", JSON.stringify({
            isFavorite
        }));
    },
    getPortfoliosMyCoins: (idPortfolios, myCoinId) => {
        myFetch(API_URL + "/portfolios/" + idPortfolios + "/coins/" + myCoinId, "GET");
    },
    deletePortfoliosMyCoins: (idPortfolios, myCoinId) => {
        myFetch(API_URL + "/portfolios/" + idPortfolios + "/coins/" + myCoinId, "DELETE");
    },
    getPortfoliosMyCoinsOperations: (idPortfolios, idMyCoins, page = 0) => {
        myFetch(API_URL + "/portfolios/" + idPortfolios + "/coins/" + idMyCoins + "/operations?page=" + page, "GET");
    },
    /**
     * 
     * @param {string} idPortfolios 
     * @param {string} idMyCoins 
     * @param {string} type ("buy" or "sell")
     * @param {string} price 
     * @param {string} quantity 
    */
    createPortfoliosMyCoinsOperations: (idPortfolios, idMyCoins, type, price, quantity) => {
        myFetch(API_URL + "/portfolios/" + idPortfolios + "/coins/" + idMyCoins + "/operations", "POST", JSON.stringify({
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
    editPortfoliosMyCoinsOperations: (idPortfolios, idMyCoins, idOperation, operation) => {
        myFetch(API_URL + "/portfolios/" + idPortfolios + "/coins/" + idMyCoins + "/operations/" + idOperation, "PATCH", JSON.stringify(operation));
    },
    deletePortfoliosMyCoinsOperations: (idPortfolios, idMyCoins, idOperation) => {
        myFetch(API_URL + "/portfolios/" + idPortfolios + "/coins/" + idMyCoins + "/operations/" + idOperation, "DELETE");
    },
};

export default portfoliosApi;