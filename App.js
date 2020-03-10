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

class MainScreen extends React.Component {
  state = {
    roomID: '',
    description: '',
    password: '',
  };

  createRoom = () => {};

  render() {
    return (
      <View
        style={{
          alignItems: 'center',
          backgroundColor: 'rgb(50,50,50)',
          paddingTop: 100,
          height: '100%',
        }}>
        <Text style={{color: 'white', fontSize: 50}}>C H E S S</Text>
        <View style={{marginTop: 80, backgroundColor: 'white', width: '80%'}}>
          <TextInput
            placeholder="Room ID.."
            textAlign={'center'}
            style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
            }}
            onChangeText={text => this.setState({roomID: text})}></TextInput>
          <Button
            title="Join Room"
            onPress={() =>
              this.props.navigation.navigate('Game', {
                roomID: this.state.roomID,
              })
            }></Button>
        </View>
        <View style={{marginTop: 50, backgroundColor: 'white', width: '80%'}}>
          <TextInput
            placeholder="Room Description.."
            textAlign={'center'}
            style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
            }}
            onChangeText={text =>
              this.setState({description: text})
            }></TextInput>
          <TextInput
            placeholder="Password.."
            textAlign={'center'}
            style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
            }}
            onChangeText={text => this.setState({password: text})}></TextInput>
          <Button title="Create Room" onPress={this.createRoom}></Button>
        </View>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  Main: {
    screen: MainScreen,
    navigationOptions: {
      title: 'Main',
      header: null,
    },
  },
  Game: {
    screen: GameScreen,
    navigationOptions: {
      title: 'Game',
      header: null,
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
