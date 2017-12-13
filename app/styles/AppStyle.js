import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		flex: 1,
		...Platform.select({
			ios: {
				paddingTop: 64
			}
		})
	},
	listElement: {
    	height: 120,
	},
	listElementMyCoin: {
    	height: 180,
	},
	insidelistElement: {
		height: 70
	}
})

export default styles;	