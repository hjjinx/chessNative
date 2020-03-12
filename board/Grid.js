import React, {Component} from 'react';
import Box from './Box.js';
import {View, StyleSheet} from 'react-native';

export default class Grid extends Component {
  render() {
    console.log(this.props.units);
    let boxArr = [];
    for (let i = 0; i < 8; i++) {
      boxArr.push([]);
      for (let j = 0; j < 8; j++) {
        let boxId = i + '' + j;
        boxArr[i].push(
          <Box
            units={this.props.units}
            // currTurn={this.props.currTurn}
            key={boxId}
            boxId={boxId}
            // handleSelect={this.props.handleSelect}
            // highlighted={this.props.highlighted}
            // moveUnit={this.props.moveUnit}
            // ownColor={this.props.ownColor}
            // boxSelected={this.props.boxSelected}
            // socket={this.props.socket}
            // roomID={this.props.roomID}
          />,
        );
      }
    }
    return (
      <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
        {boxArr}
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF00FF',
  },
  gridW: {
    lineHeight: 0,
    margin: 'auto',
    backgroundColor: 'black',
    // boxShadow: '0 0 200 20 whitesmoke',
    marginTop: 0,
  },
});
