import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import * as firebase from 'firebase'
import LivreurSimple from './LivreurSimple'

export default class ChoisirLivreur extends Component {

    componentDidMount() {
        const ref = firebase.default.firestore().collection('offre');
        ref.where('vendeur','==',this.props.route.params.user).where('statut','==',true).onSnapshot(e => {
            this.setState({mesLivreurs: []});
            e.forEach(doc => {
                const livr = firebase.default.firestore().collection('livreur').doc(doc.data().livreur);
                livr.onSnapshot(e => {
                    this.setState({
                        mesLivreurs: [{id: e.id, ...e.data()}, ...this.state.mesLivreurs]
                    })
                })
            })
        })
    }

    state = {
        mesLivreurs: []
    }

    transferer = (id_livreur, quantite_livreur, doc) => {
        this.props.navigation.navigate("Quantité transférée", {id_livreur: id_livreur, id_produit: this.props.route.params.id_produit, quantite_vendeur: this.props.route.params.quantite_vendeur, quantite_livreur: quantite_livreur, doc: doc});
    }

    render() {
        return (
            <ScrollView>
                {
                    this.state.mesLivreurs.map((livreur) => (
                        <LivreurSimple key={livreur.id} data={livreur} transferer={this.transferer} id_produit={this.props.route.params.id_produit} />
                    ))
                }
            </ScrollView>
        )
    }
}
