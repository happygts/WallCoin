import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactNative from 'react-native';
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';

import styles from '../styles/AppStyle'
import { ActionCreators } from '../actions'

import CardMyCoin from '../component/cardMyCoin'

import { iconsMap } from '../utils/AppIcons';

const {
  View,
    ScrollView,
    RefreshControl,
    TouchableHighlight,
    StyleSheet,
    Text
} = ReactNative;

class AddEditMyCoins extends Component {
    componentWillMount() {
        console.log("componentWillMount");
    }

    componentWillReceiveProps() {
        console.log("componentWillReceiveProps");
    }

    checkIfIcon(name, fonteloConfig) {
        return !fonteloConfig.glyphs.every(glyph => {
            return !(glyph.css == name);
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Test</Text>
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

export default connect(mapStateToProps, mapDispachToProps)(AddEditMyCoins);