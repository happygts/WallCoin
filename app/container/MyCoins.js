import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactNative from 'react-native';
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';

import styles from '../styles/AppStyle'
import { ActionCreators } from '../actions'
import { makeComputeListRequestItems } from '../selectors/requestSelectors'

import CardMyCoin from '../component/cardMyCoin'

import { iconsMap } from '../utils/AppIcons';

const {
  View,
    ScrollView,
    FlatList,
    RefreshControl,
    TouchableHighlight,
    StyleSheet,
    Text,
    ActivityIndicator
} = ReactNative;

class MyCoins extends Component {
    constructor(props) {
        super(props);
    }

    handleRefresh() {
        // this.props.fetchCryptoCurencies();
    }

    handleLoadMore(params) {
        this.props.fetchListDataMyCoins();
    }

    getCoinValue(id) {
        return this.props.coins.list.find((coin) => {
            return coin.id == id;
        });
    }

    deleteMyCoin(myCoinId) {
        // this.props.deleteMyCoin(myCoinId);
    }

    goToOneMyCoins(id) {
        // var myCoin = this.props.myCoins.find((myCoin) => {
        //     return id == myCoin.id;
        // });

        // var myCoinValue = this.getCoinValue(id);

        // this.props.navigator.push({
        //     screen: 'OneMyCoins',
        //     title: "MyCoin " + myCoinValue.name,
        //     passProps: { myCoinId: myCoin.id, myCoinValue },
        //     animated: true,
        //     animationType: 'fade',
        //     navigatorStyle: {
        //         navBarTranslucent: true,
        //         drawUnderNavBar: true,
        //         navBarTextColor: 'white',
        //         navBarButtonColor: 'white',
        //         statusBarTextColorScheme: 'light',
        //         drawUnderTabBar: true
        //     },
        //     navigatorButtons: {
        //         rightButtons: [
        //             {
        //                 icon: iconsMap['md-add'],
        //                 id: 'add'
        //             }
        //         ]
        //     }
        // });
    }

    renderFooter = () => {
        if (!this.props.coins.loading) return null;

        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: "#CED0CE"
                }}
            >
                <ActivityIndicator animating size="large" />
            </View>
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.listMyCoins}
                    renderItem={({ item }) => (
                        <CardMyCoin key={item.value.id}
                            deleteMyCoin={this.deleteMyCoin.bind(this)}
                            goToOneMyCoins={this.goToOneMyCoins.bind(this)}
                            myCoinValue={this.getCoinValue(myCoin.id)}
                            nbCoins={myCoin.nbCoins}
                            totalMonneyInDollar={myCoin.totalMonneyInDollar}
                            differencePercentage={myCoin.differencePercentage}
                            beneficial={myCoin.beneficial} />
                    )}
                    ListFooterComponent={this.renderFooter}
                    keyExtractor={(item, index) => index}
                    onEndReached={this.handleLoadMore.bind(this)}
                    onEndReachedThreshold={0}
                    onRefresh={this.handleRefresh.bind(this)}
                    refreshing={this.props.myCoins.refreshing}
                />
            </View>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const coins = state.coins;
    const getListItems = makeComputeListRequestItems();
    // const getMyCoins = makeComputeMyCoins();

    return {
        coins,
        listMyCoins: getListItems(state, ownProps, 'myCoins'),
        myCoins: state.myCoins
    }
}

function mapDispachToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispachToProps)(MyCoins);