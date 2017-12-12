import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactNative from 'react-native';
import { bindActionCreators } from 'redux'
import { Platform } from 'react-native';

import { ActionCreators } from '../actions'

const {
  View,
  Text,
  ScrollView,
  RefreshControl,
  TouchableHighlight,
  StyleSheet
} = ReactNative;

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchCryptoCurencies();
    console.log("componentWillMount");
  }

  componentWillReceiveProps() {
    console.log("componentWillReceiveProps");
  }

  _onRefresh() {
    this.props.fetchCryptoCurencies();
  }

  render() {
    return (
      <View style={styles.scene}>
        <ScrollView refreshControl={
            <RefreshControl
              refreshing={this.props.cryptoCurencies.loading}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
          >
          {!this.props.cryptoCurencies.loading && this.props.cryptoCurencies.list.map((cryptoCurency) => {
            return <View key={cryptoCurency.id}>
              <Text>{cryptoCurency.id}</Text>
            </View>
          })}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    ...Platform.select({
			ios: {
				paddingTop: 64
			}
		})
  },
  scrollSection: {
    flex: 0.8
  }
});


function mapStateToProps(state) {
  return {
    cryptoCurencies: state.cryptoCurencies    
  };
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispachToProps)(Home);
