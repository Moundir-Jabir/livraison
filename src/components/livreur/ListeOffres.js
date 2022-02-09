import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import * as firebase from 'firebase'
import Offre from './Offre'

export default class ListeOffres extends Component {

    componentDidMount() {
        const ref = firebase.default.firestore().collection('offre');
        ref.where('livreur','==',this.props.route.params.user).where('statut','==',false).onSnapshot(e => {
            this.setState({liste: []});
            e.forEach(doc => {
                this.setState({
                liste: [{id: doc.id, ...doc.data()}, ...this.state.liste]
                })
            });
        })
    }

    detail = (vendeur, autre, id) => {
        this.props.navigation.navigate("Détail de l'offre", {id: id, vendeur: vendeur, autre: autre});
    }

    state = {
        liste: []
    }

    render() {
        return (
            <ScrollView>
                { this.state.liste.map((offre) => (
                        <Offre key={offre.id} data={offre} detail={this.detail} />
                    )) }
            </ScrollView>
        )
    }
}
