
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

class CardOneOperation extends Component {
    render() {
        return (
            <SwipeRow style={styles.listElement}
                rightOpenValue={-100}
                right={
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                        <TouchableHighlight onPress={() => this.props.editOperation(this.props.id)} style={{ flex: 1 }}>
                            <FontAwesomeIcon name="pencil" color="#FFD700" style={{ marginTop: 35, marginLeft: 10 }} size={30} />
                        </TouchableHighlight >
                        <TouchableHighlight onPress={() => this.props.deleteOperation(this.props.id)} style={{ flex: 1 }}>
                            <FontAwesomeIcon name="trash" color="#FF0000" style={{ marginTop: 35 }} size={30} />
                        </TouchableHighlight >
                    </View>

                }
                body={
                    <Container style={styles.listElement}>
                        <Content>
                            <Card>
                                <CardItem >
                                    <Left>
                                        {this.props.bought ?
                                            <FontAwesomeIcon name="plus-circle" size={55} style={{ marginTop: 5, marginBottom: 5 }} /> :
                                            <FontAwesomeIcon name="minus-circle" size={55} style={{ marginTop: 5, marginBottom: 5 }} />
                                        }
                                    </Left>
                                    <Body>
                                        <View>
                                            <Text style={{ fontSize: 12 }}> Quantity : {this.props.quantity}</Text>
                                            {this.props.bought ?
                                                <Text style={{ fontSize: 12 }}> Buying price : {this.props.buyingPrice}</Text> :
                                                <Text style={{ fontSize: 12 }}> Selling price : {this.props.buyingPrice}</Text>
                                            }
                                        </View>
                                    </Body>
                                    <Right>

                                    </Right>
                                </CardItem>
                            </Card>
                        </Content>
                    </Container>
                }>
            </SwipeRow>
        )
    }
}

CardOneOperation.propTypes = {
    editOperation: PropTypes.func.isRequired,
    deleteOperation: PropTypes.func.isRequired,
    id: PropTypes.any.isRequired,
    bought: PropTypes.bool.isRequired,
    quantity: PropTypes.string.isRequired,
    buyingPrice: PropTypes.string.isRequired
};

export default CardOneOperation;
