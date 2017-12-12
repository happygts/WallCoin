import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactNative from 'react-native';

const {
  View,
  Text,
} = ReactNative;

class Home extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View>
        <Text>Test</Text>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps)(Home);
