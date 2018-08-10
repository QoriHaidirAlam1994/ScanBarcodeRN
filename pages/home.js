import React, { Component } from 'react';
import { AppRegistry,View,Text,StyleSheet
,Button,TouchableOpacity,StatusBar,Image } from 'react-native';

export default class home extends Component{
static navigationOptions= ({navigation}) =>({
		  title: 'Welcome',	
	});  

	render(){
		const { navigate } = this.props.navigation;
		return(
	  <View style={styles.container}>	
	  {/* <Text style={styles.pageName}>Home</Text> */}
	  


		<TouchableOpacity
		onPress={() => navigate('Login')}
		style={styles.btn1}>
		<Text style={styles.btnText}>Login</Text>
		</TouchableOpacity>
		
		<TouchableOpacity		
		onPress={()=> navigate('Register')}
		style={styles.btn2}>
		<Text style={styles.btnText}>Register</Text>
		</TouchableOpacity>
		
		
      </View>
		);
	}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  btn1: {
    backgroundColor: "#3366ff",
    padding: 10,
    margin: 10,
    width: "95%"
  },
  btn2: {
	  backgroundColor: "#3366ff",
    padding: 10,
    margin: 10,
    width: "95%"
  },
  pageName: {
    margin: 10,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center"
  },
  btnText: {
    color: "#fff",
	fontWeight: "bold",
	textAlign: "center"
  }
});


AppRegistry.registerComponent('home', () => home);
