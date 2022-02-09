import React, { Component } from 'react'
import { View } from 'react-native'
import { Input, Button } from 'react-native-elements'
import * as firebase from 'firebase'

export default class TransfereDetail extends Component {

    state = {
        quantite: 0,
        produit: this.props.route.params.id_produit,
        livreur: this.props.route.params.id_livreur
    }

    valider = () => {
        if(this.state.quantite == 0)
            alert("Veuillez remplir le champ !");
        else
        {
            if(this.state.quantite > this.props.route.params.quantite_vendeur)
                alert("Vous n'avez pas assez de stock pour ce transfére !!");
            else
            {
                if(this.props.route.params.quantite_livreur === "aucun")
                {
                    const ref = firebase.default.firestore().collection('produit-livreur');
                    ref.add(this.state)
                }
                else
                {
                    const reference = firebase.default.firestore().collection('produit-livreur').doc(this.props.route.params.doc);
                    reference.update({quantite: this.props.route.params.quantite_livreur + this.state.quantite })
                }
                const r = firebase.default.firestore().collection('produit').doc(this.state.produit);
                r.update({quantite: this.props.route.params.quantite_vendeur - this.state.quantite }).then(e => {
                    alert("Produit Transférer avec succés !");
                    this.props.navigation.navigate("Liste Des Produits");
                })
            }
        }
    }

    render() {
        return (
            <View>
                <Input placeholder="nbr article souhaitant transféré" onChangeText={value => this.setState({quantite: Number(value)})} />
                <Button onPress={this.valider} title="Transférer" />
            </View>
        )
    }
}
