
import React, { Component } from 'react';
import ReactNative from 'react-native';
import PropTypes from 'prop-types';

import { Container, Header, Content, List, ListItem, Text, Left, Body, Right, Switch, Card, CardItem, CardSwiper, SwipeRow, Button, Icon as IconNativeBase } from 'native-base';

import { FontelloIcon, checkFontelloIconExist } from '../utils/AppIcons'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const {
    View,
    ScrollView,
    RefreshControl,
    TouchableHighlight,
    StyleSheet
  } = ReactNative;

import styles from '../styles/AppStyle'

class CardMyCoin extends Component {
    render() {
        return (
            <Container style={styles.listElementMyCoin}>
                <Content>
                    <Card>
                        <CardItem button={true} onPress={() => this.props.goToOneMyCoins(this.props.myCoinValue.id)}>
                            <Left>
                                {checkFontelloIconExist(this.props.myCoinValue.symbol.toLowerCase() + "-alt") ?
                                    <FontelloIcon name={this.props.myCoinValue.symbol.toLowerCase() + "-alt"} size={55} style={{ marginTop: 5, marginBottom: 5 }} /> :
                                    <FontelloIcon name="coin-2" size={55} style={{ marginTop: 5, marginBottom: 5 }} />
                                }
                                <Body>
                                    <Text>{this.props.myCoinValue.name}</Text>
                                    <Text note>{this.props.nbCoins} {this.props.myCoinValue.symbol}</Text>
                                </Body>
                            </Left>
                            <Body>
                                <CardItem>
                                    <View style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                    }}>
                                        <Text style={{ fontSize: 12 }}>Price (USD){this.props.totalMonneyInDollar}</Text>
                                    </View>
                                </CardItem>
                                <CardItem>
                                    <View style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                    }}>
                                        <Text style={{ fontSize: 12 }}>Beneficial{this.props.beneficial}$</Text>
                                    </View>
                                </CardItem>
                                <CardItem>
                                    <View style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                    }}>
                                        {this.props.differencePercentage >= 0 ?
                                            <FontAwesomeIcon name="arrow-up" size={40} color="#090" /> :
                                            <FontAwesomeIcon name="arrow-down" size={40} color="#900" />
                                        }
                                        <Text style={{ marginTop: 13, marginLeft: 10 }}>{this.props.differencePercentage}%</Text>
                                    </View>
                                </CardItem>
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        )
    }
}

CardMyCoin.propTypes = {
    deleteMyCoin: PropTypes.func.isRequired,
    goToOneMyCoins: PropTypes.func.isRequired,
    myCoinValue: PropTypes.object.isRequired,
    nbCoins: PropTypes.string.isRequired,
    totalMonneyInDollar: PropTypes.string.isRequired,
    differencePercentage: PropTypes.string.isRequired,
    beneficial: PropTypes.string.isRequired,
};

export default CardMyCoin;
