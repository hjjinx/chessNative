import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  TextInput,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import GameScreen from './GameScreen.js';
import Axios from 'axios';
import io from 'socket.io-client';

socket = io('http://18.219.83.6:5000');
console.log(socket);

class MainScreen extends React.Component {
  state = {
    join: {
      roomID: '',
      password: '',
    },
    create: {
      description: '',
      password: '',
    },
  };

  createRoom = async () => {
    let res;
    try {
      res = await Axios.post(`http://18.219.83.6:5000/newgame`, {
        description: this.state.create.description,
        password: this.state.create.password,
      });
      this.props.navigation.navigate('Game', {
        roomID: res.data.roomID,
        password: this.state.create.password,
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <View
        style={{
          alignItems: 'center',
          backgroundColor: 'rgb(50,50,50)',
          paddingTop: 60,
          height: '100%',
        }}>
        <Text style={{color: 'white', fontSize: 50}}>C H E S S</Text>
        <View style={{marginTop: 50, backgroundColor: 'white', width: '80%'}}>
          <TextInput
            placeholder="Room ID.."
            textAlign={'center'}
            style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
            }}
            onChangeText={text =>
              this.setState({join: {...this.state.join, roomID: text}})
            }></TextInput>
          <TextInput
            placeholder="Password.."
            textAlign={'center'}
            style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
            }}
            onChangeText={text =>
              this.setState({join: {...this.state.join, password: text}})
            }></TextInput>
          <Button
            title="Join Room"
            onPress={() =>
              this.props.navigation.navigate('Game', {
                roomID: this.state.join.roomID,
                password: this.state.join.password,
              })
            }></Button>
        </View>
        <View style={{marginTop: 30, backgroundColor: 'white', width: '80%'}}>
          <TextInput
            placeholder="Room Description.."
            textAlign={'center'}
            style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
            }}
            onChangeText={text =>
              this.setState({create: {...this.state.create, description: text}})
            }></TextInput>
          <TextInput
            placeholder="Password.."
            textAlign={'center'}
            style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
            }}
            onChangeText={text =>
              this.setState({create: {...this.state.create, password: text}})
            }></TextInput>
          <Button title="Create Room" onPress={this.createRoom}></Button>
        </View>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  Main: {
    screen: screenProps => (
      <MainScreen socket={socket} {...screenProps}></MainScreen>
    ),
    navigationOptions: {
      title: 'Main',
      header: null,
    },
  },
  Game: {
    screen: screenProps => (
      <GameScreen socket={socket} {...screenProps}></GameScreen>
    ),
    navigationOptions: {
      title: 'Game on',
    },
  },
});

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default createAppContainer(AppNavigator);
