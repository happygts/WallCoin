import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactNative from 'react-native';
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';

import { ActionCreators } from '../actions'

const {
    View,
    ScrollView,
    FlatList,
    RefreshControl,
    TouchableHighlight,
    StyleSheet,
    Text,
    Button,
    ActivityIndicator
} = ReactNative;

class Login extends Component {
    login() {
        this.props.login();
    }
    render() {
        return (
            <Button title="Test" onPress={() => this.login()}/>
        )
    }
}

const mapStateToProps = (state) => ({
    cryptoCurencies: state.cryptoCurencies,
    myCoins: state.myCoins,
    asyncInitialState: state.asyncInitialState
})

function mapDispachToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispachToProps)(Login);