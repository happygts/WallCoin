/* eslint-disable import/prefer-default-export */
import { Navigation } from 'react-native-navigation';

import Home from './container/Home'

export function registerScreens(store, Provider) {
	Navigation.registerComponent('Home', () => Home, store, Provider);
}
