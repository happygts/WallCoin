import React, { Component } from 'react'
import { connect } from 'react-redux';
import ReactNative from 'react-native';
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';

import styles from '../styles/AppStyle'
import { ActionCreators } from '../actions'

const {
    View,
    ScrollView,
    RefreshControl,
    TouchableHighlight,
    StyleSheet,
    Text
} = ReactNative;

class OneMyCoins extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>{this.props.myCoinValue.name}</Text>
            </View>
        )
    }
}

OneMyCoins.propTypes = {
    myCoin: PropTypes.object.isRequired,
    myCoinValue: PropTypes.object.isRequired
};


function mapDispachToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(null, mapDispachToProps)(OneMyCoins);