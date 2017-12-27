import * as Login from './login'
import * as CryptoCurrencies from './cryptoCurencies'
import * as MyCoins from './myCoins'

export const ActionCreators = {
  ...Login,
  ...CryptoCurrencies,
  ...MyCoins  
};
