import React, { Component } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { Card } from 'react-native-elements'

export default class Offre extends Component {
    render() {
        const { titre, zone, prix, type, vendeur, autre, id } = this.props.data;
        return (
            <View style={styles.container}>
                <Text style={styles.titre}>{titre}</Text>
                <View style={{flexDirection: 'row', padding: 20, justifyContent: 'space-between', paddingLeft: 0}}>
                    <Text style={styles.flex}> <Image style={styles.img} source={require("../../../assets/ville.png")} /> {zone}</Text>
                </View>
                <Text style={{padding: 9}}>Type de produit livrable : {type}</Text>
                <Card.Divider />
                <Text onPress={this.props.detail.bind(this, vendeur, autre, id)} style={styles.detail}>Plus de Détails...</Text>
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
        color: 'grey'
    },
    img: {
        width: 20,
        height: 20,
        tintColor: 'grey'
    },
    detail: {
        textAlign: "right",
        fontStyle: 'italic',
        color: 'rgb(0, 140, 255)'
    }
})