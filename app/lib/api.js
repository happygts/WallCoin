class Api {
    static headers() {
      return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'dataType': 'json',
      }
    }
  
    static get(route) {
      return Api.xhr(route, null, 'GET');
    }
  
    static put(route, params) {
      return Api.xhr(route, params, 'PUT')
    }
  
    static post(route, params) {
      return Api.xhr(route, params, 'POST')
    }
  
    static delete(route, params) {
      return Api.xhr(route, params, 'DELETE')
    }
  
    static xhr(route, params, verb) {
      const host = 'https://api.coinmarketcap.com/v1/'
      const url = `${host}${route}`
      let options = Object.assign({ method: verb }, params ? { body: JSON.stringify(params) } : null );
      options.headers = Api.headers()

      return fetch(url, options).then( resp => {
        let json = resp.json();

        if (resp.ok) {
          return json
        }

        return json.then(err => {
          throw err
        });

      }).then( json => json );
    }
  }
  
  export default Api
  