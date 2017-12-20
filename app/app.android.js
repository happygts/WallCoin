/* eslint-disable no-unused-vars */
import { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { registerScreens } from './screens';

import { iconsMap, iconsLoaded } from './utils/AppIcons';
import configureStore from './store/configureStore';

import Ionicons from 'react-native-vector-icons/Ionicons';

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
					icon: iconsMap['md-home'],
					title: 'Home',
					navigatorStyle: {},
					navigatorButtons: {}
				},
				{
					label: 'Favorites',
					screen: 'Favorites',
					icon: iconsMap['md-star'],
					title: 'Favorites',
					navigatorStyle: {},
					navigatorButtons: {}
				},
				{
					label: 'MyCoins',
					screen: 'MyCoins',
					icon: iconsMap['md-cart'],
					title: 'My Coins',
					navigatorStyle: {},
					navigatorButtons: {
						rightButtons: [
							{
								icon: iconsMap['md-add'],
								id: 'add'
							}
						]
					}
				}
			]
		});
	}
}

export default App;
