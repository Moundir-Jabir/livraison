import React, { Component } from 'react'
import { View, ScrollView, Text, StyleSheet, Image } from 'react-native'
import { ButtonGroup } from 'react-native-elements'
import * as firebase from 'firebase'
import Commande from '../dashbord/Commande'

export default class ListeCommandeVendeur extends Component {

    componentDidMount() {
        const ref = firebase.default.firestore().collection('commande').where('vendeur','==',this.props.route.params.user);
        ref.where('etat','==','non-traité').onSnapshot(e => {
            this.setState({non_traite: []});
            e.forEach(doc => {
                this.setState({non_traite: [...this.state.non_traite, {id: doc.id, ...doc.data()}]});
            })
        })
        ref.where('etat','==','en-cours').onSnapshot(e => {
            this.setState({en_cours: []});
            e.forEach(doc => {
                this.setState({en_cours: [...this.state.en_cours, {id: doc.id, ...doc.data()}]});
            })
        })
        ref.where('etat','==','livrée').onSnapshot(e => {
            this.setState({livre: []});
            e.forEach(doc => {
                this.setState({livre: [...this.state.livre, {id: doc.id, ...doc.data()}]});
            })
        })
    }

    state = {
        selectedIndex: 0,
        non_traite: [],
        en_cours: [],
        livre: []
    }

    detail = (a, b, c, d, e, f) => {
        if(this.state.selectedIndex === 0)
            this.props.navigation.navigate("Récapitulatif",{id: a, code: b});
        else if(this.state.selectedIndex === 1)
            this.props.navigation.navigate("Infos Commande",{id: a, livreur: c});
        else
            this.props.navigation.navigate("Infos sur la livraison",{id: a, livreur: c, date_validation: e, rating: f});
    }

    updateIndex = (index) => { this.setState({selectedIndex: index}) }

    render() {
        const { selectedIndex, non_traite, en_cours, livre } = this.state;
        const buttons = ['Non Traité', 'En cours', 'Livrée'];
        let maliste = [];
        if(selectedIndex === 0)
            maliste = non_traite;
        else if(selectedIndex === 1)
            maliste = en_cours;
        else
            maliste = livre;
        return (
            <View style={styles.container}>
                <ButtonGroup
                    onPress={this.updateIndex.bind(this)}
                    selectedIndex={selectedIndex}
                    buttons={buttons}
                    containerStyle={{height: 30}}
                />
                <ScrollView>
                    {
                        maliste.map((commande) => (
                            <Commande data={commande} key={commande.id} detail={this.detail} />
                        ))
                    }
                </ScrollView>
                <View style={{flexDirection: "row", justifyContent: "space-between", margin: 12}}>
                    <Text></Text>
                    <Text onPress={() => this.props.navigation.navigate("Nouvelle Commande")}>
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