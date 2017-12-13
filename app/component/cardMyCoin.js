
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

const CardMyCoin = ({ myCoin, augmentation, myCoinValue, myCoinOwn, checkIfIcon }) => (
    <SwipeRow style={styles.listElement}
        rightOpenValue={-75}
        right={
            <View></View>
        }
        body={
            <Container>
                <Content>
                    <Card>
                        <CardItem>
                            <Left>
                                {checkIfIcon(myCoinValue.symbol.toLowerCase() + "-alt", fontelloConfig) ?
                                    <Icon name={myCoinValue.symbol.toLowerCase() + "-alt"} size={55} style={{ marginTop: 5, marginBottom: 5 }} /> :
                                    <Icon name="coin-2" size={55} style={{ marginTop: 5, marginBottom: 5 }} />
                                }
                                <Body>
                                    <Text>{myCoinValue.name}</Text>
                                    <Text note>{myCoin.quantity} {myCoinValue.symbol}</Text>
                                </Body>
                            </Left>
                            <Body>
                                <CardItem>
                                    <Text style={{fontSize: 12}}> Price (USD) : {myCoinOwn}</Text>
                                </CardItem>
                                <CardItem>
                                    <Text style={{fontSize: 12}}> Beneficial : {(myCoinOwn - (myCoin.quantity * myCoin.buyingPrice)).toPrecision(8) } $</Text>
                                </CardItem>
                                <CardItem>
                                    <View style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                    }}>
                                        {augmentation > 0 ?
                                            <FontAwesomeIcon name="arrow-up" size={40} color="#090" /> :
                                            <FontAwesomeIcon name="arrow-down" size={40} color="#900" />
                                        }
                                        <Text style={{marginTop: 13, marginLeft: 10}}>{augmentation}%</Text>
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

CardMyCoin.propTypes = {
    myCoin: PropTypes.object.isRequired,
    augmentation: PropTypes.number.isRequired,
    myCoinValue: PropTypes.number.isRequired,
    myCoinOwn: PropTypes.number.isRequired,
    checkIfIcon: PropTypes.func.isRequired
};

export default CardMyCoin;
