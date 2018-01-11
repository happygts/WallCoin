import * as user from './user'
import * as coins from './coins'
import * as myCoins from './myCoins'

export const ActionCreators = {
  ...user,
  ...coins,
  ...myCoins  
};
