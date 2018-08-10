import React, { Component } from 'react';
import { AppRegistry,View,Text,StyleSheet,ScrollView,TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';

import HomeScreen from './home';
import Login from './login';
import Register from './register';
import Ticket from './ticket';
import CameraList from "./camera";

const RNFormTicket = StackNavigator({
  Home: { screen: HomeScreen },
  Login: { screen: Login },
  Register: { screen: Register },
  Ticket: { screen: Ticket },
  CameraList: { screen: CameraList }
});
export default RNFormTicket;