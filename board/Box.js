import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class Box extends React.Component {
  render() {
    let classes = [Styles.box];
    const boxId = this.props.boxId.split('');
    const i = parseInt(boxId[0]);
    const j = parseInt(boxId[1]);
    if ((i + j) % 2 === 0) {
      classes.push(Styles.white);
    } else classes.push(Styles.black);

    let unitClass = '';
    const value = this.props.units[i][j];
    if (value !== null) {
      unitClass += value.split('_')[0]; //Color can be "B" or "W".
      unitClass += value.split('_')[1]; // unit is Bishop or Pawn or Queen..
    }
    console.log('Unit classes are: ');
    console.log(unitClass);
    classes.push(unitClass);
    // const unit = require(`./gfx/${unitClass}.png`);
    return <View style={classes}>{/* <Image source={unit}></Image> */}</View>;
  }
}

const Styles = StyleSheet.create({
  box: {
    width: 30,
    height: 30,
  },
  white: {
    width: '12.5%',
    height: wp('12.5%'),
    backgroundColor: 'white',
  },
  black: {
    width: '12.5%',
    height: wp('12.5%'),
    backgroundColor: 'black',
  },
  // W_Knight: {
  //   backgroundImage: require('./gfx/WKnight.png'),
  //   // backgroundSize: 100% 100%;
  // },
});
