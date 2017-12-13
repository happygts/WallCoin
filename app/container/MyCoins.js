import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactNative from 'react-native';
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';

import styles from '../styles/AppStyle'
import { ActionCreators } from '../actions'

import CardMyCoin from '../component/cardMyCoin'

import { iconsMap } from '../utils/AppIcons';

const {
  View,
    ScrollView,
    RefreshControl,
    TouchableHighlight,
    StyleSheet,
    Text
} = ReactNative;

class MyCoins extends Component {
    // static navigatorButtons = {
    //     leftButtons: [
    //         {
    //             title: 'Edit', // for a textual button, provide the button title (label)
    //             id: 'edit', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
    //             testID: 'e2e_rules', // optional, used to locate this view in end-to-end tests
    //             disabled: true, // optional, used to disable the button (appears faded and doesn't interact)
    //             disableIconTint: true, // optional, by default the image colors are overridden and tinted to navBarButtonColor, set to true to keep the original image colors
    //             showAsAction: 'ifRoom', // optional, Android only. Control how the button is displayed in the Toolbar. Accepted valued: 'ifRoom' (default) - Show this item as a button in an Action Bar if the system decides there is room for it. 'always' - Always show this item as a button in an Action Bar. 'withText' - When this item is in the action bar, always show it with a text label even if it also has an icon specified. 'never' - Never show this item as a button in an Action Bar.
    //             buttonColor: 'blue', // Optional, iOS only. Set color for the button (can also be used in setButtons function to set different button style programatically)
    //             buttonFontSize: 14, // Set font size for the button (can also be used in setButtons function to set different button style programatically)
    //             buttonFontWeight: '600', // Set font weight for the button (can also be used in setButtons function to set different button style programatically)
    //         },
    //         // {
    //         //     icon: require('../../assets/images/navicon_add.png'), // for icon button, provide the local image asset name
    //         //     id: 'add' // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
    //         // }
    //     ]
    // };


    constructor(props) {
        super(props);
        // if you want to listen on navigator events, set this up
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    componentWillMount() {
        // To delete
        if (this.props.myCoins && this.props.myCoins.length == 0) {
            this.props.createMyCoin({
                id: "bitcoin",
                quantity: 1.2341,
                buyingPrice: 5412.14
            });
        }
        console.log("componentWillMount");
    }

    componentWillReceiveProps() {
        console.log("componentWillReceiveProps");
    }

    onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
        if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
            if (event.id == 'add') {
                console.log('NavBar', 'Add button pressed');
            }
        }
    }

    _onRefresh() {
        this.props.fetchCryptoCurencies();
    }

    checkIfIcon(name, fonteloConfig) {
        return !fonteloConfig.glyphs.every(glyph => {
            return !(glyph.css == name);
        });
    }

    calculateOwn(myCoin) {
        let coinValue = this.getCoinValue(myCoin);

        if (coinValue) {
            return (myCoin.quantity * coinValue.price_usd).toPrecision(6);
        }
        return (-1);
    }

    calculateAugmentation(myCoin) {
        let coinValue = this.getCoinValue(myCoin);

        if (coinValue) {
            return ((myCoin.buyingPrice * 100 / coinValue.price_usd).toPrecision(6))
        }
        return (-1);
    }

    getCoinValue(myCoin) {
        return this.props.cryptoCurencies.list.find((cryptoCurencie) => {
            return cryptoCurencie.id == myCoin.id;
        });
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
                    {this.props.myCoins && this.props.myCoins.length && this.props.cryptoCurencies && this.props.cryptoCurencies.list.length ? this.props.myCoins.map((myCoin) => (
                        <CardMyCoin key={myCoin.id} myCoin={myCoin}
                            augmentation={this.calculateAugmentation(myCoin)}
                            myCoinValue={this.getCoinValue(myCoin)}
                            myCoinOwn={this.calculateOwn(myCoin)}
                            checkIfIcon={this.checkIfIcon.bind(this)} />
                    )) : null}
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    cryptoCurencies: state.cryptoCurencies,
    myCoins: state.myCoins
})

function mapDispachToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispachToProps)(MyCoins);