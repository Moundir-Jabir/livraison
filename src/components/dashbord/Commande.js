import React, { Component } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { Card, Button } from 'react-native-elements'

export default class Commande extends Component {
    render() {
        const { id, code, nom, ville, date, adresse, tel, livreur, vendeur, date_validation, rating } = this.props.data;
        let d = date.toDate();
        let jour = d.getDate();
        let mois = d.getMonth();
        let annee = d.getFullYear();
        return (
            <View>
                <View style={styles.container}>
                <Text style={styles.titre}>Client : {nom}</Text>
                <View style={{flexDirection: 'row', padding: 20, justifyContent: 'space-between', paddingLeft: 0}}>
                    <Text style={styles.flex}> <Image style={styles.img} source={require("../../../assets/ville.png")} /> {ville}</Text>
                    <Text style={styles.flex}> <Image style={styles.img} source={require("../../../assets/date.png")} />  {jour} / {mois} / {annee} </Text>
                </View>
                <Text>Adresse de livraison :</Text>
                <Text style={{padding: 10}}>{adresse}</Text>
                <Text>Télephone : {tel}</Text>
                <Card.Divider />
                <Button onPress={this.props.detail.bind(this, id, code, livreur, vendeur, date_validation, rating)} title="Détail Commande" style={{alignSelf: "flex-end"}} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 20,
        margin: 10
    },
    titre: {
        fontWeight: 'bold',
        fontSize: 22
    },
    flex: {
        color: 'grey',
        width: "40%"
    },
    img: {
        width: 20,
        height: 20,
        tintColor: 'grey'
    }
})