import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactNative from 'react-native';
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';

import styles from '../styles/AppStyle'
import { ActionCreators } from '../actions'

import CardCryptoCurrency from '../component/cardCryptoCurrency'

const {
  View,
  ScrollView,
  RefreshControl,
  TouchableHighlight,
  StyleSheet
} = ReactNative;

class Home extends Component {
  static propTypes = {
    cryptoCurencies: {
      loading: PropTypes.bool.require,
      list: PropTypes.array.required,
      listFav: PropTypes.array.required
    }
  }
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

  checkIfIcon(name, fonteloConfig) {
    return !fonteloConfig.glyphs.every(glyph => {
      return !(glyph.css == name);
    });
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
        <ScrollView refreshControl={
          <RefreshControl
            refreshing={this.props.cryptoCurencies.loading}
            onRefresh={this._onRefresh.bind(this)}
          />
        }>
          {!this.props.cryptoCurencies.loading && this.props.cryptoCurencies.list.map((cryptoCurrency) => (
            <CardCryptoCurrency key={cryptoCurrency.id}  cryptoCurrency={cryptoCurrency} pressFav={this.pressFav.bind(this)} isFav={this.isFav.bind(this)} checkIfIcon={this.checkIfIcon.bind(this)}/>
          ))}
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  cryptoCurencies: state.cryptoCurencies
})

function mapDispachToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispachToProps)(Home);