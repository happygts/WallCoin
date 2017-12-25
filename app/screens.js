/* eslint-disable import/prefer-default-export */
import { Navigation } from 'react-native-navigation';

import Home from './container/Home'
import Favorites from './container/Favorites'
import MyCoins from './container/MyCoins'
import OneMyCoins from './container/OneMyCoins'
import AddEditOneOperation from './container/AddEditOneOperation'

export function registerScreens(store, provider) {
	Navigation.registerComponent('Home', () => Home, store, provider);
	Navigation.registerComponent('Favorites', () => Favorites, store, provider);
	Navigation.registerComponent('MyCoins', () => MyCoins, store, provider);
	Navigation.registerComponent('OneMyCoins', () => OneMyCoins, store, provider);
	Navigation.registerComponent('AddEditOneOperation', () => AddEditOneOperation, store, provider);
}
