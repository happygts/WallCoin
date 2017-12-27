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
	containerLogin: {
		flex: 1,
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
	},
	itemForm: {
		marginTop: 5,
		marginBottom: 5
	},

	// TEXT
	title:{
		fontWeight: 'bold',
		fontSize: 30,
		marginBottom: 30,
		color: '#ffd700'
	},

	// Button
	buttonCreateAccount: {
		backgroundColor: '#ffd700'
	}
})

export default styles;	