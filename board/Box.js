import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class Box extends React.Component {
  render() {
    return (
      <View style={this.props.classes}>
        {
          <Image
            style={{flex: 1, width: undefined, height: undefined}}
            source={this.props.unitImage}></Image>
        }
      </View>
    );
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
