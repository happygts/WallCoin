import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import Coins from './Coins'

class Home extends Component {
  componentDidMount() {
    this.props.fetchListDataCoins();
  }
  render() {
    return (
      <Coins favoritesOnly={false}></Coins>
    )
  }
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(null, mapDispachToProps)(Home);