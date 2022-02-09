import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import * as firebase from 'firebase'
import Produit from '../dashbord/Produit'

export default class StockLivreur extends Component {

    componentDidMount() {
        const ref = firebase.default.firestore().collection('produit-livreur');
        ref.where('livreur','==',this.props.route.params.user).onSnapshot(e => {
            this.setState({produits: []})
            e.forEach(doc => {
                const r = firebase.default.firestore().collection('produit').doc(doc.data().produit);
                r.onSnapshot(e => {
                    this.setState({produits: [{nomProduit: e.data().nomProduit, uri: e.data().uri, ...doc.data(), id: doc.id}, ...this.state.produits]});
                })
            })
        })
    }

    state = {
        produits: []
    }

    render() {
        return (
            <ScrollView>
                {
                    this.state.produits.map((produit) => (
                        <Produit key={produit.id} data={produit} modifiable={false} />
                    ))
                }
            </ScrollView>
        )
    }
}
