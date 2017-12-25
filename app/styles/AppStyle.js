import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		flex: 1,
		...Platform.select({
			ios: {
				paddingTop: 64,
				paddingBottom: 74
			}
		})
	},
	containerPush: {
		flex: 1,
		flexDirection: 'column',
		...Platform.select({
			android: {
				paddingTop: 64
			},
			ios: {
				paddingTop: 64,
				paddingBottom: 74
			}
		})
	},
	listElement: {
		...Platform.select({
			ios: {
				height: 120
			},
			android: {
				height: 140
			}
		}),
	},
	listElementMyCoin: {
		height: 200,
	},
	insidelistElement: {
		height: 70
	},
	pickerInsideForm: {
		...Platform.select({
			android: {
				marginLeft : 10
			}
		})
	}
})

export default styles;	