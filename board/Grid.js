import React, {Component} from 'react';
import Box from './Box.js';
import {View, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class Grid extends Component {
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
        if (value !== null) {
          unitImageClass += value.split('_')[0]; //Color can be "B" or "W".
          unitImageClass += value.split('_')[1]; // unit is Bishop or Pawn or Queen..
        }

        if (this.props.highlighted[i][j]) {
          // Checking if the box to be highlighted is friend or foe.
          const currTurn = this.props.currTurn;
          if (color === 'W' && currTurn === 'B')
            classes += Styles.push(highlightedKill);
          else if (color === 'B' && currTurn === 'W')
            classes += Styles.push(highlightedKill);
          else classes += Styles.push(highlighted);
          // If current turn matches the color of unit, it is friend.
        }

        boxArr[i].push(
          <Box
            classes={classes}
            unitImage={unitPng[unitImageClass]}
            // units={this.props.units}
            currTurn={this.props.currTurn}
            key={i + '' + j}
            // boxId={boxId}
            // image={}
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
