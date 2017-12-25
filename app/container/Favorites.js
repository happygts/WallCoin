import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactNative from 'react-native';
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';
import Search from 'react-native-search-box';

import styles from '../styles/AppStyle'
import { ActionCreators } from '../actions'

import CardCryptoCurrency from '../component/cardCryptoCurrency'
import Home from './Home'

const {
  View,
    ScrollView,
    RefreshControl,
    TouchableHighlight,
    StyleSheet
} = ReactNative;

class Favorites extends Component {
    render() {
        return (
            // <View style={styles.container}>
            //     <Search
            //         ref="search_box"
            //         onChangeText={(newText) => this._onSearchTextChanged(newText)}
            //         onCancel={this._onSearchCancel.bind(this)}
            //         onDelete={this._onSearchCancel.bind(this)}
            //     />
            //     <ScrollView refreshControl={
            //         <RefreshControl
            //             refreshing={this.props.cryptoCurencies.loading}
            //             onRefresh={this._onRefresh.bind(this)}
            //         />
            //     }>
            //         {!this.props.cryptoCurencies.loading && this.props.cryptoCurencies.list
            //             .filter(cryptoCurrency => cryptoCurrency.name.includes(this.state.searchText))
            //             .map((cryptoCurrency) => (
            //                 this.isFav(cryptoCurrency.id) ?
            //                     <CardCryptoCurrency
            //                         key={cryptoCurrency.id}
            //                         cryptoCurrency={cryptoCurrency}
            //                         pressFav={this.pressFav.bind(this)}
            //                         isFav={this.isFav.bind(this)}
            //                         pressMyCoins={this.pressMyCoins.bind(this)}
            //                         isMyCoins={this.isMyCoins.bind(this)} />
            //                     : null
            //             ))}
            //     </ScrollView>
            // </View>
            <Home favoritesOnly={true}></Home>
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