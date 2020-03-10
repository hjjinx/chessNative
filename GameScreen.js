import React from 'react';
import {View} from 'react-native';

export default class GameScreen extends React.Component {
  componentDidMount() {
    const {roomID} = this.props.navigation.state.params;
  }

  render() {
    return <View></View>;
  }
}
