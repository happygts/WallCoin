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
                id: props.operation ? props.operation.id : null,
                bought: props.operation ? props.operation.bought : true,
                quantity: props.operation ? props.operation.quantity : "",
                price: props.operation ? props.operation.price : "",
            },
            add: props.operation == undefined,
            error: {
                quantity: false,
                price: false
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

    onpriceChanged(value) {
        var newprice = this.getNewNumber(value);

        this.setState((state) => {
            return update(state, {
                operation: {
                    $merge: {
                        price: newprice
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
                    price: !this.state.operation.price
                }
            }
        });

        if (this.state.operation.quantity && this.state.operation.price) {
            // ajouter une operation.
            this.state.operation.quantity = parseFloat(this.state.operation.quantity);
            this.state.operation.price = parseFloat(this.state.operation.price);
            var newOperation = {
                type: this.state.operation.bought ? "buy" : "sell",
                price: this.state.operation.price.toString(),
                quantity: this.state.operation.quantity.toString(),
            }
            if (this.state.add) {
                this.props.createOperation(this.props.portfolioId, this.props.myCoinId, newOperation.type, newOperation.price, newOperation.quantity);
            }
            else {
                this.props.deleteOperation(this.props.portfolioId, this.props.myCoinId, this.state.operation.id);
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
                <ScrollView>
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
                        <Item error={this.state.error.price} >
                            <Input onChangeText={(text) => this.onpriceChanged(text)} value={this.state.operation.price.toString()} placeholder="Buying price" />
                        </Item>
                        <Button style={{ marginTop: 10 }} full success onPress={() => this.createEditOperation()}>
                            <Text>{this.state.add ? "Add" : "Edit"}</Text>
                        </Button>
                    </Form>
                </ScrollView>
            </View>
        )
    }
}

AddEditOneOperation.propTypes = {
    myCoinId: PropTypes.string.isRequired,
    portfolioId: PropTypes.string.isRequired,
    operation: PropTypes.object
};

function mapDispachToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(null, mapDispachToProps)(AddEditOneOperation);