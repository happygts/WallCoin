import { createSelector } from 'reselect'

const listItems = (store, currentRequestId) => {
    var listToReturn = [];

    if (store) {
        Object.keys(store).forEach((key) => {
            const item = store[key];
            for (let index = 0; index < Object.keys(item.contexts).length; index++) {
                const context = item.contexts[index];

                if (context.requestId == currentRequestId) {
                    listToReturn.push(item);
                    break;
                }
            }
        });
    }

    return listToReturn;
}

const getStore = (state, props, nameStore, nameRequest) => (
    state.store[nameStore]
)

const getRequestItems = (state, props, nameStore, nameRequest) => (
    state[nameRequest]
)

export const makeComputeListRequestItems = () => {
    return createSelector(
        [getStore, getRequestItems],
        (store, items) => listItems(store, items.currentRequestId)
    )
}

const getOneItemStore = (state, props, name, idItem) => {
    return state.store[name][idItem];
}

export const makeComputeOneRequestItems = () => {
    return createSelector(
        [getOneItemStore],
        (element) => (element)
    )
}