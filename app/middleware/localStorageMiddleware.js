import { AsyncStorage } from 'react-native';

export default saveInsideLocalStorageMiddleware = ({ getState }) => next => (action) => {
    let stateTransformer = state => state;

    if (typeof predicate === 'function' && !predicate(getState, action)) {
        return next(action);
    }

    let returnedValue = next(action);

    let nextState = stateTransformer(getState());

    AsyncStorage.setItem('@store:state', JSON.stringify(nextState))
        .then(response => {
        })
        .catch(error => {
            console.error("error :", error);
        });

    return returnedValue;
};