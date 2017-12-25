import React, { Component } from 'react';
import ReactNative from 'react-native';
import PropTypes from 'prop-types';

const {
    View,
    StyleSheet
} = ReactNative;

class ViewFlexWidthCenterHeight extends Component {
    render() {
        return (
            <View style={{
                ...this.props.style,
                height: this.props.height,
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                {this.props.children}
            </View>
        );
    }
}


ViewFlexWidthCenterHeight.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    height: PropTypes.number.isRequired
};


export default ViewFlexWidthCenterHeight;
