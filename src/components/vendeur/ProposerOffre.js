import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import { Card, Input, Button } from 'react-native-elements'
import * as firebase from 'firebase'

export default class ProposerOffre extends Component {

    offre = () => {
        const ref = firebase.default.firestore().collection('offre');
        ref.add(this.state).then(e => {
            alert("Proposition envoyée !");
            this.props.navigation.navigate("Liste De Mes Livreurs");
        })
    }

    state = {
        type: "",
        autre: "",
        vendeur: this.props.route.params.user,
        livreur: this.props.route.params.id,
        statut: false,
        titre: "aucun titre",
        zone: "non spécifiée"
    }

    render() {
        return (
            <ScrollView>
                <Card>
                    <Card.Title>Information sur l'offre</Card.Title>
                    <Card.Divider />
                    <Input onChangeText={value => this.setState({titre: value})} label="Titre" />
                    <Input onChangeText={value => this.setState({type: value})} label="Type de produits souhaitant livré" placeholder="ex: vétements, électronique..." />
                    <Input onChangeText={value => this.setState({zone: value})} label="Zone de livraison" />
                    <Input multiline = {true} onChangeText={value => this.setState({autre: value})} label="Autres informations" />
                </Card>
                <Button onPress={this.offre} title="Envoyer" containerStyle={{borderRadius: 20, margin: 20, width: 100, alignSelf: "center"}} />
            </ScrollView>
        )
    }
}
