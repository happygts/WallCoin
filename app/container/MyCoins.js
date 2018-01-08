import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactNative from 'react-native';
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';

import styles from '../styles/AppStyle'
import { ActionCreators } from '../actions'
import { makeComputeMyCoins } from '../selectors/myCoinsSelectors'

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
        return this.props.coins.list.find((cryptoCurencie) => {
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
                        refreshing={this.props.coins.loading}
                        onRefresh={this._onRefresh.bind(this)}
                    />
                }>
                    {this.props.myCoins && this.props.myCoins.length && this.props.coins && this.props.coins.list.length ? this.props.myCoins.map((myCoin) => (
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

const mapStateToProps = (state, ownProps) => {
    console.log("mapStateToProps of MyCoins");
    const coins = state.coins;

    const getMyCoins = makeComputeMyCoins();

    return {
        coins,
        myCoins: getMyCoins(state, ownProps)
    }
}

function mapDispachToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispachToProps)(MyCoins);