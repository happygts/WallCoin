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
import { makeComputeOneMyCoin } from '../selectors/myCoinsSelectors'

import ViewFlexWidthCenterHeight from '../component/ViewFlexWidthCenterHeight'
import CardOneOperation from '../component/CardOneOperation'

const {
    View,
    FlatList,
    Alert,
    StyleSheet
} = ReactNative;

class OneMyCoins extends Component {
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    onNavigatorEvent(event) {
        var myCoin = this.props.myCoin;
        if (event.type == 'NavBarButtonPress') {
            if (event.id == 'add') {
                this.props.navigator.push({
                    screen: 'AddEditOneOperation',
                    title: "New Operation",
                    passProps: { myCoin },
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
        let operation = this.props.myCoin.operations.find((op) => {
            return op.id == id;
        })
        if (operation) {
            this.props.navigator.push({
                screen: 'AddEditOneOperation',
                title: "New Operation",
                passProps: { myCoin: this.props.myCoin, operation },
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
                        this.props.deleteOperation(this.props.myCoin.id, operationId);
                    }
                },
            ],
        )
    }

    render() {
        console.log("Render mycoin :", this.props.myCoin.id, this.props.myCoin)
        return (
            <View style={styles.containerPush}>
                <View style={{ flexDirection: 'row', height: 40 }}>
                    <ViewFlexWidthCenterHeight height={40}>
                        {checkFontelloIconExist(this.props.myCoinValue.symbol.toLowerCase() + "-alt") ?
                            <FontelloIcon name={this.props.myCoinValue.symbol.toLowerCase() + "-alt"} size={20} style={{ marginTop: 5, marginBottom: 5 }} /> :
                            <FontelloIcon name="coin-2" size={20} style={{ marginTop: 5, marginBottom: 5 }} />
                        }
                        <Text>{this.props.myCoin.nbCoins}</Text>
                    </ViewFlexWidthCenterHeight>
                    <ViewFlexWidthCenterHeight height={40}>
                        <Text>{this.props.myCoin.totalMonneyInDollar} $</Text>
                    </ViewFlexWidthCenterHeight>
                    <ViewFlexWidthCenterHeight height={40}>
                        {this.props.myCoin.beneficial >= 0 ?
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <FontAwesomeIcon name="arrow-up" size={10} color="#090" />
                                <Text style={{ color: '#090' }}>{this.props.myCoin.beneficial} $</Text>
                            </View>
                            :
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <FontAwesomeIcon name="arrow-down" size={10} color="#900" />
                                <Text style={{ color: '#900' }}>{this.props.myCoin.beneficial} $</Text>
                            </View>
                        }
                    </ViewFlexWidthCenterHeight>
                    <ViewFlexWidthCenterHeight height={40}>
                        {this.props.myCoin.differencePercentage >= 0 ?
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <FontAwesomeIcon name="arrow-up" size={10} color="#090" />
                                <Text style={{ color: '#090' }}>{this.props.myCoin.differencePercentage} %</Text>
                            </View>
                            :
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <FontAwesomeIcon name="arrow-down" size={10} color="#900" />
                                <Text style={{ color: '#900' }}>{this.props.myCoin.differencePercentage} %</Text>
                            </View>
                        }
                    </ViewFlexWidthCenterHeight>
                </View>
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={this.props.myCoin.operations}
                        renderItem={({ item }) => <CardOneOperation
                            key={item.id}
                            editOperation={this.editOperation.bind(this)}
                            deleteOperation={this.deleteOperation.bind(this)}
                            id={item.id}
                            bought={item.bought}
                            quantity={item.quantity.toString()}
                            buyingPrice={item.buyingPrice.toString()}
                        />}>
                    </FlatList>
                </View>
            </View>
        )
    }
}

OneMyCoins.propTypes = {
    myCoinId: PropTypes.string.isRequired,
    myCoinValue: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    const getOneMyCoin = makeComputeOneMyCoin();

    return {
        myCoins: state.myCoins,
        myCoin: getOneMyCoin(state, ownProps)
    }
}

function mapDispachToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispachToProps)(OneMyCoins);