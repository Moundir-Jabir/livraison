import React, { Component } from 'react'
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native'
import * as firebase from 'firebase'
import { Button } from 'react-native-elements'

export default class DetailOffre extends Component {

    componentDidMount() {
        const ref = firebase.default.firestore().collection('vendeur').doc(this.props.route.params.vendeur);
        ref.onSnapshot(e => {
            this.setState({vendeur: e.data()});
        })
    }

    state = {
        vendeur: {}
    }

    accepter = () => {
        const offre = firebase.default.firestore().collection('offre').doc(this.props.route.params.id);
        offre.update({
            statut: true,
            solde: 0
        }).then(e => {
            alert("Offre accepter ! Désormais vous pouvez échanger de stock avec le livreur et recevoir des commandes");
            this.props.navigation.navigate("Offre de Livraison");
        })
    }

    refuser = () => {
        const ref = firebase.default.firestore().collection('offre').doc(this.props.route.params.id);
        ref.delete().then(e => {
            alert("Offre refusée !");
            this.props.navigation.navigate("Offre de Livraison");
        })
        
    }

    render() {
        const { nom, ville, email, photo, tel } = this.state.vendeur;
        return (
            <ScrollView>
                <Text style={styles.titre}>Coordonnées du Vendeur :</Text>
                <View style={styles.radius}>
                    <Image style={{width: 140, height: 140, borderRadius: 100, alignSelf: 'center', margin: 12}} source={{uri: photo}} />
                    <Text style={styles.text}>{nom}</Text>
                    <Text style={styles.text}>{email}</Text>
                    <View style={{flexDirection: 'row', justifyContent: "space-evenly", alignItems:"center"}}>
                        <View style={{flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start"}}>
                            <Image source={require("../../../assets/ville.png")} />
                            <Text style={{marginTop: "20%"}}>{ville}</Text>
                        </View>
                        <View style={{flexDirection: "row", justifyContent: "flex-start"}}>
                            <Image source={require("../../../assets/phone.png")} />
                            <Text style={{marginTop: "20%"}}>{tel}</Text>
                        </View>
                    </View>
                </View>
                <Text style={styles.titre}>Détails de l'offre :</Text>
                <View style={styles.radius}>
                <Text>{this.props.route.params.autre}</Text>
                </View>
                <View style={{flexDirection: "row", justifyContent: "space-around", margin: 15}}>
                <Button onPress={this.refuser} containerStyle={{width: "30%"}} buttonStyle={{backgroundColor: 'grey'}} title="Refuser" />
                <Button onPress={this.accepter} containerStyle={{width: "30%"}} title="Accepter" />
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    text: {
        textAlign: "center",
        marginBottom: "4%",
        fontSize: 20,
        color: 'rgb(0, 140, 255)'
    },
    titre: {
        color: 'grey',
        fontSize: 25,
        textAlign: 'center',
        padding: 15
    },
    radius: {
        backgroundColor: 'white', margin: 5, padding: 10, borderRadius: 50
    }
})