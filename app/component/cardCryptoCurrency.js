
import React, { Component } from 'react';
import ReactNative from 'react-native';
import PropTypes from 'prop-types';

import { Container, Header, Content, List, ListItem, Text, Left, Body, Right, Switch, Card, CardItem, CardSwiper, SwipeRow, Button, Icon as IconNativeBase } from 'native-base';

const {
    View,
    ScrollView,
    RefreshControl,
    TouchableHighlight,
    StyleSheet
  } = ReactNative;

import styles from '../styles/AppStyle'

import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../../assets/config.json';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const Icon = createIconSetFromFontello(fontelloConfig);

const CardCryptoCurrency = ({ cryptoCurrency, pressFav, isFav, checkIfIcon }) => (
    <SwipeRow style={styles.listElement}
        rightOpenValue={-75}
        right={
            <TouchableHighlight onPress={() => pressFav(cryptoCurrency.id)}>
                {isFav(cryptoCurrency.id) ? <FontAwesomeIcon name="star" color="#FFD700" style={{ marginTop: 45, marginLeft: 11 }} size={30} /> : <FontAwesomeIcon name="star-o" color="#FFD700" style={{ marginTop: 45, marginLeft: 11 }} size={30} />}
            </TouchableHighlight >
        }
        body={
            <Container>
                <Content>
                    <Card>
                        <CardItem>
                            <Left>
                                {checkIfIcon(cryptoCurrency.symbol.toLowerCase() + "-alt", fontelloConfig) ?
                                    <Icon name={cryptoCurrency.symbol.toLowerCase() + "-alt"} size={55} style={{ marginTop: 5, marginBottom: 5 }} /> :
                                    <Icon name="coin-2" size={55} style={{ marginTop: 5, marginBottom: 5 }} />
                                }
                                <Body>
                                    <Text>{cryptoCurrency.name}</Text>
                                    <Text note>{cryptoCurrency.symbol}</Text>
                                </Body>
                            </Left>
                            <Body>
                                <Body>
                                    <Text> Price (USD) : {parseFloat(cryptoCurrency.price_usd).toFixed(2)}</Text>
                                </Body>
                                <CardItem>
                                    <View style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                    }}>
                                        <Text>Change 24h:</Text>
                                        {parseInt(cryptoCurrency.percent_change_24h) > 0 ?
                                            <FontAwesomeIcon name="arrow-up" size={10} color="#090" /> :
                                            <FontAwesomeIcon name="arrow-down" size={10} color="#900" />
                                        }
                                        <Text>{cryptoCurrency.percent_change_24h}%</Text>
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

CardCryptoCurrency.propTypes = {
    cryptoCurrency: PropTypes.object.isRequired,
    pressFav: PropTypes.func.isRequired,
    isFav: PropTypes.func.isRequired,
    checkIfIcon: PropTypes.func.isRequired
};

export default CardCryptoCurrency;
