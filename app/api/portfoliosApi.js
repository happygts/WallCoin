import { API_URL } from './env'

const portfoliosApi = {
    getPortfolios(page = 0) {
        fetch(API_URL + "/portfolios?page=" + page, {
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
    createPortfolios(name) {
        fetch(API_URL + "/portfolios", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name
            })
        }).then((response) => {
            console.log("response :", response);
        }).catch((error) => {
            console.log("error :", error);
        });
    },
    editPortfolios(id, name) {
        fetch(API_URL + "/portfolios/" + id, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name
            })
        }).then((response) => {
            console.log("response :", response);
        }).catch((error) => {
            console.log("error :", error);
        });
    },
    deletePortfolios(id) {
        fetch(API_URL + "/portfolios/" + id, {
            method: "DELETE",
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
    getPortfoliosMyCoins(idPortfolios, page = 0) {
        fetch(API_URL + "/portfolios/" + idPortfolios + "/coins?page=" + page, {
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
    getPortfoliosMyCoinsFavorites(idPortfolios, page = 0) {
        fetch(API_URL + "/portfolios/" + idPortfolios + "/coins?isFavorite=true&page=" + page, {
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
    getPortfoliosMyCoinsWithOperations(idPortfolios, page = 0) {
        fetch(API_URL + "/portfolios/" + idPortfolios + "/coins?hasOperations=true&page=" + page, {
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
    createPortfoliosMyCoins(idPortfolios, coinId, isFavorite) {
        fetch(API_URL + "/portfolios/" + idPortfolios + "/coins", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                coinId,
                isFavorite
            })
        }).then((response) => {
            console.log("response :", response);
        }).catch((error) => {
            console.log("error :", error);
        });
    },
    editPortfoliosMyCoins(idPortfolios, myCoinId, isFavorite) {
        fetch(API_URL + "/portfolios/" + idPortfolios + "/coins/" + myCoinId, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                isFavorite
            })
        }).then((response) => {
            console.log("response :", response);
        }).catch((error) => {
            console.log("error :", error);
        });
    },
    getPortfoliosMyCoins(idPortfolios, myCoinId) {
        fetch(API_URL + "/portfolios/" + idPortfolios + "/coins/" + myCoinId, {
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
    deletePortfoliosMyCoins(idPortfolios, myCoinId) {
        fetch(API_URL + "/portfolios/" + idPortfolios + "/coins/" + myCoinId, {
            method: "DELETE",
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
    getPortfoliosMyCoinsOperations(idPortfolios, idMyCoins, page = 0) {
        fetch(API_URL + "/portfolios/" + idPortfolios + "/coins/" + idMyCoins + "/operations?page=" + page, {
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
    /**
     * 
     * @param {string} idPortfolios 
     * @param {string} idMyCoins 
     * @param {string} type ("buy" or "sell")
     * @param {string} price 
     * @param {string} quantity 
    */
    createPortfoliosMyCoinsOperations(idPortfolios, idMyCoins, type, price, quantity) {
        fetch(API_URL + "/portfolios/" + idPortfolios + "/coins/" + idMyCoins + "/operations", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                type,
                price,
                quantity
            })
        }).then((response) => {
            console.log("response :", response);
        }).catch((error) => {
            console.log("error :", error);
        });
    },
    /**
     * 
     * @param {string} idPortfolios 
     * @param {string} idMyCoins 
     * @param {string} idOperation
     * @param {object} operation
    */
    editPortfoliosMyCoinsOperations(idPortfolios, idMyCoins, idOperation, operation) {
        fetch(API_URL + "/portfolios/" + idPortfolios + "/coins/" + idMyCoins + "/operations/" + idOperation, {
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(operation)
        }).then((response) => {
            console.log("response :", response);
        }).catch((error) => {
            console.log("error :", error);
        });
    },
    deletePortfoliosMyCoinsOperations(idPortfolios, idMyCoins, idOperation) {
        fetch(API_URL + "/portfolios/" + idPortfolios + "/coins/" + idMyCoins + "/operations/" + idOperation, {
            method: "DELETE",
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
};

export default portfoliosApi;