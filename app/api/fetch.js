
export default function (url, method, body) {
    return fetch(url, {
        method: method,
        body,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        return response.json();
    })
    .then(response => {
        if (!response.error) {
            return response
        }
        else {
            throw response.error;
        }

    })
}
