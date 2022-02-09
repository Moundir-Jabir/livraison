import React, { Component } from 'react'
import { View, StyleSheet, Text, ScrollView } from 'react-native'
import { Button, Input } from 'react-native-elements'
import * as firebase from 'firebase'
import Produit from '../dashbord/Produit'

export default class InfosLivreur extends Component {

    componentDidMount() {
        const ref = firebase.default.firestore().collection('produit-livreur');
        ref.where('livreur','==',this.props.route.params.id).onSnapshot(e => {
            this.setState({ produits: [] });
            e.forEach(doc => {
                const produit = firebase.default.firestore().collection('produit').doc(doc.data().produit);
                produit.onSnapshot(p => {
                    if(p.data().vendeur == this.props.route.params.user)
                    this.setState({ produits: [{ nomProduit: p.data().nomProduit, uri: p.data().uri, quantite: doc.data().quantite, id: doc.id }, ...this.state.produits] });
                })
            })
        })
    }

    state = {
        produits: [],
        montant: 0
    }

    debiter = () => {
        const ref = firebase.default.firestore().collection('offre').doc(this.props.route.params.id_offre);
        ref.update({ solde: this.props.route.params.solde - this.state.montant }).then(e => alert("Montant débité"));
    }

    render() {
        return (
            <View>
                <Text style={styles.titre}>Stock du Livreur :</Text>
                <ScrollView style={{height: "80%"}}>
                    {
                        this.state.produits.map((produit) => (
                            <Produit key={produit.id} data={produit} />
                        ))
                    }
                </ScrollView>
                <View style={{height: "15%", flexDirection: 'row', justifyContent: "space-around", alignItems: 'center'}}>
                    <View>
                        <Text style={styles.text}>Somme à rendre :</Text>
                        <Text style={styles.text}>{this.props.route.params.solde} dh</Text>
                    </View>
                    <Input placeholder="(dh)" containerStyle={{width: 100}} onChangeText={value => this.setState({ montant: Number(value) })} />
                    <Button title="Débiter" onPress={this.debiter} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    titre: {
        color: 'grey',
        fontSize: 25,
        textAlign: 'center',
        padding: 5
    },
    text: {
        textAlign: "center",
        color: 'rgb(18, 141, 235)',
        fontSize: 20
    }
})