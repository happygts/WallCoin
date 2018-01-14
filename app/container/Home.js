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
      searchText: ''
    }
  }

  componentDidMount() {
    // this.props.initCoins();
    // this.props.initPortfolios();
    this.props.fetchListDataCoins();
  }

  handleLoadMore(params) {
    this.props.fetchListDataCoins();
  }

  handleRefresh() {
    this.props.refreshCoins();  
  }

  _onSearchTextChanged(newText) {
    this.setState(() => {
      return {
        searchText: newText
      }
    })
  }

  _onSearchCancel() {
    this.setState(() => {
      return {
        searchText: ''
      }
    })
  }

  isFav(id) {
    return false
  }

  pressFav(id) {
    this.isFav(id) ? this.props.removeFavCryptoCurrency(id) : this.props.addFavCryptoCurrency(id);
  }

  isMyCoins(id) {
    return this.props.myCoins.find((item) => {
      return item.id == id
    });
  }

  pressMyCoins(id) {
    this.isMyCoins(id) ? this.props.deleteMyCoin(id) : this.props.createMyCoin(id);
  }

  renderFooter = () => {
    if (!this.props.coins.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this.props.asyncInitialState.loading ?
          <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-around' }}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
          :
          <View>
            <Search
              ref="search_box"
              onChangeText={(newText) => this._onSearchTextChanged(newText)}
              onCancel={this._onSearchCancel.bind(this)}
              onDelete={this._onSearchCancel.bind(this)}
            />
            <FlatList
              data={this.props.store.coins && this.props.coins && this.props.coins.list ? this.props.coins.list.filter(coinId => {
                if (this.props.store.coins[coinId]) {
                  var coin = this.props.store.coins[coinId].value;

                  return coin && coin.name && coin.name.includes(this.state.searchText)
                }
                return false;
              }) : []}
              renderItem={({ item }) => (
                <CardCryptoCurrency
                  key={item}
                  cryptoCurrency={this.props.store.coins[item].value}
                  pressFav={this.pressFav.bind(this)}
                  pressMyCoins={this.pressMyCoins.bind(this)}
                  isFav={this.isFav.bind(this)}
                  isMyCoins={this.isMyCoins.bind(this)}
                />
              )}
              ListFooterComponent={this.renderFooter}
              keyExtractor={(item, index) => index}
              onEndReached={this.handleLoadMore.bind(this)}
              onEndReachedThreshold={0}
              onRefresh={this.handleRefresh.bind(this)}
              refreshing={this.props.coins.refreshing}
            />
          </View>
        }
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  store: state.store,
  coins: state.coins,
  myCoins: state.myCoins,
  asyncInitialState: state.asyncInitialState
})

function mapDispachToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispachToProps)(Home);