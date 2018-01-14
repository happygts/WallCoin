import * as user from './user'
import * as coins from './coins'
import * as portfolios from './portfolios'
import * as favorites from './favorites'
import * as myCoins from './myCoins'

export const ActionCreators = {
  ...user,
  ...coins,
  ...portfolios,
  ...favorites,
  ...myCoins
};
