import React, { Component } from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'
import { Input, Button } from 'react-native-elements'
import * as firebase from 'firebase'

export default class Connexion extends Component {

    state = {
        email: "",
        password: ""
    }

    connexion = () => {
        const {email, password} = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(async(userCredential) => {
            alert("Connexion Réussie");
            let user = userCredential.user.uid;
            const ref = firebase.default.firestore().collection('vendeur').doc(user);
            const doc = await ref.get();
            if (!doc.exists) {
                this.props.navigation.navigate("Mon Compte Livreur", {id: user});
            } else {
                this.props.navigation.navigate("Mon Compte Vendeur", {id: user});
            }
        })
        .catch((error) => {
            alert("E-mail ou mot de passe incorecte !");
        });
    }

    oublie = () => {
        const ref = firebase.default.auth();
        ref.sendPasswordResetEmail(this.state.email).then(e => alert("Un email vous a été envoyé pour rénitialiser votre mot de passe")).catch(e => alert("Vérifier votre adresse mail !"))
    }

    render() {
        return (
            <View style={styles.container}>
                <Image style={{width: 400, height: 300}} source={require("../../../assets/connexion.jpg")} />
                <View>
                    <Input placeholder='e-mail' leftIcon={
                        <Image source={require('../../../assets/mail.png')} />
                        } onChangeText={value => this.setState({ email: value })}
                    />
                    <Input placeholder='mot de passe' secureTextEntry={true} leftIcon={
                        <Image source={require('../../../assets/lock.png')} />
                        } onChangeText={value => this.setState({ password: value })}
                    />
                </View>
                <View style={{alignSelf: "center"}}>
                    <Button buttonStyle={styles.btn} title="Se Connecter" type='solid' onPress={this.connexion} />
                    <Text style={{color: 'red', textAlign: 'center'}} onPress={this.oublie}>Mot de passe oublié ?</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'space-evenly',
        backgroundColor: 'white'
    },
    btn: {
        borderRadius: 20,
        margin: 10,
        padding: 10
    }
})