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
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
        console.log("this.props :", props)
    }

    componentWillReceiveProps(nextProps) {
        this.displayErrorMessage(nextProps);
    }

    displayErrorMessage(nextProps) {
        const errorMessage = nextProps.user.error.isError;

        if (!errorMessage) {
          return
        }
        Toast.show({
            text: nextProps.user.error.message,
            position: 'bottom',
            type: 'warning',
            buttonText: 'Okay'
        })
    }

    validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return re.test(email);
    }

    checkError() {
        var error = false;

        if (this.state.password.length <= 0) {
            Toast.show({
                text: 'Password is empty',
                position: 'bottom',
                type: 'warning',
                buttonText: 'Okay'
            })
            error = true;
        }
        if (!this.validateEmail(this.state.email)) {
            Toast.show({
                text: 'Email is not correct',
                position: 'bottom',
                type: 'warning',
                buttonText: 'Okay'
            })
            error = true;
        }

        return error;
    }

    login() {
        if (!this.checkError()) {
            this.props.login(this.state.email, this.state.password);
        }
    }

    register() {
        // if (!this.checkError()) {
        this.props.register(this.state.email, this.state.password);
        // }
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
                        {this.props.user.connecting ? (
                            <ActivityIndicator style={[styles.itemForm, styles.activityIndicatorLogin]}  size="large" color="#ffd700" />
                        ) : null}
                        {!this.props.user.connecting ? (
                            <Button full light style={styles.itemForm} onPress={() => this.login()}>
                                <Text>Connect</Text>
                            </Button>
                        ) : null}
                        {!this.props.user.connecting ? (
                            <Button full style={[styles.itemForm, styles.buttonCreateAccount]} onPress={() => this.register()}>
                                <Text>Create account</Text>
                            </Button>
                        ) : null}
                    </View>
                </View>

            </Root>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

function mapDispachToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispachToProps)(Login);