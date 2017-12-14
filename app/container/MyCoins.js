import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactNative from 'react-native';
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';

import styles from '../styles/AppStyle'
import { ActionCreators } from '../actions'

import CardMyCoin from '../component/cardMyCoin'

import { iconsMap } from '../utils/AppIcons';

const {
  View,
    ScrollView,
    RefreshControl,
    TouchableHighlight,
    StyleSheet,
    Text
} = ReactNative;

class MyCoins extends Component {
    constructor(props) {
        super(props);
        // if you want to listen on navigator events, set this up
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    componentWillMount() {
        console.log("componentWillMount");
    }

    componentWillReceiveProps() {
        console.log("componentWillReceiveProps");
    }

    onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
        if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
            if (event.id == 'add') {
                this.props.navigator.push({
                    screen: 'AddEditMyCoins', // unique ID registered with Navigation.registerScreen
                    title: "Add one MyCoin", // navigation bar title of the pushed screen (optional)
                    passProps: { }, // Object that will be passed as props to the pushed screen (optional)
                    animated: true, // does the push have transition animation or does it happen immediately (optional)
                    animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the push have different transition animation (optional)
                    navigatorStyle: {
                        navBarTranslucent: true,
                        drawUnderNavBar: true,
                        navBarTextColor: 'white',
                        navBarButtonColor: 'white',
                        statusBarTextColorScheme: 'light',
                        drawUnderTabBar: true
                    }, // override the navigator style for the pushed screen (optional)
                    navigatorButtons: {}, // override the nav buttons for the pushed screen (optional)
                });
            }
        }
    }

    _onRefresh() {
        this.props.fetchCryptoCurencies();
    }

    checkIfIcon(name, fonteloConfig) {
        return !fonteloConfig.glyphs.every(glyph => {
            return !(glyph.css == name);
        });
    }

    calculateOwn(myCoin) {
        let coinValue = this.getCoinValue(myCoin);

        if (coinValue) {
            return (myCoin.quantity * coinValue.price_usd).toPrecision(6);
        }
        return (-1);
    }

    calculateAugmentation(myCoin) {
        let coinValue = this.getCoinValue(myCoin);

        if (coinValue) {
            if (myCoin.buyingPrice > coinValue.price_usd) {
                return -((myCoin.buyingPrice * 100 / coinValue.price_usd).toPrecision(6))
            }
            else {
                return ((coinValue.price_usd * 100 / myCoin.buyingPrice).toPrecision(6))
            }

        }
        return (-1);
    }

    getCoinValue(myCoin) {
        return this.props.cryptoCurencies.list.find((cryptoCurencie) => {
            return cryptoCurencie.id == myCoin.id;
        });
    }

    deleteMyCoin(myCoin) {
        this.props.deleteMyCoin(myCoin.id);
    }

    editMyCoin(myCoin) {
        myCoin.add = false;
        myCoin.quantity = myCoin.quantity.toString();
        myCoin.buyingPrice = myCoin.buyingPrice.toString();
        this.props.navigator.push({
            screen: 'AddEditMyCoins', // unique ID registered with Navigation.registerScreen
            title: "Edit " + myCoin.id, // navigation bar title of the pushed screen (optional)
            passProps: { myCoin }, // Object that will be passed as props to the pushed screen (optional)
            animated: true, // does the push have transition animation or does it happen immediately (optional)
            animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the push have different transition animation (optional)
            navigatorStyle: {
                navBarTranslucent: true,
                drawUnderNavBar: true,
                navBarTextColor: 'white',
                navBarButtonColor: 'white',
                statusBarTextColorScheme: 'light',
                drawUnderTabBar: true
            }, // override the navigator style for the pushed screen (optional)
            navigatorButtons: {}, // override the nav buttons for the pushed screen (optional)
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView refreshControl={
                    <RefreshControl
                        refreshing={this.props.cryptoCurencies.loading}
                        onRefresh={this._onRefresh.bind(this)}
                    />
                }>
                    {this.props.myCoins && this.props.myCoins.length && this.props.cryptoCurencies && this.props.cryptoCurencies.list.length ? this.props.myCoins.map((myCoin) => (
                        <CardMyCoin key={myCoin.id} myCoin={myCoin}
                            deleteMyCoin={this.deleteMyCoin.bind(this)}
                            editMyCoin={this.editMyCoin.bind(this)}
                            augmentation={this.calculateAugmentation(myCoin)}
                            myCoinValue={this.getCoinValue(myCoin)}
                            myCoinOwn={this.calculateOwn(myCoin)}
                            checkIfIcon={this.checkIfIcon.bind(this)} />
                    )) : null}
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    cryptoCurencies: state.cryptoCurencies,
    myCoins: state.myCoins
})

function mapDispachToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispachToProps)(MyCoins);