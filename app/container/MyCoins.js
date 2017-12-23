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
        console.log("props myCoins :", props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    onNavigatorEvent(event) {
        if (event.type == 'NavBarButtonPress') {
            if (event.id == 'add') {
                this.props.navigator.push({
                    screen: 'AddEditMyCoins',
                    title: "Add one MyCoin",
                    passProps: {},
                    animated: true,
                    animationType: 'fade',
                    navigatorStyle: {
                        navBarTranslucent: true,
                        drawUnderNavBar: true,
                        navBarTextColor: 'white',
                        navBarButtonColor: 'white',
                        statusBarTextColorScheme: 'light',
                        drawUnderTabBar: true
                    },
                    navigatorButtons: {},
                });
            }
        }
    }

    _onRefresh() {
        this.props.fetchCryptoCurencies();
    }

    getCoinValue(id) {
        return this.props.cryptoCurencies.list.find((cryptoCurencie) => {
            return cryptoCurencie.id == id;
        });
    }

    deleteMyCoin(myCoinId) {
        this.props.deleteMyCoin(myCoinId);
    }

    goToOneMyCoins(id) {
        var myCoin = this.props.myCoins.find((myCoin) => {
            return id == myCoin.id;
        });

        var myCoinValue = this.getCoinValue(id);
        
        this.props.navigator.push({
            screen: 'OneMyCoins',
            title: "MyCoin " + myCoinValue.name,
            passProps: { myCoin, myCoinValue },
            animated: true,
            animationType: 'fade',
            navigatorStyle: {
                navBarTranslucent: true,
                drawUnderNavBar: true,
                navBarTextColor: 'white',
                navBarButtonColor: 'white',
                statusBarTextColorScheme: 'light',
                drawUnderTabBar: true
            },
            navigatorButtons: {},
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
                        <CardMyCoin key={myCoin.id}
                            deleteMyCoin={this.deleteMyCoin.bind(this)}
                            goToOneMyCoins={this.goToOneMyCoins.bind(this)}
                            myCoinValue={this.getCoinValue(myCoin.id)}
                            nbCoins={myCoin.nbCoins}
                            totalMonneyInDollar={myCoin.totalMonneyInDollar}
                            differencePercentage={myCoin.differencePercentage}
                            beneficial={myCoin.beneficial} />
                    )) : null}
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    const cryptoCurencies = state.cryptoCurencies;
    const myCoins = state.myCoins;

    return {
        cryptoCurencies,
        myCoins: myCoins.map(myCoin => {
            var nbCoins = 0;
            var ratioBoughtPrice = 0;
            var totalMonneyInDollar = 0;
            var differencePercentage = 0;
            var beneficial = 0;

            myCoin.operations.forEach(element => {
                nbCoins = (element.bought ? nbCoins - element.number : nbCoins + element.number);
                if (element.bought) {
                    ratioBoughtPrice += (element.number * element.price);
                }
            });

            if (nbCoins > 0) {
                ratioBoughtPrice /= nbCoins;

                var cryptoValueOfMyCoin = cryptoCurencies.list.find((cryptoCurencie) => {
                    return cryptoCurencie.id == myCoin.id;
                });

                totalMonneyInDollar = nbCoins * cryptoValueOfMyCoin.price_usd;
                differencePercentage = (ratioBoughtPrice > cryptoValueOfMyCoin.price_usd) ?
                    -((ratioBoughtPrice * 100 / cryptoValueOfMyCoin.price_usd).toPrecision(6)) :
                    ((cryptoValueOfMyCoin.price_usd * 100 / ratioBoughtPrice).toPrecision(6))
                beneficial = totalMonneyInDollar - ratioBoughtPrice * nbCoins;
            }

            console.log("nbCoins :", nbCoins, "totalMonneyInDollar :", totalMonneyInDollar, "differencePercentage :", differencePercentage, "beneficial :", beneficial);

            return { ...myCoin, nbCoins, totalMonneyInDollar, differencePercentage, beneficial }
        })
    }
}

function mapDispachToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispachToProps)(MyCoins);