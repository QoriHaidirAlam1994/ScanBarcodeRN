import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Button,
  Keyboard
} from "react-native";
import { StackNavigator } from "react-navigation";

export default class login extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Login",
    // headerRight: (
    //   <TouchableOpacity
    //     onPress={() => navigation.navigate("Home")}
    //     style={{ margin: 10, backgroundColor: "orange", padding: 10 }}
    //   >
    //     <Text style={{ color: "#ffffff" }}>Home</Text>
    //   </TouchableOpacity>
    // )
  });
  constructor(props) {
    super(props);
    this.state = {
      userEmail: "",
      userPassword: "",
      showPass: true
    };
    this.showPass = this.showPass.bind(this);
  }

  showPass() {
    this.state.press === false
      ? this.setState({ showPass: false, press: true })
      : this.setState({ showPass: true, press: false });
  }

  login = () => {

    const { userEmail, userPassword } = this.state;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (userEmail == "") {
      //alert("Please enter Email address");
      this.setState({ email_user: "Masukan Email Terlebih Dahulu" });
    } else if (reg.test(userEmail) === false) {
      //alert("Email is Not Correct");
      this.setState({ email_user: "Email Anda Salah" });
      return false;
    } else if (userPassword == "") {
      this.setState({ email_user: "Masukan Password Terlebih Dahulu" });
    } else {
      fetch("http://192.168.1.48/react_server/login.php", {
        method: "post",
        header: {
          Accept: "application/json",
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          email_user: userEmail,
          pass_user: userPassword
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson == "ok") {
            alert("Selamat Anda Berhasil Login");
            this.props.navigation.navigate("BarcodeScan");
          } else {
            alert("Maaf Anda Tidak Berhasil Login");
          }
        })
        .catch(error => {
          console.error(error);
        });
    }

    Keyboard.dismiss();
  };
 
  render() {
  
    return (
      <View style={styles.container}>
        <Text style={{ padding: 10, margin: 10, color: "red" }}>
          {this.state.email_user}
        </Text>

        <TextInput
          placeholder="Enter Email"
          style={{ width: 200, margin: 10 }}
          onChangeText={userEmail => this.setState({ userEmail })}
        />

        <TextInput
          secureTextEntry={this.state.showPass}
          placeholder="Enter Password"
          style={{ width: 200, margin: 10 }}
          onChangeText={userPassword => this.setState({ userPassword })}
          returnKeyType={"done"}
          autoCapitalize={"none"}
          autoCorrect={false}
        />

        <TouchableOpacity
          onPress={this.login}
          style={{
            width: 200,
            padding: 10,
            backgroundColor: "blue",
            alignItems: "center"
          }}
        >
          <Text style={{ color: "white" }}>Login</Text>
        </TouchableOpacity>
      </View>

      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});

AppRegistry.registerComponent("login", () => login);
