/* eslint-disable import/prefer-default-export */
import { Navigation } from 'react-native-navigation';

import Home from './container/Home'
import Favorites from './container/Favorites'

export function registerScreens(store, provider) {
	Navigation.registerComponent('Home', () => Home, store, provider);
	Navigation.registerComponent('Favorites', () => Favorites, store, provider);
}
