import { createSelector } from 'reselect'

const getInfoMyCoin = (myCoin, cryptoCurencies) => {
    var nbCoins = 0;
    var ratioBuyingPrice = 0;
    var totalMonneyInDollar = 0;
    var differencePercentage = 0;
    var beneficial = 0;

    myCoin.operations.forEach(operation => {
        nbCoins = (operation.bought ? nbCoins + operation.quantity : nbCoins - operation.quantity);
        if (operation.bought) {
            ratioBuyingPrice += (operation.quantity * operation.buyingPrice);
        }
    });

    if (nbCoins > 0) {
        ratioBuyingPrice /= nbCoins;

        var cryptoValueOfMyCoin = cryptoCurencies.list.find((cryptoCurencie) => {
            return cryptoCurencie.id == myCoin.id;
        });

        totalMonneyInDollar = nbCoins * cryptoValueOfMyCoin.price_usd;
        differencePercentage = (cryptoValueOfMyCoin.price_usd - ratioBuyingPrice) * 100 / ratioBuyingPrice
        beneficial = totalMonneyInDollar - ratioBuyingPrice * nbCoins;
    }

    // console.log("nbCoins :", nbCoins, "totalMonneyInDollar :", totalMonneyInDollar, "differencePercentage :", differencePercentage, "beneficial :", beneficial);

    return {
        ...myCoin, nbCoins: nbCoins.toPrecision(6).toString(),
        totalMonneyInDollar: totalMonneyInDollar.toPrecision(6).toString(),
        differencePercentage: differencePercentage.toPrecision(6).toString(),
        beneficial: beneficial.toPrecision(6).toString()
    }
}

const getMyCoins = (state, props) => (
    state.myCoins
)

const getCryptoCurencies = (state, props) => (
    state.cryptoCurencies
)

export const makeComputeMyCoins = () => {  
    return createSelector(
        [getMyCoins, getCryptoCurencies],
        (myCoins, cryptoCurencies) => myCoins.map(myCoin => {
            return getInfoMyCoin(myCoin, cryptoCurencies)
        })
    )
}

const getOneMyCoins = (state, props) => (
    state.myCoins.find((myCoin) => (myCoin.id == props.myCoinId))
)

export const makeComputeOneMyCoin = () => {
    return createSelector(
        [getOneMyCoins, getCryptoCurencies],
        (myCoin, cryptoCurencies) => getInfoMyCoin(myCoin, cryptoCurencies)
    )
}