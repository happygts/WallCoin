import userApi from './userApi'
import coinsApi from './coinsApi'
import portfoliosApi from './portfoliosApi'

const Api = Object.assign({}, userApi, coinsApi, portfoliosApi, {
    health() {
        var myHeaders = new Headers();

        myHeaders.append('Content-Type', 'application/json; charset=utf-8');

        var myInit = {
            method: 'GET',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default'
        };

        fetch('http://localhost:4242/health', myInit).then(function (response) {
            console.log(response);
        });
    }
});

export default Api
