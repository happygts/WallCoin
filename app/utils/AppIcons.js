/* eslint-disable new-cap */
import { PixelRatio } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../../assets/config.json';

const navIconSize = (__DEV__ === false && Platform.OS === 'android') ? PixelRatio.getPixelSizeForLayoutSize(40) : 40; // eslint-disable-line
const replaceSuffixPattern = /--(active|big|small|very-big)/g;
const icons = {
	'ios-home': [30],
	'ios-home-outline': [30],
	'md-home' : [30],
	'ios-star': [30],
	'ios-star-outline': [30],
	'md-star': [30],
	'ios-cart': [30],
	'ios-cart-outline': [30],
	'md-cart': [30],
	'ios-add-outline' : [30],
	'md-add' : [30],
	'ios-log-out': [30],
	'md-log-out': [30],
	'arrow-dropleft-circle': [30],
	'arrow-dropright-circle': [30]
};

const iconsMap = {};
const iconsLoaded = new Promise((resolve, reject) => {
	Promise.all(
		Object.keys(icons).map(iconName =>
			// IconName--suffix--other-suffix is just the mapping name in iconsMap
			Ionicons.getImageSource(
				iconName.replace(replaceSuffixPattern, ''),
				icons[iconName][0],
				icons[iconName][1]
			))
	).then(sources => {
		Object.keys(icons)
			.forEach((iconName, idx) => (iconsMap[iconName] = sources[idx]));

		// Call resolve (and we are done)
		resolve(true);
	});
});

const FontelloIcon = createIconSetFromFontello(fontelloConfig);

const checkFontelloIconExist = function (name) {
	return !fontelloConfig.glyphs.every(glyph => {
		return !(glyph.css == name);
	});
}

export {
	iconsMap,
	iconsLoaded,
	FontelloIcon,
	checkFontelloIconExist
};
