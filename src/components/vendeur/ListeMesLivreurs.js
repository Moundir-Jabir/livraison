import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import * as firebase from 'firebase'
import Livreur from './Livreur'

export default class ListeMesLivreurs extends Component {

    componentDidMount() {
        const ref = firebase.default.firestore().collection('offre');
        ref.where('vendeur','==',this.props.route.params.user).where('statut','==',true).onSnapshot(e => {
            this.setState({mesLivreurs: []});
            e.forEach(doc => {
                const livr = firebase.default.firestore().collection('livreur').doc(doc.data().livreur);
                livr.onSnapshot(e => {
                    this.setState({
                        mesLivreurs: [{id: e.id, ...e.data(), id_offre: doc.id, solde: doc.data().solde}, ...this.state.mesLivreurs]
                    })
                })
            })
        })
    }

    infos = (id, id_offre, solde) => {
        this.props.navigation.navigate("Infos Livreur", {id: id, id_offre: id_offre, solde: solde});
    }

    state = {
        mesLivreurs: []
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    { this.state.mesLivreurs.map((livreur) => (
                        <Livreur key={livreur.id} data={livreur} press={true} infos={this.infos} />
                    )) }
                </ScrollView>
                <View style={{flexDirection: "row", justifyContent: "space-between", margin: 12}}>
                    <Text></Text>
                    <Text onPress={() => this.props.navigation.navigate("Livreurs Disponible", {ids: this.state.mesLivreurs})}>
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