import React, { Component } from 'react'
import { View, ScrollView } from 'react-native'
import * as firebase from 'firebase'
import Livreur from './Livreur'
import ModalSelector from 'react-native-modal-selector'

export default class ListeLivreurs extends Component {

    componentDidMount() {
        let tableau = this.props.route.params.ids;
        let montableau = [];
        let i = 0;
        for(i=0; i<tableau.length; i++)
            montableau.push(tableau[i].id);
        firebase.default.firestore().collection("livreur").where("dispo","==",true).onSnapshot(e => {
            this.setState({livreurs: []});
            e.forEach(doc => {
                    this.setState({
                    livreurs: [{id: doc.id, ...doc.data()}, ...this.state.livreurs]
                })
            });
            this.setState({
                livreurs: this.state.livreurs.filter(livreur => !montableau.includes(livreur.id))
            });
            this.setState({
                filtre: this.state.livreurs
            });
        })
    }

    proposer = (id) => {
        this.props.navigation.navigate("Proposer une offre", {id: id})
    }

    state = {
        livreurs: [],
        filtre: [],
        villes: [
            {key: 0, label: "choisir une Ville"},
            {key: 1, label: "Tanger"},
            {key: 2, label: "Tétouan"},
            {key: 3, label: "Larache"},
            {key: 4, label: "Al Hoceïma"},
            {key: 5, label: "Chefchaouen"},
            {key: 6, label: "Oujda"},
            {key: 7, label: "Nador"},
            {key: 8, label: "Berkane"},
            {key: 9, label: "Figuig"},
            {key: 10, label: "Fès"},
            {key: 11, label: "Meknès"},
            {key: 12, label: "Ifrane"},
            {key: 13, label: "Séfrou"},
            {key: 14, label: "Taza"},
            {key: 15, label: "Rabat"},
            {key: 16, label: "Salé"},
            {key: 17, label: "Skhirate"},
            {key: 18, label: "Témara"},
            {key: 19, label: "Kénitra"},
            {key: 20, label: "Khémisset"},
            {key: 21, label: "Sidi Slimane"},
            {key: 22, label: "Béni-Mellal"},
            {key: 23, label: "Azilal"},
            {key: 24, label: "Khénifra"},
            {key: 25, label: "Khouribga"},
            {key: 26, label: "Casablanca"},
            {key: 27, label: "Mohammédia"},
            {key: 28, label: "El Jadida"},
            {key: 29, label: "Benslimane"},
            {key: 30, label: "Berrechid"},
            {key: 31, label: "Settat"},
            {key: 32, label: "Marrakech"},
            {key: 33, label: "Al Haouz"},
            {key: 34, label: "El Kelaâ des Sraghna"},
            {key: 35, label: "Essaouira"},
            {key: 36, label: "Safi"},
            {key: 37, label: "Youssoufia"},
            {key: 38, label: "Errachidia"},
            {key: 39, label: "Ouarzazate"},
            {key: 40, label: "Zagora"},
            {key: 41, label: "Agadir"},
            {key: 42, label: "Aït Melloul"},
            {key: 43, label: "Taroudant"},
            {key: 44, label: "Tiznit"},
            {key: 45, label: "Guelmim"},
            {key: 46, label: "Laâyoune"},
            {key: 47, label: "Dakhla"}
        ]
    }

    render() {
        return (
            <View>
                <ModalSelector
                style={{backgroundColor: 'rgb(50, 141, 235)'}}
                    data={this.state.villes}
                    initValue="choisir une Ville"
                    onChange={(value) => {
                        if(value.label == "choisir une Ville")
                            this.setState({
                                filtre: this.state.livreurs
                            });
                        else
                            this.setState({
                                filtre: this.state.livreurs.filter((livreur) => livreur.ville == value.label)
                            });
                    }}
                />
                <ScrollView>
                    { this.state.filtre.map((livreur) => (
                        <Livreur key={livreur.id} data={livreur} ajouter={true} proposer={this.proposer} />
                    )) }
                </ScrollView>
            </View>
        )
    }
}
