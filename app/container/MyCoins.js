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
            passProps: { myCoinId: myCoin.id, myCoinValue },
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
            navigatorButtons: {
                rightButtons: [
                    {
                        icon: iconsMap['md-add'],
                        id: 'add'
                    }
                ]
            }
        });
    }

    render() {
        console.log("Render MyCoins.js")
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
    console.log("mapStateToProps of MyCoins");
    const cryptoCurencies = state.cryptoCurencies;
    const myCoins = state.myCoins;

    return {
        cryptoCurencies,
        myCoins: myCoins.map(myCoin => {
            var nbCoins = 0;
            var ratioBuyingPrice = 0;
            var totalMonneyInDollar = 0;
            var differencePercentage = 0;
            var beneficial = 0;
            
            myCoin.operations.forEach(operation => {
                nbCoins = (operation.bought ? nbCoins + operation.quantity : nbCoins - operation.quantity);
                if (operation.bought) {
                    ratioBuyingPrice += (operation.quantity * operation.buyingPrice);
                }
            });

            console.log("MyCoin " + myCoin.id + ": ", myCoin.operations);

            if (nbCoins > 0) {
                ratioBuyingPrice /= nbCoins;

                var cryptoValueOfMyCoin = cryptoCurencies.list.find((cryptoCurencie) => {
                    return cryptoCurencie.id == myCoin.id;
                });

                totalMonneyInDollar = nbCoins * cryptoValueOfMyCoin.price_usd;
                differencePercentage = (cryptoValueOfMyCoin.price_usd - ratioBuyingPrice) * 100 / ratioBuyingPrice
                beneficial = totalMonneyInDollar - ratioBuyingPrice * nbCoins;
            }

            // console.log("nbCoins :", nbCoins, "totalMonneyInDollar :", totalMonneyInDollar, "differencePercentage :", differencePercentage, "beneficial :", beneficial);

            return { ...myCoin, nbCoins: nbCoins.toPrecision(6).toString(),
                                totalMonneyInDollar: totalMonneyInDollar.toPrecision(6).toString(),
                                differencePercentage: differencePercentage.toPrecision(6).toString(),
                                beneficial: beneficial.toPrecision(6).toString() }
        })
    }
}

function mapDispachToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispachToProps)(MyCoins);