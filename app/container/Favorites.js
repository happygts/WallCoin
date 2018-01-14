import React, { Component } from 'react';
import { connect } from 'react-redux';
import Coins from './Coins'

class Favorites extends Component {
    render() {
        return (
            <Coins favoritesOnly={false}></Coins>
        )
    }
}

export default connect(null, null)(Favorites);