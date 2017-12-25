import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactNative from 'react-native';
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';
import update from 'immutability-helper';

import styles from '../styles/AppStyle'
import { ActionCreators } from '../actions'

import { Form, Item, Input, Button, Text } from 'native-base';

const {
  View,
    ScrollView,
    RefreshControl,
    TouchableHighlight,
    StyleSheet,
    Picker
} = ReactNative;

class AddEditOneOperation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            operation: {
                id: props.operation? props.operation.id : null,
                bought: props.operation ? props.operation.bought : true,
                quantity: props.operation ? props.operation.quantity : "",
                buyingPrice: props.operation ? props.operation.buyingPrice : "",
            },
            add: props.operation == undefined,
            error: {
                quantity: false,
                buyingPrice: false
            }
        };
    }

    onOperationSelected() {
        this.setState((state) => {
            return update(state, {
                operation: {
                    $merge: {
                        bought: !state.operation.bought
                    }
                }
            });
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
            return update(state, {
                operation: {
                    $merge: {
                        quantity: newQuantity
                    }
                }
            });
        })
    }

    onBuyingPriceChanged(value) {
        var newBuyingPrice = this.getNewNumber(value);

        this.setState((state) => {
            return update(state, {
                operation: {
                    $merge: {
                        buyingPrice: newBuyingPrice
                    }
                }
            });
        })
    }

    createEditOperation() {
        this.setState((state) => {
            return {
                error: {
                    quantity: !this.state.operation.quantity,
                    buyingPrice: !this.state.operation.buyingPrice
                }
            }
        });

        if (this.state.operation.quantity && this.state.operation.buyingPrice) {
            // ajouter une operation.
            this.state.operation.quantity = parseFloat(this.state.operation.quantity);
            this.state.operation.buyingPrice = parseFloat(this.state.operation.buyingPrice);
            var newOperation = {
                bought: this.state.operation.bought,
                quantity: this.state.operation.quantity,
                buyingPrice: this.state.operation.buyingPrice,
            }
            if (this.state.add) {
                this.props.addOperetion(this.props.myCoin.id, newOperation);
            }
            else {
                this.props.editOperation(this.props.myCoin.id, this.state.operation.id, newOperation);
            }

            this.props.navigator.pop({
                animated: true,
                animationType: 'fade',
            });
        }
    }

    render() {
        return (
            <View style={styles.containerPush}>
                <Form>
                    <Picker
                        style={styles.pickerInsideForm}
                        selectedValue={this.state.operation.bought}
                        onValueChange={this.onOperationSelected.bind(this)}>
                        <Picker.Item label="Bought" value={true} />
                        <Picker.Item label="Sold" value={false} />
                    </Picker>
                    <Item error={this.state.error.quantity} >
                        <Input onChangeText={(text) => this.onQuantityChanged(text)} value={this.state.operation.quantity.toString()} placeholder="Quantity" />
                    </Item>
                    <Item error={this.state.error.buyingPrice} >
                        <Input onChangeText={(text) => this.onBuyingPriceChanged(text)} value={this.state.operation.buyingPrice.toString()} placeholder="Buying price" />
                    </Item>
                    <Button style={{ marginTop: 10 }} full success onPress={() => this.createEditOperation()}>
                        <Text>{this.state.add ? "Add" : "Edit"}</Text>
                    </Button>
                </Form>
            </View>
        )
    }
}

AddEditOneOperation.propTypes = {
    myCoin: PropTypes.object.isRequired,
    operation: PropTypes.object
};

function mapDispachToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(null, mapDispachToProps)(AddEditOneOperation);