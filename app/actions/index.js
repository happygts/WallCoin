import * as user from './user'
import * as cryptoCurrencies from './cryptoCurencies'
import * as myCoins from './myCoins'

export const ActionCreators = {
  ...user,
  ...cryptoCurrencies,
  ...myCoins  
};
