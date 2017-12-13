import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactNative from 'react-native';
import { bindActionCreators } from 'redux'
import { Platform } from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Left, Body, Right, Switch, Card, CardItem, CardSwiper, SwipeRow, Button, Icon as IconNativeBase} from 'native-base';
import PropTypes from 'prop-types';

import styles from '../styles/AppStyle'
import { ActionCreators } from '../actions'

import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../../assets/config.json';
import { cryptoCurencies } from '../reducers/cryptoCurrency';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
const Icon = createIconSetFromFontello(fontelloConfig);

const {
  View,
  ScrollView,
  RefreshControl,
  TouchableHighlight,
  StyleSheet
} = ReactNative;

class Home extends Component {
  static propTypes = {
    cryptoCurencies: {
      loading: PropTypes.bool.require,
      list: PropTypes.array.required,
      listFav: PropTypes.array.required
    }
  }
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchCryptoCurencies();
    console.log("componentWillMount");
  }

  componentWillReceiveProps() {
    console.log("componentWillReceiveProps");
  }

  _onRefresh() {
    this.props.fetchCryptoCurencies();
  }

  _checkIfIcon(name) {
    return !fontelloConfig.glyphs.every(glyph => {
      return !(glyph.css == name);
    });
  }

  _isFav(id) {
    return this.props.cryptoCurencies.listFav.includes(id);
  }

  _pressFav(id) {
      this._isFav(id) ? this.props.removeFavCryptoCurrency(id) : this.props.addFavCryptoCurrency(id);
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView refreshControl={
          <RefreshControl
            refreshing={this.props.cryptoCurencies.loading}
            onRefresh={this._onRefresh.bind(this)}
          />
        }>
          {!this.props.cryptoCurencies.loading && this.props.cryptoCurencies.list.map((cryptoCurrency) => {
            // return <TouchableHighlight key={cryptoCurrency.id} style={styles.listElement}>
            return <SwipeRow key={cryptoCurrency.id} style={styles.listElement}
              rightOpenValue={-75}
              right={
                <TouchableHighlight onPress={ () => this._pressFav(cryptoCurrency.id) }>
                  {this._isFav(cryptoCurrency.id) ? <FontAwesomeIcon name="star" color="#FFD700" style={{marginTop: 45}} size={30} /> : <FontAwesomeIcon name="star-o" color="#FFD700" style={{marginTop: 45}} size={30} />}
                </TouchableHighlight >
                
              }
              body={
                <Container>
                  <Content>
                    <Card>
                      <CardItem>
                        <Left>
                          {this._checkIfIcon(cryptoCurrency.symbol.toLowerCase() + "-alt") ?
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
          })}
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  cryptoCurencies: state.cryptoCurencies
})

function mapDispachToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispachToProps)(Home);