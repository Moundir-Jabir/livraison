import React, { Component } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { Card, Button, Input } from 'react-native-elements'
import * as firebase from 'firebase'
import * as ImagePicker from 'react-native-image-picker'

export default class AjouterProduit extends Component {

    state = {
        nomProduit: "",
        quantite: "",
        prix: "",
        uri: "https://firebasestorage.googleapis.com/v0/b/livraison-49ed8.appspot.com/o/article.png?alt=media&token=37802676-e0b5-43e4-8530-1fc0aa985520",
        vendeur: this.props.route.params.user
    }

    upload = () => {
        const options = {noData: true};
        ImagePicker.launchImageLibrary(options, async(response) => {
            if(response.uri) {
                const storageRef = firebase.default.storage().ref().child(`${this.props.route.params.user}/produits/${response.fileName}`);
                const image = await fetch(response.uri);
                const blob = await image.blob();
                storageRef.put(blob).then(async (e) => {
                    const url = await storageRef.getDownloadURL();
                    this.setState({uri: url})
                })
            }
        });
    }

    ajouter = () => {
        if((this.state.nomProduit == "") || (this.state.quantite == "") || (this.state.prix == ""))
            alert("Veuillez remplir tout les champs");
        else {
            firebase.default.firestore().collection('produit').add(this.state)
            .then(e => {
                alert("Produit Ajouté");
                this.props.navigation.navigate("Liste Des Produits");
            })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Image style={{width: 120, height: 120}} source={{uri: this.state.uri}} />
                <Card containerStyle={{width: "90%"}}>
                    <Card.Title>Informations sur le nouveau Produit</Card.Title>
                    <Card.Divider/>
                    <Input placeholder='Nom du Produit' onChangeText={value => this.setState({ nomProduit: value })} />
                    <Input placeholder='Quantité' onChangeText={value => this.setState({ quantite: Number(value) })} />
                    <Input placeholder='Prix unitaire (dh)' onChangeText={value => this.setState({ prix: Number(value) })} />
                    <Text style={{color: 'rgb(18, 141, 235)'}} onPress={this.upload}>Ajouter une photo du produit</Text>
                </Card>
                <Button buttonStyle={styles.btn} title="Ajouter" type='solid' onPress={this.ajouter}  />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: "flex-start"
    },
    btn: {
        borderRadius: 200,
        padding: "6%",
        margin: "10%"
    }
});