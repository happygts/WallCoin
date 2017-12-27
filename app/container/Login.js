import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactNative from 'react-native';
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';

import styles from '../styles/AppStyle'
import { ActionCreators } from '../actions'

import { FontelloIcon } from '../utils/AppIcons'

import { Label, Item, Input, Button, Toast, Root } from 'native-base';
const {
    View,
    ScrollView,
    FlatList,
    RefreshControl,
    TouchableHighlight,
    StyleSheet,
    Text,
    ActivityIndicator,
    TextInput
} = ReactNative;

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: ""
        }
    }
    validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return re.test(email);
    }

    checkError() {
        var errors = false;

        if (this.state.password.length <= 0) {
            Toast.show({
                text: 'Password is empty',
                position: 'bottom',
                type: 'warning',
                buttonText: 'Okay'
            })
            errors = true;
        }
        if (!this.validateEmail(this.state.email)) {
            Toast.show({
                text: 'Email is not correct',
                position: 'bottom',
                type: 'warning',
                buttonText: 'Okay'
            })
            errors = true;
        }

        return errors;
    }

    login() {
        if (!this.checkError()) {
            this.props.login(this.state.email, this.state.password);
        }
    }

    register() {
        if (!this.checkError()) {
            this.props.register(this.state.email, this.state.password);
        }
    }

    render() {
        return (
            <Root>
                <View style={{
                    flex: 1,
                }}>
                    <View style={{
                        flex: 0.4,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Text style={styles.title}>WallCoin</Text>
                        <FontelloIcon name="coin-2" size={80} color={"#ffd700"} />
                    </View>
                    <View style={{
                        flex: 0.5,
                        marginLeft: 10,
                        marginRight: 10,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Item floatingLabel style={styles.itemForm}>
                            <Label>Email</Label>
                            <Input autoCapitalize="none" value={this.state.email} onChangeText={(email) => this.setState({ email })} />
                        </Item>
                        <Item floatingLabel style={styles.itemForm}>
                            <Label>Password</Label>
                            <Input autoCapitalize="none" secureTextEntry={true} value={this.state.password} onChangeText={(password) => this.setState({ password })} />
                        </Item>
                        <Button full light style={styles.itemForm} onPress={() => this.login()}>
                            <Text>Connect</Text>
                        </Button>
                        <Button full style={[styles.itemForm, styles.buttonCreateAccount]} onPress={() => this.register()}>
                            <Text>Create account</Text>
                        </Button>
                    </View>
                </View>
            </Root>
        )
    }
}

const mapStateToProps = (state) => ({
    cryptoCurencies: state.cryptoCurencies,
    myCoins: state.myCoins,
    asyncInitialState: state.asyncInitialState
})

function mapDispachToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispachToProps)(Login);