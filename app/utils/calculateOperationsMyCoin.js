import { BigNumber } from 'bignumber.js';

export default function calculateOperationsMyCoin(myCoin, coin) {
    let buyOperationSum = new BigNumber(myCoin.stats.buyOperationSum);
    let buyPriceSum = new BigNumber(myCoin.stats.buyPriceSum);
    let buyWeightedSum = new BigNumber(myCoin.stats.buyWeightedSum);
    let nbOperations = new BigNumber(myCoin.stats.nbOperations);
    let totalQuantity = new BigNumber(myCoin.stats.totalQuantity);
    let hundredBigNumber = new BigNumber(100);

    let priceMyCoin = buyWeightedSum.dividedBy(buyOperationSum);
    let priceCoin = new BigNumber(coin.value.price);

    let possessedMyCoinValue = totalQuantity.times(priceMyCoin);
    let possessedCoinValue = totalQuantity.times(priceCoin);

    let beneficial = possessedCoinValue.minus(possessedMyCoinValue);
    let differencePercentage = hundredBigNumber.minus((possessedMyCoinValue.times(hundredBigNumber)).dividedBy(possessedCoinValue));

    beneficial = beneficial.isNaN() ? new BigNumber(0) : beneficial;
    differencePercentage = differencePercentage.isNaN() ? new BigNumber(0) : differencePercentage;

    return {
        beneficial: beneficial.toPrecision(6).toString(),
        differencePercentage: differencePercentage.toPrecision(6).toString(),
        differencePercentageIsPositive: differencePercentage.greaterThanOrEqualTo(0),
        totalMonneyInDollar: possessedCoinValue.toPrecision(6).toString(),
        nbCoins: totalQuantity.toPrecision(6).toString()
    }
}