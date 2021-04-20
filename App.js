import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import WelcomeScreen from './screens/WelcomeScreen';
import {AppTabNavigator} from './components/AppTabNavigator';
import {AppDrawerNavigator} from './components/AppDrawerNavigator';

export default class App extends React.Component {
  render(){
  return (
    <AppContainer/>
  );
  }
}

const SwitchNavigator = createSwitchNavigator({
  WelcomeScreen:{screen:WelcomeScreen},
  Drawer:{screen:AppDrawerNavigator}
})

const AppContainer = createAppContainer(SwitchNavigator)