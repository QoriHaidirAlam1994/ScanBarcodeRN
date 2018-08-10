import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Vibration,
    View,
    TouchableOpacity,
    TextInput
} from 'react-native';
import BarcodeScanner from 'react-native-barcodescanner';

export default class barcodescan extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: "Scan Barcode"
    });

    constructor(props) {
        super(props);

        this.state = {
            barcode: "",
            cameraType: "back",
            text: "Scan Barcode",
            torchMode: "off",
            type: "",
        };
    }

    barcodeReceived(e) {

        if (e.data !== this.state.barcode || e.type !== this.state.type)
            Vibration.vibrate();

        this.setState({
            barcode: e.data,
            text: `${e.data} (${e.type})`,
            type: e.type
        });


    }

    barcodePush = () => {
        const { text } = this.state;
        const { type } = this.state;

        fetch("http://192.168.1.48/react_server/scan.php", {
            method: "post",
            header: {
                Accept: "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                date_scan: text,
                qty_scan: type
            })
        })
            .then(response => response.json())
            .then(responseJson => {
                alert(responseJson);
            })
            .catch(error => {
                console.error(error);
            });
    };

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <BarcodeScanner
                    onBarCodeRead={this.barcodeReceived.bind(this)}
                    style={{ flex: 1 }}
                    torchMode={this.state.torchMode}
                    cameraType={this.state.cameraType}
                />
                <View style={styles.statusBar}>
                    <Text style={styles.statusBarText}>{this.state.text}</Text>
                </View>


                <View style={styles.statusBar}>
                    <TextInput
                        placeholder="Enter Qty"
                        style={{ width: 200, margin: 5 }}
                        onChangeText={type => this.setState({ type })}
                    />
                    <TouchableOpacity
                        onPress={this.barcodePush}
                        style={{
                            padding: 10,
                            width: 250,
                            backgroundColor: "blue",
                            alignItems: "center"
                        }}
                    >
                        <Text style={{ color: "#fff" }}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    statusBar: {
        height: 130,
        alignItems: 'center',
        justifyContent: 'center',
    },
    statusBarText: {
        fontSize: 15,
    },
});

AppRegistry.registerComponent('barcodescan', () => barcodescan);
