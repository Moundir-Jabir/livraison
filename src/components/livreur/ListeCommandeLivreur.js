import React, { Component } from 'react'
import { View, ScrollView } from 'react-native'
import * as firebase from 'firebase'
import Commande from '../dashbord/Commande'

export default class ListeCommandeLivreur extends Component {

    componentDidMount(){
        const ref = firebase.default.firestore().collection('commande');
        ref.where('etat','==','en-cours').where('livreur','==',this.props.route.params.user).onSnapshot(e => {
            this.setState({commandes: []});
            e.forEach(doc => {
                this.setState({
                    commandes: [{id: doc.id, ...doc.data()}, ...this.state.commandes]
                })
            })
        })
    }

    state = {
        commandes: []
    }

    detail = (id, code, livreur, vendeur, date_livraison, rating) => {
        this.props.navigation.navigate("Détail Commande", {id: id, code: code, livreur: livreur, vendeur: vendeur});
    }

    render() {
        const { commandes } = this.state;
        return (
            <View style={{flex: 1}}>
                <ScrollView style={{height: "80%"}}>
                    {
                        commandes.map((commande) => (
                            <Commande key={commande.id} data={commande} detail={this.detail} />
                        ))
                    }
                </ScrollView>
            </View>
        )
    }
}
