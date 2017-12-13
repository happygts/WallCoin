import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactNative from 'react-native';
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';

import styles from '../styles/AppStyle'
import { ActionCreators } from '../actions'

import CardMyCoin from '../component/cardMyCoin'

const {
  View,
    ScrollView,
    RefreshControl,
    TouchableHighlight,
    StyleSheet,
    Text
} = ReactNative;

class MyCoins extends Component {
    static propTypes = {
        cryptoCurencies: PropTypes.object.required,
        myCoins: PropTypes.array.required
    };

    componentWillMount() {
        // To delete
        if (this.props.myCoins && this.props.myCoins.length == 0) {
            this.props.createMyCoin({
                id: "bitcoin",
                quantity: 1.2341,
                buyingPrice: 5412.14
            });
        }
        console.log("componentWillMount");
    }

    componentWillReceiveProps() {
        console.log("this.props.myCoins :", this.props.myCoins);
        console.log("componentWillReceiveProps");
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
            return (myCoin.quantity * coinValue.price_usd).toPrecision(8);
        }
        return (-1);
    }

    calculateAugmentation(myCoin) {
        let coinValue = this.getCoinValue(myCoin);

        if (coinValue) {
            return ((myCoin.buyingPrice * 100 / coinValue.price_usd).toPrecision(8))
        }
        return (-1);
    }

    getCoinValue(myCoin) {
        return this.props.cryptoCurencies.list.find((cryptoCurencie) => {
            return cryptoCurencie.id == myCoin.id;
        })
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