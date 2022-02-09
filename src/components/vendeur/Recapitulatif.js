import React, { Component } from 'react'
import { View, ScrollView, Text, Modal, StyleSheet, Pressable } from 'react-native'
import { Button } from 'react-native-elements'
import * as firebase from 'firebase'
import ProduitRecap from './ProduitRecap'
import ChoixLivreur from './ChoixLivreur'

export default class Recapitulatif extends Component {

    componentDidMount() {
        const ref = firebase.default.firestore().collection('commande').doc(this.props.route.params.id).collection('detail');
        ref.onSnapshot(e => {
            this.setState({
                produits: [],
                stock_commande: []
            });
            e.forEach(doc => {
                const produit = firebase.default.firestore().collection('produit').doc(doc.data().id_produit);
                produit.onSnapshot(p => this.setState({
                    produits: [{ nomProduit: p.data().nomProduit, uri: p.data().uri, prix: p.data().prix, quantite: doc.data().quantite, id: doc.id }, ...this.state.produits],
                    stock_commande: [doc.data(), ...this.state.stock_commande]
                 }))
            })
        })

        const r = firebase.default.firestore().collection('offre');
        r.where('vendeur','==',this.props.route.params.user).where('statut','==',true).onSnapshot(e => {
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
        produits: [],
        modalVisible: false,
        mesLivreurs: [],
        stock_commande: []
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    annuler = () => {
        const ref = firebase.default.firestore().collection('commande').doc(this.props.route.params.id);
        ref.delete().then(e => {
            alert("Commande Annulée !");
            this.props.navigation.navigate("Liste des Commandes");
        })
    }

    verifier = (stock_livreur) => {
        let commande = this.state.stock_commande;
        let i;
        for(i=0;i<commande.length;i++)
        {
            let filtre = stock_livreur.filter(doc => doc.id_produit === commande[i].id_produit);
            if(filtre.length === 0)
                return false;
            else
            {
                if(commande[i].quantite <= filtre[0].quantite)
                    commande[i].id = filtre[0].id;
                else
                    return false;
            }
        }
        return commande;
    }

    choisir = (stock_livreur, id_livreur) => {
        let verification = this.verifier(stock_livreur);
        if(verification === false)
            alert("Ce livreur n'a pas assez de stock pour livrer cette commande !");
        else
        {
            let i;
            for(i=0;i<verification.length;i++)
            {
                const ref = firebase.default.firestore().collection('produit-livreur').doc(verification[i].id);
                ref.update({ quantite: firebase.default.firestore.FieldValue.increment(-verification[i].quantite) })
            }
            const r = firebase.default.firestore().collection('commande').doc(this.props.route.params.id);
            r.update({
                etat: "en-cours",
                livreur: id_livreur
            }).then(e => {
                alert("Commande attribuée");
                this.props.navigation.navigate("Liste des Commandes");
            })
        }
    }

    render() {
        const { id, code } = this.props.route.params;
        const { modalVisible, produits, mesLivreurs } = this.state;
        return (
            <View style={{flex: 1}}>
                <ScrollView style={{height: "70%"}}>
                    {
                        produits.map((produit) => (
                            <ProduitRecap key={produit.id} data={produit} id={id} modifiable={true} />
                        ))
                    }
                </ScrollView>
                <View style={{height: "15%", flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
                    <Button onPress={this.annuler} buttonStyle={{backgroundColor: 'grey'}} title="Annuler" />
                    <View>
                        <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            this.setModalVisible(!modalVisible);
                        }}
                        >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                            <ScrollView>
                                {
                                    mesLivreurs.map((livreur) => (
                                        <ChoixLivreur key={livreur.id} data={livreur} choisir={this.choisir} />
                                    ))
                                }
                            </ScrollView>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => this.setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.textStyle}>Annuler</Text>
                            </Pressable>
                            </View>
                        </View>
                        </Modal>
                        <Pressable
                        style={[styles.button, styles.buttonOpen]}
                        onPress={() => this.setModalVisible(true)}
                        >
                        <Text style={styles.textStyle}>Attribuer à un livreur</Text>
                        </Pressable>
                    </View>
                </View>
                <Text style={{textAlign: "center", fontSize: 20}}>Code de Validation : {code} </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      },
    modalView: {
        height: '40%',
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      borderRadius: 30,
      padding: 20,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 10
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 5,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#2196F3",
    },
    buttonClose: {
      backgroundColor: "red",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 18
    }
  });