import React, { Component } from 'react'
import { View, ScrollView, Text, StyleSheet, Image, Modal, Pressable } from 'react-native'
import {  Button, Input } from 'react-native-elements'
import * as firebase from 'firebase'
import ProduitRecap from '../vendeur/ProduitRecap'
import { AirbnbRating } from 'react-native-elements';

export default class DetailCommandeLivreur extends Component {

    componentDidMount() {
        const ref = firebase.default.firestore().collection('commande').doc(this.props.route.params.id).collection('detail');
        ref.onSnapshot(e => {
            this.setState({
                produits: []
            });
            e.forEach(doc => {
                const produit = firebase.default.firestore().collection('produit').doc(doc.data().id_produit);
                produit.onSnapshot(p => this.setState({
                    produits: [{ nomProduit: p.data().nomProduit, uri: p.data().uri, prix: p.data().prix, quantite: doc.data().quantite, id: doc.id, prix_livraison: doc.data().prix_livraison }, ...this.state.produits]
                 }))
            })
        })
    }

    state = {
        produits: [],
        modalVisible: false,
        code: 0,
        date_validation: new Date(),
        rating: 3
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    valider = (total) => {
        if(this.state.code === this.props.route.params.code)
        {
            const ref = firebase.default.firestore().collection('commande').doc(this.props.route.params.id);
            ref.update({ etat: "livrée", date_validation: this.state.date_validation, rating: this.state.rating }).then(e => {
                const offre = firebase.default.firestore().collection('offre');
                offre.where('vendeur','==',this.props.route.params.vendeur).where('livreur','==',this.props.route.params.livreur).get().then(e => e.forEach(doc => {
                    offre.doc(doc.id).update({ solde: firebase.default.firestore.FieldValue.increment(total) }).then(e => {
                        alert("Commande Validée");
                        this.props.navigation.navigate("Liste des commandes à livrer");
                    })
                }))
            })
        }
        else
            alert("Code invalide");
    }

    ratingCompleted = (rating) => {
        this.setState({ rating: rating });
    }

    render() {
        const { produits, modalVisible } = this.state;
        let i,t=0,l=0;
        for(i=0;i<produits.length;i++)
        {
            t = t + (produits[i].quantite * produits[i].prix);
            l = l + (produits[i].quantite * produits[i].prix_livraison);
        }
        return (
            <View style={{flex: 1}}>
                <ScrollView style={{height: "70%"}}>
                    {
                        produits.map((produit) => (
                            <ProduitRecap key={produit.id} data={produit} modifiable={false} />
                        ))
                    }
                </ScrollView>
                <View style={{height: "30%"}}>
                    <Text style={styles.titre}>Total : {t+l} dh</Text>
                    <View style={styles.centeredView}>
                    <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        this.setModalVisible(!modalVisible);
                    }}
                    >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                        <Text style={styles.modalText}>Entrer le code de validation</Text>
                        <Input onChangeText={value => this.setState({ code: Number(value) })} containerStyle={{width: 200}} />
                        <AirbnbRating onFinishRating={this.ratingCompleted} reviews={["Votre Avis","Votre Avis","Votre Avis","Votre Avis","Votre Avis"]} />
                        <View style={{flexDirection: "row", alignItems:"space-around", width: "100%", margin: 10}}>
                            <Button title="Valider" onPress={this.valider.bind(this, t)} style={{margin: 7}} />
                            <Button onPress={() => this.setModalVisible(!modalVisible)} style={{margin: 7}} type="outline" title="Annuler" titleStyle={{color: 'red'}} />
                        </View>
                        </View>
                    </View>
                    </Modal>
                    <Pressable
                    onPress={() => this.setModalVisible(true)}
                    >
                    <Image style={styles.img} source={require("../../../assets/valider.png")} />
                    </Pressable>
                    </View>
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
    img: {
        alignSelf: "center",
        tintColor: "#2196F3"
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: 30
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
})