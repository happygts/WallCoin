
import React, { Component } from 'react';
import ReactNative from 'react-native';
import PropTypes from 'prop-types';

import { Container, Header, Content, List, ListItem, Text, Left, Body, Right, Switch, Card, CardItem, CardSwiper, SwipeRow, Button, Icon as IconNativeBase } from 'native-base';

import { FontelloIcon, checkFontelloIconExist } from '../utils/AppIcons'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
            <SwipeRow style={[styles.listElement, { marginTop: 10 }]}
                rightOpenValue={-100}
                right={
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                        <TouchableHighlight onPress={() => this.props.editOperation(this.props.operation.id)} style={{ flex: 1 }}>
                            <FontAwesomeIcon name="pencil" color="#FFD700" style={{ marginTop: 35, marginLeft: 10 }} size={30} />
                        </TouchableHighlight >
                        <TouchableHighlight onPress={() => this.props.deleteOperation(this.props.operation.id)} style={{ flex: 1 }}>
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
                                        {this.props.operation.type == "buy" ?
                                            <Ionicons name="md-arrow-dropright-circle" color="#090" style={{ marginTop: 1, marginLeft: 5 }} size={50} /> :
                                            <Ionicons name="md-arrow-dropleft-circle" color="#900" style={{ marginTop: 1, marginLeft: 5 }} size={50} />
                                        }
                                    </Left>
                                    <Body>
                                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                            <Text style={{ fontSize: 12 }}> Quantity : {this.props.operation.quantity}</Text>
                                            {this.props.operation.type == "buy" ?
                                                <Text style={{ fontSize: 12 }}> Buying price : {this.props.operation.price} $</Text> :
                                                <Text style={{ fontSize: 12 }}> Selling price : {this.props.operation.price} $</Text>
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
    operation: PropTypes.object.isRequired
};

export default CardOneOperation;
