import React, { Component } from 'react'
import { View, StyleSheet, Image, Pressable, Text } from 'react-native'

export default class Type extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Pressable onPress={() => this.props.navigation.navigate("Inscription", {type: "vendeur"})}>
                    <Image style={styles.image} source={require("../../../assets/2.jpg")} />
                    <Text style={styles.text}>Vendeur</Text>
                </Pressable>
                <Pressable onPress={() => this.props.navigation.navigate("Inscription", {type: "livreur"})}>
                    <Image style={styles.image} source={require("../../../assets/1.jpg")} />
                    <Text style={styles.text}>Livreur</Text>
                </Pressable>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "space-evenly"
    },
    image: {
        width: 250,
        height: 250,
        borderRadius: 50
    },
    text: {
        color: "rgb(0, 123, 255)",
        textAlign: "center",
        padding: 10,
        fontSize: 20
    }
});