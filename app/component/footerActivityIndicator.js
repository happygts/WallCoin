import React, { Component } from 'react';
import ReactNative from 'react-native';

const {
    View,
    StyleSheet,
    ActivityIndicator
} = ReactNative;

class FooterActivityIndicator extends Component {
    render() {
        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: "#ffd700"
                }}>
                <ActivityIndicator animating size="large" />
            </View >
        )
    }
}

export default FooterActivityIndicator;