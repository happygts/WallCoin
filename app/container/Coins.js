import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactNative from 'react-native';
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';

import Search from 'react-native-search-box';

import styles from '../styles/AppStyle'
import { ActionCreators } from '../actions'
import { makeComputeListRequestItems } from '../selectors/requestSelectors'

import CardCryptoCurrency from '../component/cardCryptoCurrency'
import FooterActivityIndicator from '../component/footerActivityIndicator'

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

class Coins extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    }
  }

  componentDidUpdate() {
    console.log("Coins updated");
  }

  handleLoadMore(params) {
    this.props.fetchListDataCoins();
  }

  handleRefresh() {
    this.props.refreshDataCoins();
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

  getMyCoinWithCoinId(id) {
    let idMyCoinFound = Object.keys(this.props.myCoinsStore).find((idMyCoin) => {
      return this.props.myCoinsStore[idMyCoin].value.coinId == id
    });

    if (idMyCoinFound) {
      return this.props.myCoinsStore[idMyCoinFound];
    }
    return null;
  }

  isMyCoins(id) {
    return this.getMyCoinWithCoinId(id);
  }

  pressMyCoins(id) {
    this.isMyCoins(id) ? this.props.deleteMyCoin(this.props.user.currentPortfolioId, this.getMyCoinWithCoinId(id).value.id) : this.props.createMyCoin(this.props.user.currentPortfolioId, id, false);
  }

  isFav(id) {
    var myCoin = this.getMyCoinWithCoinId(id);

    return myCoin ? myCoin.value.isFavorite : false;
  }

  pressFav(id) {
    var myCoin = this.getMyCoinWithCoinId(id);

    if (myCoin) {
      this.props.modifyFavMyCoin(this.props.user.currentPortfolioId, myCoin.value.id, !myCoin.value.isFavorite);
    }
    else {
      this.props.createMyCoin(this.props.user.currentPortfolioId, id, true);
    }
  }

  renderFooter = () => {
    if (!this.props.coins.loading) return null;

    return (
        <FooterActivityIndicator/>
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
              data={this.props.listCoins.filter(coin => {
                return coin.value && coin.value.name && coin.value.name.includes(this.state.searchText)
              })}
              renderItem={({ item }) => (
                <CardCryptoCurrency
                  key={item}
                  coin={item.value}
                  pressFav={this.pressFav.bind(this)}
                  pressMyCoins={this.pressMyCoins.bind(this)}
                  isFav={this.isFav.bind(this)}
                  isMyCoins={this.isMyCoins.bind(this)}
                />
              )}
              keyExtractor={(item, index) => index}
              ListFooterComponent={this.renderFooter}
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

const mapStateToProps = (state, ownProps) => {
  const getListItems = makeComputeListRequestItems();

  return {
    user: state.user,
    coins: state.coins,
    listCoins: getListItems(state, ownProps, 'coins'),
    myCoinsStore: state.store.myCoins,
    asyncInitialState: state.asyncInitialState
  }
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispachToProps)(Coins);