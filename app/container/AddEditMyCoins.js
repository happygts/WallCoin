import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactNative from 'react-native';
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';
import update from 'immutability-helper';

import styles from '../styles/AppStyle'
import { ActionCreators } from '../actions'

import { Container, Header, Content, List, ListItem, Text, Left, Body, Right, Switch, Card, CardItem, CardSwiper, SwipeRow, Button, Icon as IconNativeBase, Picker, Form, Item, Label, Input } from 'native-base';

const PickerItem = Picker.Item;

const {
  View,
    ScrollView,
    RefreshControl,
    TouchableHighlight,
    StyleSheet
} = ReactNative;

class AddEditMyCoins extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currencySelected: props.myCoin ? props.myCoin.id.toString() : "",
            quantity: props.myCoin ? props.myCoin.quantity.toString() : "",
            buyingPrice: props.myCoin ? props.myCoin.buyingPrice.toString() : "",
            add: props.myCoin == undefined,
            error: {
                currencySelected: false,
                quantity: false,
                buyingPrice: false
            }
        };
    }

    onCurrencySelected(value) {
        this.setState((state) => {
            return {
                currencySelected: value
            }
        })
    }

    getNewNumber(value) {
        let newText = '';
        let numbers = '0123456789.,';
        let error = false;

        for (var i = 0; i < value.length; i++) {
            if (numbers.indexOf(value[i]) > -1) {
                newText = newText + value[i];
            }
            else {
                error = true;
            }
        }
        if (error) {
            alert("please enter numbers only");
        }

        return newText
    }

    onQuantityChanged(value) {
        var newQuantity = this.getNewNumber(value);

        this.setState((state) => {
            return {
                currencySelected: state.currencySelected,
                quantity: newQuantity,
                buyingPrice: state.buyingPrice
            }
        });
    }

    onBuyingPriceChanged(value) {
        var newBuyingPrice = this.getNewNumber(value);

        this.setState((state) => {
            return {
                currencySelected: state.currencySelected,
                quantity: state.quantity,
                buyingPrice: newBuyingPrice
            }
        });
    }

    createEditMyCoin() {
        this.setState((state) => {
            return {
                error: {
                    currencySelected: !this.state.currencySelected,
                    quantity: !this.state.quantity,
                    buyingPrice: !this.state.buyingPrice
                }
            }
        });

        if (this.state.currencySelected && this.state.quantity && this.state.buyingPrice) {
            if (this.state.add) {
                this.props.createMyCoin({
                    id: this.state.currencySelected,
                    quantity: parseFloat(this.state.quantity),
                    buyingPrice: parseFloat(this.state.buyingPrice)
                });
            }
            else {
                this.props.editMyCoin({
                    id: this.state.currencySelected,
                    quantity: parseFloat(this.state.quantity),
                    buyingPrice: parseFloat(this.state.buyingPrice)
                });
            }
            this.props.navigator.pop({
                animated: true,
                animationType: 'fade',
            });
        }
    }

    alreadyExist(id) {
        return this.props.myCoins.find((myCoin) => {
            return myCoin.id == id;
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Form>
                    {this.state.add ? <Item error={this.state.error.currencySelected}>
                        <Picker
                            iosHeader="Select one"
                            selectedValue={this.state.currencySelected}
                            onValueChange={this.onCurrencySelected.bind(this)}
                            mode="dropdown"
                            placeholder="CryptoCurrency">
                            {!this.props.cryptoCurencies.loading && this.props.cryptoCurencies.list
                                .filter(cryptoCurrency => !this.alreadyExist(cryptoCurrency.id))
                                .map(cryptoCurrency => (
                                    <PickerItem key={cryptoCurrency.id} label={cryptoCurrency.name} value={cryptoCurrency.id} />
                                ))
                            }
                        </Picker>
                    </Item> : null}
                    <Item error={this.state.error.quantity} >
                        <Input onChangeText={(text) => this.onQuantityChanged(text)} value={this.state.quantity} placeholder="Quantity" />
                    </Item>
                    <Item error={this.state.error.buyingPrice} >
                        <Input onChangeText={(text) => this.onBuyingPriceChanged(text)} value={this.state.buyingPrice} placeholder="Buying price" />
                    </Item>
                    <Button style={{ marginTop: 10 }} full success onPress={() => this.createEditMyCoin()}>
                        <Text>{this.state.add ? "Add" : "Edit"}</Text>
                    </Button>
                </Form>
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

export default connect(mapStateToProps, mapDispachToProps)(AddEditMyCoins);