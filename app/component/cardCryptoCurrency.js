
import React, { Component } from 'react';
import ReactNative from 'react-native';
import PropTypes from 'prop-types';

import { Container, Content, Text, Left, Body, Card, CardItem, CardSwiper, SwipeRow, Icon as IconNativeBase } from 'native-base';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { FontelloIcon, checkFontelloIconExist } from '../utils/AppIcons'
import Ionicons from 'react-native-vector-icons/Ionicons';

const {
    View,
    ScrollView,
    RefreshControl,
    TouchableHighlight,
    StyleSheet,
    Alert
  } = ReactNative;

import styles from '../styles/AppStyle'
import { BigNumber } from 'bignumber.js';

class CardCryptoCurrency extends Component {
    constructor(props) {
        super(props)

        this.pressFav = this.pressFav.bind(this)
        this.state = {
            isFav: props.isFav(this.props.cryptoCurrency.id),
            isMyCoins: props.isMyCoins(this.props.cryptoCurrency.id),
            currentCoin: {
                price: new BigNumber(this.props.cryptoCurrency.price),
                percentChange: {
                    hour: new BigNumber(this.props.cryptoCurrency.percentChange.hour),
                    day: new BigNumber(this.props.cryptoCurrency.percentChange.day),
                    week: new BigNumber(this.props.cryptoCurrency.percentChange.week)
                }
            }
        };
    }

    pressFav() {
        this.setState({ isFav: !this.state.isFav });
        this.props.pressFav(this.props.cryptoCurrency.id);
    }

    pressMyCoins() {
        if (this.state.isMyCoins) {
            Alert.alert(
                'Are you sure ?',
                'You are going to lose all your data',
                [
                    { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                    { text: 'OK', onPress: () => {
                        this.setState({ isMyCoins: !this.state.isMyCoins })
                        this.props.pressMyCoins(this.props.cryptoCurrency.id);
                    }},
                ],
            )
        }
        else {
            this.setState({ isMyCoins: !this.state.isMyCoins })
            this.props.pressMyCoins(this.props.cryptoCurrency.id);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.isFav(nextProps.cryptoCurrency.id) !== this.state.isFav || this.props.isMyCoins(nextProps.cryptoCurrency.id) !== this.state.isMyCoins;
    }

    render() {
        return (
            <SwipeRow style={styles.listElement}
                rightOpenValue={-100}
                right={
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <TouchableHighlight onPress={() => this.pressFav(this.props.cryptoCurrency.id)}>
                            {this.state.isFav ?
                                <FontAwesomeIcon name="star" color="#FFD700" style={{ marginTop: 45, marginLeft: 11 }} size={30} /> :
                                <FontAwesomeIcon name="star-o" color="#000000" style={{ marginTop: 45, marginLeft: 11 }} size={30} />
                            }
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => this.pressMyCoins(this.props.cryptoCurrency.id)}>
                            {this.state.isMyCoins ?
                                <Ionicons name="ios-cart" color="#FFD700" style={{ marginTop: 45, marginLeft: 11 }} size={30} />
                                :
                                <Ionicons name="ios-cart-outline" color="#000000" style={{ marginTop: 45, marginLeft: 11 }} size={30} />
                            }
                        </TouchableHighlight >
                    </View>
                }
                body={
                    <Container>
                        <Content>
                            <Card>
                                <CardItem>
                                    <Left>
                                        {checkFontelloIconExist(this.props.cryptoCurrency.symbol && this.props.cryptoCurrency.symbol.toLowerCase() + "-alt") ?
                                            <FontelloIcon name={this.props.cryptoCurrency.symbol.toLowerCase() + "-alt"} size={55} style={{ marginTop: 5, marginBottom: 5 }} /> :
                                            <FontelloIcon name="coin-2" size={55} style={{ marginTop: 5, marginBottom: 5 }} />
                                        }
                                        <Body>
                                            <Text>{this.props.cryptoCurrency.name}</Text>
                                            <Text note>{this.props.cryptoCurrency.symbol}</Text>
                                        </Body>
                                    </Left>
                                    <Body>
                                        <Body>
                                            <Text style={{ fontSize: 12 }}> Price (USD) : {this.state.currentCoin.price.toPrecision(5)}</Text>
                                        </Body>
                                        <CardItem>
                                            <View style={{
                                                flex: 1,
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                            }}>
                                                <View style={{
                                                    flex: 1,
                                                    flexDirection: 'row',
                                                    justifyContent: 'center',
                                                }}>
                                                    <Text>24h: </Text>
                                                </View>
                                                <View style={{
                                                    flex: 1,
                                                    flexDirection: 'row',
                                                    justifyContent: 'center',
                                                }}>
                                                    {this.state.currentCoin.percentChange.day.greaterThan(0) ?
                                                        <FontAwesomeIcon name="arrow-up" size={10} color="#090" /> :
                                                        <FontAwesomeIcon name="arrow-down" size={10} color="#900" />
                                                    }
                                                    <Text>{this.state.currentCoin.percentChange.day.toPrecision(4)}%</Text>
                                                </View>
                                            </View>
                                        </CardItem>
                                    </Body>
                                </CardItem>
                            </Card>
                        </Content>
                    </Container>
                }>
            </SwipeRow>
        )
    }
}

CardCryptoCurrency.propTypes = {
    cryptoCurrency: PropTypes.object.isRequired,
    pressFav: PropTypes.func.isRequired,
    pressMyCoins: PropTypes.func.isRequired,
    isFav: PropTypes.func.isRequired,
    isMyCoins: PropTypes.func.isRequired
};

export default CardCryptoCurrency;
