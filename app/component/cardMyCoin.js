
import React, { Component } from 'react';
import ReactNative from 'react-native';
import PropTypes from 'prop-types';

import { Container, Header, Content, List, ListItem, Text, Left, Body, Right, Switch, Card, CardItem, CardSwiper, SwipeRow, Button, Icon as IconNativeBase } from 'native-base';

import { FontelloIcon, checkFontelloIconExist } from '../utils/AppIcons'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import calculateOperationsMyCoin from '../utils/calculateOperationsMyCoin';

const {
    View,
    ScrollView,
    RefreshControl,
    TouchableHighlight,
    StyleSheet
  } = ReactNative;

import styles from '../styles/AppStyle'

class CardMyCoin extends Component {
    constructor(props) {
        console.log("ccalculateOperationsMyCoin", calculateOperationsMyCoin)
        super(props);
        this.state = calculateOperationsMyCoin(props.myCoin, props.coin);
    }

    componentWillReceiveProps(newProps) {
        this.setState(() => calculateOperationsMyCoin(newProps.myCoin, newProps.coin));
    }

    render() {
        return (
            <Container style={styles.listElementMyCoin}>
                <Content>
                    <Card>
                        <CardItem button={true} onPress={() => this.props.goToOneMyCoins(this.props.myCoin)}>
                            <Left>
                                {checkFontelloIconExist(this.props.myCoin.symbol.toLowerCase() + "-alt") ?
                                    <FontelloIcon name={this.props.myCoin.symbol.toLowerCase() + "-alt"} size={55} style={{ marginTop: 5, marginBottom: 5 }} /> :
                                    <FontelloIcon name="coin-2" size={55} style={{ marginTop: 5, marginBottom: 5 }} />
                                }
                                <Body>
                                    <Text>{this.props.myCoin.name}</Text>
                                    <Text note>{this.state.nbCoins} {this.props.myCoin.symbol}</Text>
                                </Body>
                            </Left>
                            <Body>
                                <CardItem>
                                    <View style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                    }}>
                                        <Text style={{ fontSize: 12 }}>Price (USD) {this.state.totalMonneyInDollar}</Text>
                                    </View>
                                </CardItem>
                                <CardItem>
                                    <View style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                    }}>
                                        <Text style={{ fontSize: 12 }}>Beneficial {this.state.beneficial}$</Text>
                                    </View>
                                </CardItem>
                                <CardItem>
                                    <View style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        justifyContent: 'center'
                                    }}>
                                        {this.state.differencePercentageIsPositive ?
                                            <FontAwesomeIcon name="arrow-up" size={40} color="#090" /> :
                                            <FontAwesomeIcon name="arrow-down" size={40} color="#900" />
                                        }
                                        <Text style={{ marginTop: 13, marginLeft: 10 }}>{this.state.differencePercentage}%</Text>
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
    coin: PropTypes.object.isRequired,
    myCoin: PropTypes.object.isRequired
};

export default CardMyCoin;
