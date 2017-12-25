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