import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactNative from 'react-native';
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';
import Search from 'react-native-search-box';

import styles from '../styles/AppStyle'
import { ActionCreators } from '../actions'

import CardCryptoCurrency from '../component/cardCryptoCurrency'

const {
  View,
    ScrollView,
    RefreshControl,
    TouchableHighlight,
    StyleSheet
} = ReactNative;

class Favorites extends Component {
    constructor() {
        super();
        this.state = {
            searchText: ''
        }
    }

    componentWillMount() {
        if (this.props.cryptoCurencies.list.length == 0) {
            this._onRefresh();
        }
    }

    _onRefresh() {
        this.props.fetchCryptoCurencies();
    }

    _onSearchTextChanged(newText) {
        console.log("_onSearchTextChanged")
        this.setState(() => {
            return {
                searchText: newText
            }
        })
    }

    _onSearchCancel() {
        console.log("_onSearchCancel")
        this.setState(() => {
            return {
                searchText: ''
            }
        })
    }

    isFav(id) {
        return this.props.cryptoCurencies.listFav.includes(id);
    }

    pressFav(id) {
        this.isFav(id) ? this.props.removeFavCryptoCurrency(id) : this.props.addFavCryptoCurrency(id);
    }

    isMyCoins(id) {
        return this.props.cryptoCurencies.listFav.find((item) => {
            return item.id == id
        });
    }

    pressMyCoins(id) {
        this.isMyCoins(id) ? alert('Was already my coin') : alert('is not my coin anymore');
    }

    render() {
        return (
            <View style={styles.container}>
                <Search
                    ref="search_box"
                    onChangeText={(newText) => this._onSearchTextChanged(newText)}
                    onCancel={this._onSearchCancel.bind(this)}
                    onDelete={this._onSearchCancel.bind(this)}
                />
                <ScrollView refreshControl={
                    <RefreshControl
                        refreshing={this.props.cryptoCurencies.loading}
                        onRefresh={this._onRefresh.bind(this)}
                    />
                }>
                    {!this.props.cryptoCurencies.loading && this.props.cryptoCurencies.list
                        .filter(cryptoCurrency => cryptoCurrency.name.includes(this.state.searchText))
                        .map((cryptoCurrency) => (
                            this.isFav(cryptoCurrency.id) ?
                                <CardCryptoCurrency
                                    key={cryptoCurrency.id}
                                    cryptoCurrency={cryptoCurrency}
                                    pressFav={this.pressFav.bind(this)}
                                    isFav={this.isFav.bind(this)}
                                    pressMyCoins={this.pressMyCoins.bind(this)}
                                    isMyCoins={this.isMyCoins.bind(this)} />
                                : null
                        ))}
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    cryptoCurencies: state.cryptoCurencies
})

function mapDispachToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispachToProps)(Favorites);