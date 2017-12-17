import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactNative from 'react-native';
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';
import Search from 'react-native-search-box';

import styles from '../styles/AppStyle'
import { ActionCreators } from '../actions'

import CardCryptoCurrency from '../component/cardCryptoCurrency'

const {
  View,
  ScrollView,
  FlatList,
  RefreshControl,
  TouchableHighlight,
  StyleSheet,
  Text,
  ActivityIndicator
} = ReactNative;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    }
  }

  componentDidMount() {
    if (this.props.cryptoCurencies.list.length <= 0) {
      this._onRefresh();
    }
  }

  _onRefresh() {
    this.props.fetchCryptoCurencies();
  }

  _onSearchTextChanged(newText) {
    console.log("_onSearchTextChanged")
    this.setState(() => {
      return {
        searchText: newText
      }
    })
  }

  _onSearchCancel() {
    console.log("_onSearchCancel")
    this.setState(() => {
      return {
        searchText: ''
      }
    })
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
        {this.props.asyncInitialState.loading ?
          <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-around' }}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
          :
          <View >
            <Search
              ref="search_box"
              onChangeText={(newText) => this._onSearchTextChanged(newText)}
              onCancel={this._onSearchCancel.bind(this)}
              onDelete={this._onSearchCancel.bind(this)}
            />
            <FlatList
              data={this.props.cryptoCurencies.list.filter(cryptoCurrency => cryptoCurrency.name.includes(this.state.searchText))}
              renderItem={({ item }) => <CardCryptoCurrency
                key={item.id}
                cryptoCurrency={item}
                pressFav={this.pressFav.bind(this)}
                isFav={this.isFav.bind(this)}
              />}>
              <RefreshControl
                refreshing={this.props.cryptoCurencies.loading}
                onRefresh={this._onRefresh.bind(this)}
              />
            </FlatList>
          </View>
        }
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  cryptoCurencies: state.cryptoCurencies,
  asyncInitialState: state.asyncInitialState
})

function mapDispachToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispachToProps)(Home);