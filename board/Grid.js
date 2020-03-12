import React, {Component} from 'react';
import Box from './Box.js';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class Grid extends Component {
  handleClick = (i, j) => {
    console.log('Handlingclick');
    const currTurn = this.props.currTurn;
    const {ownColor} = this.props;
    if (currTurn != this.props.ownColor) return;

    const unitAtPosition = this.props.units[i][j];
    const isHighlighted = this.props.highlighted;
    const boxSelected = this.props.boxSelected;
    // If the box recently selected is a position that a currently selected unit can move to, then move.
    if (isHighlighted[i][j] === true) {
      this.props.moveUnit(i, j);
      this.props.socket.emit('move', {
        prevX: boxSelected[1][0],
        prevY: boxSelected[1][1],
        x: i,
        y: j,
        roomID: this.props.roomID,
      });
    } else if (
      unitAtPosition !== null && // If a unit is present at the selected position
      unitAtPosition.split('_')[0] == ownColor // If the color of the unit selected is the same of the player
    )
      this.props.handleSelect(i, j);
  };

  render() {
    let unitPng = {};
    unitPng.WBishop = require('./gfx/WBishop.png');
    unitPng.BBishop = require('./gfx/BBishop.png');
    unitPng.WKnight = require('./gfx/WKnight.png');
    unitPng.BKnight = require('./gfx/BKnight.png');
    unitPng.WRook = require('./gfx/WRook.png');
    unitPng.BRook = require('./gfx/BRook.png');
    unitPng.WKing = require('./gfx/WKing.png');
    unitPng.BKing = require('./gfx/BKing.png');
    unitPng.WPawn = require('./gfx/WPawn.png');
    unitPng.BPawn = require('./gfx/BPawn.png');
    unitPng.WQueen = require('./gfx/WQueen.png');
    unitPng.BQueen = require('./gfx/BQueen.png');
    console.log(this.props.units);
    let boxArr = [];
    for (let i = 0; i < 8; i++) {
      boxArr.push([]);
      for (let j = 0; j < 8; j++) {
        /** Box.js code: */
        let classes = [Styles.box];
        if ((i + j) % 2 === 0) {
          classes.push(Styles.white);
        } else classes.push(Styles.black);

        let unitImageClass = '';
        const value = this.props.units[i][j];
        let color;
        if (value !== null) {
          color = value.split('_')[0];
          unitImageClass += color; //Color can be "B" or "W".
          unitImageClass += value.split('_')[1]; // unit is Bishop or Pawn or Queen..
        }

        if (this.props.highlighted[i][j]) {
          // Checking if the box to be highlighted is friend or foe.
          const currTurn = this.props.currTurn;
          if (color === 'W' && currTurn === 'B')
            classes.push(Styles.highlightedKill);
          else if (color === 'B' && currTurn === 'W')
            classes.push(Styles.highlightedKill);
          else classes.push(Styles.highlighted);
          // If current turn matches the color of unit, it is friend.
        }

        boxArr[i].push(
          <Box
            onPress={() => this.handleClick(i, j)}
            classes={classes}
            unitImage={unitPng[unitImageClass]}
            currTurn={this.props.currTurn}
            key={i + '' + j}
            handleSelect={this.props.handleSelect}
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
      <View style={{flex: 1}}>
        <ScrollView>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
              marginTop: 100,
            }}>
            {boxArr}
          </View>
        </ScrollView>
        <View
          style={{
            width: '100%',
            height: '4%',
            backgroundColor: 'black',
          }}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
            }}>
            Room ID: {this.props.roomID}
          </Text>
        </View>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  highlightedKill: {
    backgroundColor: '#e26d6d',
  },
  highlighted: {
    backgroundColor: '#a3baff',
  },
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
});
