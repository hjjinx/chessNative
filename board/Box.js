import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class Box extends React.Component {
  render() {
    return (
      <View
        style={this.props.classes}
        onStartShouldSetResponder={this.props.onPress}>
        {
          <Image
            style={{flex: 1, width: undefined, height: undefined}}
            source={this.props.unitImage}></Image>
        }
      </View>
    );
  }
}
