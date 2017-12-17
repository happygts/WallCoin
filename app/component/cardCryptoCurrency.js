
import React, { Component } from 'react';
import ReactNative from 'react-native';
import PropTypes from 'prop-types';

import { Container, Content, Text, Left, Body, Right, Switch, Card, CardItem, CardSwiper, SwipeRow, Button, Icon as IconNativeBase } from 'native-base';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { FontelloIcon, checkFontelloIconExist } from '../utils/AppIcons'

const {
    View,
    ScrollView,
    RefreshControl,
    TouchableHighlight,
    StyleSheet
  } = ReactNative;

import styles from '../styles/AppStyle'

class CardCryptoCurrency extends React.Component {
    constructor(props) {
        super(props)

        this.pressFav = this.pressFav.bind(this)
        this.state = {
            isFav: props.isFav(this.props.cryptoCurrency.id)
        };
    }

    pressFav() {
        const wasFav = this.state.isFav;
        this.setState({ isFav: !this.state.isFav });

        this.props.pressFav(this.props.cryptoCurrency.id)
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.isFav(nextProps.cryptoCurrency.id) !== this.state.isFav;
    }

    render() {
        return (
            <SwipeRow style={styles.listElement}
                rightOpenValue={-75}
                right={
                    <TouchableHighlight onPress={() => this.pressFav(this.props.cryptoCurrency.id)}>
                        {this.state.isFav ?
                            <FontAwesomeIcon name="star" color="#FFD700" style={{ marginTop: 45, marginLeft: 11 }} size={30} /> :
                            <FontAwesomeIcon name="star-o" color="#FFD700" style={{ marginTop: 45, marginLeft: 11 }} size={30} />}
                    </TouchableHighlight >
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
                                            <Text style={{ fontSize: 12 }}> Price (USD) : {parseFloat(this.props.cryptoCurrency.price_usd).toPrecision(8)}</Text>
                                        </Body>
                                        <CardItem>
                                            <View style={{
                                                flex: 1,
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                            }}>
                                                <Text>Change 24h:</Text>
                                                {parseInt(this.props.cryptoCurrency.percent_change_24h) > 0 ?
                                                    <FontAwesomeIcon name="arrow-up" size={10} color="#090" /> :
                                                    <FontAwesomeIcon name="arrow-down" size={10} color="#900" />
                                                }
                                                <Text>{this.props.cryptoCurrency.percent_change_24h}%</Text>
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
    isFav: PropTypes.func.isRequired,
};

export default CardCryptoCurrency;
