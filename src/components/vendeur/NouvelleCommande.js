import React, { Component } from 'react'
import { View } from 'react-native'
import { Card, Input, Button } from 'react-native-elements'
import * as firebase from 'firebase'

export default class NouvelleCommande extends Component {

    state = {
        nom: "",
        ville: "",
        adresse: "",
        tel: "",
        vendeur: this.props.route.params.user,
        etat: "non-traité",
        date: new Date(),
        code: Math.floor(Math.random() * 10000)
    }

    suivant = () => {
        const ref = firebase.default.firestore().collection('commande');
        ref.add(this.state).then(e => this.props.navigation.navigate("Détail Commande", {id_commande: e.id, code: this.state.code}))
    }

    render() {
        return (
            <View>
                <Card>
                    <Card.Title>Information sur le client</Card.Title>
                    <Card.Divider/>
                    <Input placeholder="Nom Client" onChangeText={value => this.setState({nom: value})} />
                    <Input placeholder="Ville" onChangeText={value => this.setState({ville: value})} />
                    <Input placeholder="Adresse de livraison" onChangeText={value => this.setState({adresse: value})} />
                    <Input placeholder="Télephone" onChangeText={value => this.setState({tel: value})} />
                </Card>
                <Button onPress={this.suivant} title="Suivant" buttonStyle={{alignSelf: 'center', width: 100, margin: 15}} />
            </View>
        )
    }
}
