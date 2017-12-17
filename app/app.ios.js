/* eslint-disable no-unused-vars */
import { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { registerScreens } from './screens';

import { iconsMap, iconsLoaded } from './utils/AppIcons';
import configureStore from './store/configureStore';

const store = configureStore();

registerScreens(store, Provider);

const navigatorStyle = {
	navBarTranslucent: true,
	drawUnderNavBar: true,
	navBarTextColor: 'white',
	navBarButtonColor: 'white',
	statusBarTextColorScheme: 'light',
	drawUnderTabBar: true
};

class App extends Component {
	constructor(props) {
		super(props);
		iconsLoaded.then(() => {
			this.startApp();
		});
	}

	startApp() {
		Navigation.startTabBasedApp({
			tabs: [
				{
					label: 'Home',
					screen: 'Home',
					icon: iconsMap['ios-home-outline'],
					selectedIcon: iconsMap['ios-home'],
					title: 'Home',
					navigatorStyle,
					navigatorButtons: {}
				},
				{
					label: 'Favorites',
					screen: 'Favorites',
					icon: iconsMap['ios-star-outline'],
					selectedIcon: iconsMap['ios-star'],
					title: 'Favorites',
					navigatorStyle,
					navigatorButtons: {}
				},
				{
					label: 'MyCoins',
					screen: 'MyCoins',
					icon: iconsMap['ios-cart-outline'],
					selectedIcon: iconsMap['ios-cart'],
					title: 'My Coins',
					navigatorStyle,
					navigatorButtons: {
						rightButtons: [
							{
								icon: require('../assets/images/navicon_add.png'),
								id: 'add'
							}
						]
					}
				}
			],
			tabsStyle: {
				tabBarButtonColor: 'white',
				tabBarSelectedButtonColor: 'white',
				tabBarBackgroundColor: 'black'
			}
		});
	}
}

export default App;
