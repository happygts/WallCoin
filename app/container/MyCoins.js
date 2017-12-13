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
    StyleSheet,
    Text
} = ReactNative;

class MyCoins extends Component {
    static propTypes = {
        cryptoCurencies: PropTypes.object.required,
        myCoins: PropTypes.array.required
    };

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

    checkIfIcon(name, fonteloConfig) {
        return !fonteloConfig.glyphs.every(glyph => {
            return !(glyph.css == name);
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
                    <Text>Toto</Text>
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

export default connect(mapStateToProps, mapDispachToProps)(MyCoins);