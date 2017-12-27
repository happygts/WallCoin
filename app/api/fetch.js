
export default function(url, method, body) {
    fetch(url, {
        method: method,
        body,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        console.log("response :", response);
    }).catch((error) => {
        console.log("error :", error);
    });
}
