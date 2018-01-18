import React, { Component } from 'react'
import { connect } from 'react-redux';
import ReactNative, { Text } from 'react-native';
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';
import update from 'immutability-helper';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { FontelloIcon, checkFontelloIconExist } from '../utils/AppIcons'

import styles from '../styles/AppStyle'
import { ActionCreators } from '../actions'
import { makeComputeListRequestItems, makeComputeOneRequestItems } from '../selectors/requestSelectors'

import ViewFlexWidthCenterHeight from '../component/ViewFlexWidthCenterHeight'
import CardOneOperation from '../component/CardOneOperation'

import { BigNumber } from 'bignumber.js';

const {
    View,
    FlatList,
    Alert,
    StyleSheet
} = ReactNative;

class OneMyCoins extends Component {
    constructor(props) {
        super(props);
        this.state = this.calculEverythingFromProps(props);

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    calculEverythingFromProps(props) {
        console.log("this.props.myCoin :", props.myCoin);
        let buyOperationSum = new BigNumber(props.myCoin.value.stats.buyOperationSum);
        let buyPriceSum = new BigNumber(props.myCoin.value.stats.buyPriceSum);
        let buyWeightedSum = new BigNumber(props.myCoin.value.stats.buyWeightedSum);
        let nbOperations = new BigNumber(props.myCoin.value.stats.nbOperations);
        let totalQuantity = new BigNumber(props.myCoin.value.stats.totalQuantity);
        let hundredBigNumber = new BigNumber(100);

        let priceMyCoin = buyWeightedSum.dividedBy(buyOperationSum);
        let priceCoin = new BigNumber(props.coin.value.price);

        let possessedMyCoinValue = totalQuantity.times(priceMyCoin);
        let possessedCoinValue = totalQuantity.times(priceCoin);

        let beneficial = possessedCoinValue.minus(possessedMyCoinValue);
        let differencePercentage = hundredBigNumber.minus((possessedMyCoinValue.times(hundredBigNumber)).dividedBy(possessedCoinValue));

        return {
            beneficial: beneficial.toPrecision(4).toString(),
            differencePercentage: differencePercentage.toPrecision(4).toString(),
            differencePercentageIsPositive: differencePercentage.greaterThanOrEqualTo(0),
            totalMonneyInDollar: possessedCoinValue.toPrecision(4).toString(),
            nbCoins: totalQuantity.toPrecision(4).toString()
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState(() => this.calculEverythingFromProps(newProps));
    }

    onNavigatorEvent(event) {
        if (event.type == 'NavBarButtonPress') {
            if (event.id == 'add') {
                this.props.navigator.push({
                    screen: 'AddEditOneOperation',
                    title: "New Operation",
                    passProps: { myCoinId: this.props.myCoin.value.id, portfolioId: this.props.user.currentPortfolioId },
                    animated: true,
                    animationType: 'fade',
                    navigatorStyle: {
                        navBarTranslucent: true,
                        drawUnderNavBar: true,
                        navBarTextColor: 'white',
                        navBarButtonColor: 'white',
                        statusBarTextColorScheme: 'light',
                        drawUnderTabBar: true
                    },
                    navigatorButtons: {},
                });
            }
        }
    }

    editOperation(id) {
        console.log("this.props.operationsStore :", this.props.operationsStore, "id :", id);
        if (this.props.operationsStore[id]) {
            this.props.navigator.push({
                screen: 'AddEditOneOperation',
                title: "Edit Operation",
                passProps: { myCoinId: this.props.myCoin.value.id, portfolioId: this.props.user.currentPortfolioId, operation: this.props.operationsStore[id] },
                animated: true,
                animationType: 'fade',
                navigatorStyle: {
                    navBarTranslucent: true,
                    drawUnderNavBar: true,
                    navBarTextColor: 'white',
                    navBarButtonColor: 'white',
                    statusBarTextColorScheme: 'light',
                    drawUnderTabBar: true
                },
                navigatorButtons: {},
            });
        }
    }

    deleteOperation(operationId) {
        Alert.alert(
            'Are you sure ?',
            'This operation will be permentatly deleted',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                {
                    text: 'OK', onPress: () => {
                        this.props.deleteOperation(this.props.user.currentPortfolioId, this.props.myCoin.value.id, operationId);
                    }
                },
            ],
        )
    }

    render() {
        console.log("Render mycoin :", this.props.myCoin.value.id, this.props.myCoin)
        return (
            <View style={styles.containerPush}>
                <View style={{ flexDirection: 'row', height: 40 }}>
                    <ViewFlexWidthCenterHeight height={40}>
                        {checkFontelloIconExist(this.props.myCoin.value.symbol.toLowerCase() + "-alt") ?
                            <FontelloIcon name={this.props.myCoin.value.symbol.toLowerCase() + "-alt"} size={20} style={{ marginTop: 5, marginBottom: 5 }} /> :
                            <FontelloIcon name="coin-2" size={20} style={{ marginTop: 5, marginBottom: 5 }} />
                        }
                        <Text> {this.state.nbCoins}</Text>
                    </ViewFlexWidthCenterHeight>
                    <ViewFlexWidthCenterHeight height={40}>
                        <Text> {this.state.totalMonneyInDollar} $ </Text>
                    </ViewFlexWidthCenterHeight>
                    <ViewFlexWidthCenterHeight height={40}>
                        {this.state.beneficial >= 0 ?
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <FontAwesomeIcon name="arrow-up" size={10} color="#090" />
                                <Text style={{ color: '#090' }}>{this.state.beneficial} $</Text>
                            </View>
                            :
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <FontAwesomeIcon name="arrow-down" size={10} color="#900" />
                                <Text style={{ color: '#900' }}>{this.state.beneficial} $</Text>
                            </View>
                        }
                    </ViewFlexWidthCenterHeight>
                    <ViewFlexWidthCenterHeight height={40}>
                        {this.state.differencePercentageIsPositive ?
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <FontAwesomeIcon name="arrow-up" size={10} color="#090" />
                                <Text style={{ color: '#090' }}>{this.state.differencePercentage} %</Text>
                            </View>
                            :
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <FontAwesomeIcon name="arrow-down" size={10} color="#900" />
                                <Text style={{ color: '#900' }}>{this.state.differencePercentage} %</Text>
                            </View>
                        }
                    </ViewFlexWidthCenterHeight>
                </View>
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={this.props.listOperations}
                        renderItem={({ item }) => <CardOneOperation
                            key={item.value.id}
                            editOperation={this.editOperation.bind(this)}
                            deleteOperation={this.deleteOperation.bind(this)}
                            operation={item.value}
                        />}>
                    </FlatList>
                </View>
            </View>
        )
    }
}

OneMyCoins.propTypes = {
    myCoinId: PropTypes.string.isRequired,
    coin: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    const getOneItem = makeComputeOneRequestItems();
    const getListItems = makeComputeListRequestItems();

    return {
        myCoin: getOneItem(state, ownProps, 'myCoins', ownProps.myCoinId),
        listOperations: getListItems(state, ownProps, 'operations'),
        operationsStore: state.store.operations,
        user: state.user
    }
}

function mapDispachToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispachToProps)(OneMyCoins);