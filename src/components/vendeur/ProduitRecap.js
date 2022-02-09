import React, { Component } from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'
import { Badge } from 'react-native-elements'
import * as firebase from 'firebase'

export default class ProduitRecap extends Component {

    modifier = (operation) => {
        const ref = firebase.default.firestore().collection('commande').doc(this.props.id).collection('detail').doc(this.props.data.id);
        if(operation == true)
            ref.update({ quantite: this.props.data.quantite + 1 })
        else
            if(this.props.data.quantite > 1)
                ref.update({ quantite: this.props.data.quantite - 1 })
    }

    supprimer = () => {
        const ref = firebase.default.firestore().collection('commande').doc(this.props.id).collection('detail').doc(this.props.data.id);
        ref.delete()
    }

    render() {
        const { data, modifiable } = this.props;
        const { nomProduit, quantite, uri } = data;
        let nbr_article = quantite + " article";
        return (
            <View style={styles.container}>
                <View>
                    <Image style={{width: 100, height: 100, borderRadius: 20}} source={{uri: uri}} />
                </View>
                <View style={{width: "33%"}}>
                    <Text style={{fontSize: 17, padding: 8, textAlign: "center"}}>{nomProduit}</Text>
                    <Badge value={nbr_article} status="primary" />
                    {
                        (modifiable) ? (
                            <View style={{flexDirection: 'row', justifyContent: "space-between"}}>
                                <Text onPress={this.modifier.bind(this, true)} style={styles.modif}>+</Text>
                                <Text onPress={this.modifier.bind(this, false)} style={styles.modif}>-</Text>
                            </View>
                        ):null
                    }
                </View>
                {(modifiable) ? (
                    <View>
                        <Text onPress={this.supprimer}> <Image source={require("../../../assets/delete.png")} style={{width: 30, height: 30}} /> </Text>
                    </View>
                ):null}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: "center",
        margin: 5,
        backgroundColor: "white",
        borderRadius: 40
    },
    modif: {
        fontSize: 30,
        fontWeight: "bold",
        color: 'rgb(0, 157, 255)'
    }
})