import { AsyncStorage } from 'react-native';

export default saveInsideLocalStorageMiddleware = ({ getState }) => next => (action) => {
    let stateTransformer = state => state;

    if (typeof predicate === 'function' && !predicate(getState, action)) {
        return next(action);
    }

    let returnedValue = next(action);

    let nextState = stateTransformer(getState());

    if (nextState && nextState.cryptoCurencies && (nextState.cryptoCurencies.list.length > 0 || nextState.cryptoCurencies.listFav.length > 0)) {
        AsyncStorage.setItem('@store:state', JSON.stringify(nextState))
            .then(resp => {
                console.log("resp :", resp);
            })
            .catch(error => {
                console.error("error :", error);
            });
    }

    return returnedValue;
};