import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import * as firebase from 'firebase'
import Produit from '../dashbord/Produit'

export default class ListeProduits extends Component {

    componentDidMount() {
        const ref = firebase.default.firestore().collection('produit');
        ref.where("vendeur",'==',this.props.route.params.user).onSnapshot(e => {
            this.setState({produits: []});
            e.forEach(doc => this.setState({
                produits: [{id: doc.id, ...doc.data()}, ...this.state.produits]
            }));
        });
    }

    state = {
        produits: []
    }

    fiche = (id) => {
        this.props.navigation.navigate("Fiche Produit", {id: id});
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                { this.state.produits.map((produit) => (
                    <Produit fiche={this.fiche} modifiable={true} key={produit.id} data={produit} />
                )) }
                </ScrollView>
                <View style={{flexDirection: "row", justifyContent: "space-between", margin: 12}}>
                    <Text></Text>
                    <Text onPress={() => this.props.navigation.navigate("Nouveau Produit")}>
                        <Image source={require("../../../assets/plus.png")} style={{tintColor: 'rgb(18, 141, 235)'}} />
                    </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    }
})