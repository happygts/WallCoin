import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactNative from 'react-native';
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';

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
    componentWillMount() {
        if (this.props.cryptoCurencies.list.length == 0) {
            this._onRefresh();            
        }
        console.log("componentWillMount");
    }

    componentWillReceiveProps() {
        console.log("componentWillReceiveProps");
    }

    _onRefresh() {
        this.props.fetchCryptoCurencies();
    }

    isFav(id) {
        return this.props.cryptoCurencies.listFav.includes(id);
    }

    pressFav(id) {
        this.isFav(id) ? this.props.removeFavCryptoCurrency(id) : this.props.addFavCryptoCurrency(id);
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
                    {!this.props.cryptoCurencies.loading && this.props.cryptoCurencies.list.map((cryptoCurrency) => (
                        this.isFav(cryptoCurrency.id) ?
                        <CardCryptoCurrency key={cryptoCurrency.id} cryptoCurrency={cryptoCurrency} pressFav={this.pressFav.bind(this)} isFav={this.isFav.bind(this)} />
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