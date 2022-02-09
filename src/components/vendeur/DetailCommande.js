import React, { Component } from 'react'
import { View, ScrollView, Text, Image } from 'react-native'
import { Button, Card } from 'react-native-elements'
import * as firebase from 'firebase'
import ProduitCommande from './ProduitCommande'

export default class DetailCommande extends Component {

    componentDidMount() {
        const ref = firebase.default.firestore().collection('produit');
        ref.where("vendeur",'==',this.props.route.params.user).onSnapshot(e => {
            this.setState({mesProduits: []});
            e.forEach(doc => this.setState({
                mesProduits: [{id: doc.id, ...doc.data()}, ...this.state.mesProduits]
            }));
        });
    }

    state = {
        mesProduits: [],
        detail: []
    }

    supprimer = (id) => {
        this.setState({
            detail: this.state.detail.filter(produit => produit.id != id)
        })
    }

    ajouter = async(produit) => {
        await this.supprimer(produit.id);
        this.setState({
            detail: [...this.state.detail, produit]
        });
    }

    enregistrer = () => {
        const ref = firebase.default.firestore().collection('commande').doc(this.props.route.params.id_commande).collection('detail');
        let i;
        for(i=0;i<this.state.detail.length;i++) {
            ref.add({id_produit: this.state.detail[i].id, quantite: this.state.detail[i].quantite, prix_livraison: this.state.detail[i].prix_livraison})
        }
        alert(`Commande Enregistrée, code de validation : ${this.props.route.params.code}`);
        this.props.navigation.navigate('Liste des Commandes');
    }

    render() {
        let i;
        let s = 0;
        let l = 0;
        for(i=0;i<this.state.detail.length;i++) {
            s = s + (this.state.detail[i].prix * this.state.detail[i].quantite);
            l = l + (this.state.detail[i].prix_livraison * this.state.detail[i].quantite)
        }
        let t = s + l;
        return (
            <View style={{flex: 1}}>
                <ScrollView style={{height: "57%", marginBottom: 20}}>
                    {
                        this.state.mesProduits.map((produit) => (
                            <ProduitCommande key={produit.id} data={produit} ajouter={this.ajouter} />
                        ))
                    }
                </ScrollView>
                <Text style={{color: 'rgb(0, 140, 255)', fontSize: 20, marginBottom: 10, textAlign: "center"}}>Récapitulatif :</Text>
                <ScrollView style={{height: "35%", backgroundColor: 'white', padding: 5, borderTopLeftRadius: 50, borderTopRightRadius: 50}}>
                    {
                        this.state.detail.map((produit) => (
                            <View key={produit.id} style={{flexDirection: 'row', justifyContent: 'space-between', margin: 12}}>
                                <Text>{produit.nomProduit}</Text>
                                <Text>{produit.quantite} article</Text>
                                <Text onPress={this.supprimer.bind(this, produit.id)}><Image style={{width: 30, height: 25, tintColor: 'grey'}} source={require('../../../assets/delete.png')} /></Text>
                            </View>
                        ))
                    }
                </ScrollView>
                <View style={{backgroundColor: 'rgb(0, 140, 255)', height: "8%", flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                    <Text style={{color: 'white', fontSize: 20}}>Total : {t} dh</Text>
                    <Button onPress={this.enregistrer} title="Enregistrer" titleStyle={{color: 'rgb(0, 140, 255)'}} buttonStyle={{backgroundColor: 'white'}} />
                </View>
            </View>
        )
    }
}
