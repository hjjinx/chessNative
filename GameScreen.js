import React from 'react';
import {View, StyleSheet} from 'react-native';
import Axios from 'axios';
import Grid from './board/Grid.js';

export default class GameScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      roomID: '',
      units: Array(8)
        .fill()
        .map(() => Array(8).fill(null)),
      highlighted: Array(8)
        .fill()
        .map(() => Array(8).fill(false)),
      currTurn: 'W',
      ownColor: '',
      boxSelected: [], // Basically a Queue to keep track of previous 2 boxes clicked.
    };
  }

  async componentDidMount() {
    const {roomID, password} = this.props.navigation.state.params;
    this.setState({roomID});
    console.log(roomID, password);
    let confirmation;
    try {
      confirmation = await Axios.post('http://18.219.83.6:5000/joinroom', {
        password,
        roomID,
      });
      if (!confirmation.data.canJoin) this.props.navigation.navigate('Main');
      else {
        this.props.socket.emit('joiningRoom', {roomID});
        const {color} = confirmation.data;
        this.setState({ownColor: color});

        this.registerSocketListeners();
        this.newGame();
      }
    } catch (err) {
      console.log(`err: ${err}`);
    }
  }
  newGame = () => {
    this.props.socket.emit('getState', {roomID: this.state.roomID});
  };

  registerSocketListeners = () => {
    this.props.socket.on('state', data => {
      this.setState({units: data.units, currTurn: data.currTurn});
      // this.unHighlightAll();
    });
    this.props.socket.on('gameOver', data => {
      const {won} = data;
      if (won == this.state.ownColor) {
        alert('You win :)');
      } else {
        alert('You lose :(');
      }
      document.location.href = '/';
    });
    this.props.socket.on('exit', data => {
      if (data.message == 'Player disconnected') {
        alert('Apologies. The other player disconnected.');
        document.location.href = '/';
      }
    });
  };

  render() {
    return (
      <View style={{marginTop: 150}}>
        <Grid
          units={this.state.units}
          currTurn={this.state.currTurn}
          key="Grid"
          // handleSelect={this.handleSelect}
          // highlighted={this.state.highlighted}
          // moveUnit={this.moveUnit}
          // ownColor={this.state.ownColor}
          // boxSelected={this.state.boxSelected}
          // socket={this.props.socket}
          // roomID={this.state.roomID}
        ></Grid>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF00FF',
  },
});
