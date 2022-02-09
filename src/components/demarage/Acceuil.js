import React, { Component } from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'
import { Button } from 'react-native-elements'

export default class Acceuil extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image style={{width: 320, height: 300}} source={require("../../../assets/8309.jpg")} />
                <Text style={{fontSize: 20, textAlign: "center", color: "rgb(0, 123, 255)"}}>Bienvenue dans notre communauté de livraison au Maroc</Text>
                <View>
                    <Button buttonStyle={styles.btn} icon={
                        <Image source={require("../../../assets/login.png")} />
                    }
                        title="Se Connecter" type="solid" onPress={() => this.props.navigation.navigate("Connexion")} />
                    <Text style={{textAlign: "center", color: "rgb(0, 123, 255)"}} onPress={() => this.props.navigation.navigate('Choisir un type de Compte')}>Pas de compte ? S'inscrire</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: 'white'
    },
    btn: {
        borderRadius: 50,
        padding: "4%"
    }
})