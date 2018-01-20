import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactNative from 'react-native';
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';

import styles from '../styles/AppStyle'
import { ActionCreators } from '../actions'
import { makeComputeListRequestItems } from '../selectors/requestSelectors'

import CardMyCoin from '../component/cardMyCoin'
import FooterActivityIndicator from '../component/footerActivityIndicator'

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

    componentWillUpdate() {
    }

    handleRefresh() {
        this.props.refreshDataMyCoins(this.props.user.currentPortfolioId);
    }

    handleLoadMore(params) {
        this.props.fetchListDataMyCoins();
    }

    getCoin(coinId) {
        return this.props.coinStore[coinId];
    }

    deleteMyCoin(myCoinId) {
        this.props.deleteMyCoin(this.props.user.currentPortfolioId, myCoinId);
    }

    goToOneMyCoins(myCoin) {
        this.props.changeUserMyCoin(myCoin.id);
        
        var coin = this.getCoin(myCoin.coinId);

        this.props.navigator.push({
            screen: 'OneMyCoins',
            title: "MyCoin " + myCoin.name,
            passProps: { myCoinId: myCoin.id, coin },
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

    renderFooter = () => {
        if (!this.props.coins.loading) return null;

        return (
            <FooterActivityIndicator/>
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
                            coin={this.getCoin(item.value.coinId)}
                            myCoin={item.value} />
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
    const coins = state.store.coins;
    const getListItems = makeComputeListRequestItems();

    return {
        coins,
        listMyCoins: getListItems(state, ownProps, 'myCoins', 'myCoins'),
        myCoins: state.myCoins,
        myCoinsStore: state.store.myCoins,
        coinStore: state.store.coins,
        user: state.user
    }
}

function mapDispachToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispachToProps)(MyCoins);