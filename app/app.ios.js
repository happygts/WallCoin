/* eslint-disable no-unused-vars */
import { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { registerScreens } from './screens';

import { iconsMap, iconsLoaded } from './utils/AppIcons';
import { configureStore, sagaMiddleware} from './store/configureStore';
import rootSaga from './sagas/rootSagas'

const store = configureStore();

sagaMiddleware.run(rootSaga)

registerScreens(store, Provider);

const navigatorStyle = {
	navBarTranslucent: true,
	drawUnderNavBar: true,
	navBarTextColor: 'white',
	navBarButtonColor: 'white',
	statusBarTextColorScheme: 'light',
	drawUnderTabBar: true
};

class App {
	connected = false;

	constructor() {
		iconsLoaded.then(() => {
			store.subscribe(this.onStoreUpdate.bind(this));
			this.startApp();
		});
	}

	onStoreUpdate() {
		const connected = store.getState().user.connected;
		if (this.connected != connected) {
			this.connected = connected;
			this.startApp();
		}
	}

	startApp = () => {
		if (this.connected) {
			Navigation.startTabBasedApp({
				tabs: [
					{
						label: 'Home',
						screen: 'Home',
						icon: iconsMap['ios-home-outline'],
						selectedIcon: iconsMap['ios-home'],
						title: 'Home',
						navigatorStyle,
						navigatorButtons: {
							rightButtons: [
								{
									icon: iconsMap['ios-log-out'],
									id: 'logout'
								}
							]
						}
					},
					// {
					// 	label: 'Favorites',
					// 	screen: 'Favorites',
					// 	icon: iconsMap['ios-star-outline'],
					// 	selectedIcon: iconsMap['ios-star'],
					// 	title: 'Favorites',
					// 	navigatorStyle,
					// 	navigatorButtons: {}
					// },
					{
						label: 'MyCoins',
						screen: 'MyCoins',
						icon: iconsMap['ios-cart-outline'],
						selectedIcon: iconsMap['ios-cart'],
						title: 'My Coins',
						navigatorStyle,
						navigatorButtons: {}
					}
				],
				tabsStyle: {
					tabBarButtonColor: 'white',
					tabBarSelectedButtonColor: 'white',
					tabBarBackgroundColor: 'black'
				}
			});
		}
		else {
			Navigation.startSingleScreenApp({
				screen: {
					screen: 'Login',
					title: 'Login',
					navigatorStyle: {
						navBarHidden: true
					}
				}
			});
		}
	}
}

export default App;