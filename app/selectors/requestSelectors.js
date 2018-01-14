import { createSelector } from 'reselect'

const listItems = (store, currentRequestIndex) => {
    var listToReturn = [];

    Object.keys(store).forEach((key) => {
        const item = store[key];
        for (let index = 0; index < Object.keys(item.contexts).length; index++) {
            const context = item.contexts[index];

            if (context.requestIndex == currentRequestIndex) {
                listToReturn.push(item);
                break;
            }
        }
    });

    return listToReturn;
}

const getStore = (state, props, name) => (
    state.store[name]
)

const getRequestItems = (state, props, name) => (
    state[name]
)

export const makeComputeListRequestItems = () => {  
    return createSelector(
        [getStore, getRequestItems],
        (store, items) => listItems(store, items.currentRequestIndex)
    )
}