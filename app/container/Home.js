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
    console.log("props Home : ", props.favoritesOnly);
    this.state = {
      searchText: '',
    }
  }

  componentDidMount() {
    console.log("this.props :", this.props)
    if (this.props.coins.list.length <= 0 && this.props.asyncInitialState.loading == false) {
      this._onRefresh();
    }
    this.props.fetchPageCoins(0);
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
    return this.props.coins.listFav.includes(id);
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
              data={this.props.store.coins && this.props.coins && this.props.coins.listV2 ? this.props.coins.listV2.filter(coinId => {
                var coin = this.props.store.coins[coinId].value;
                console.log("Flatlist coin :", coin);
                return coin && coin.name && coin.name.includes(this.state.searchText) && (this.props.favoritesOnly ? this.isFav(coin.id) : true)
              }) : []}
              renderItem={({ item }) => <CardCryptoCurrency
                key={item}
                cryptoCurrency={this.props.store.coins[item].value}
                pressFav={this.pressFav.bind(this)}
                pressMyCoins={this.pressMyCoins.bind(this)}
                isFav={this.isFav.bind(this)}
                isMyCoins={this.isMyCoins.bind(this)}
              />}
              keyExtractor={(item, index) => index}
              refreshControl={
                <RefreshControl
                  refreshing={this.props.coins.loading}
                  onRefresh={this._onRefresh.bind(this)}
                />
              }>
            </FlatList>
          </View>
        }
      </View>
    )
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