import React, { Component } from 'react'
import { View, ScrollView, Text, StyleSheet, Image } from 'react-native'
import { Rating } from 'react-native-elements'
import * as firebase from 'firebase'
import ProduitRecap from './ProduitRecap'

export default class CommandeLivree extends Component {

    componentDidMount() {
        const ref = firebase.default.firestore().collection('commande').doc(this.props.route.params.id).collection('detail');
        ref.onSnapshot(e => {
            this.setState({
                produits: []
            });
            e.forEach(doc => {
                const produit = firebase.default.firestore().collection('produit').doc(doc.data().id_produit);
                produit.onSnapshot(p => this.setState({
                    produits: [{ nomProduit: p.data().nomProduit, uri: p.data().uri, prix: p.data().prix, quantite: doc.data().quantite, id: doc.id }, ...this.state.produits]
                 }))
            })
        })
        const livreur = firebase.default.firestore().collection('livreur').doc(this.props.route.params.livreur);
        livreur.onSnapshot(e => { this.setState({livreur: e.data()}) })
    }

    state = {
        produits: [],
        livreur: {}
    }

    render() {
        const { date_validation, rating } = this.props.route.params;
        let d = date_validation.toDate();
        let jour = d.getDate();
        let mois = d.getMonth();
        let annee = d.getFullYear();
        let heures = d.getHours();
        let minutes = d.getMinutes();
        const { produits, livreur } = this.state;
        const { photo, nom, ville, transport } = livreur;
        let variable = <Image style={styles.transport} source={require("../../../assets/aucun.png")} />
        if(transport == "velo")
            variable = <Image style={styles.transport} source={require("../../../assets/velo.png")} />
        else if(transport == "moto")
            variable = <Image style={styles.transport} source={require("../../../assets/moto.png")} />
        else if(transport == "voiture")
            variable = <Image style={styles.transport} source={require("../../../assets/voiture.png")} />
        else if(transport == "van")
            variable = <Image style={styles.transport} source={require("../../../assets/van.png")} />
        else if(transport == "camion")
            variable = <Image style={styles.transport} source={require("../../../assets/camion.png")} />
        return (
            <View style={{flex: 1}}>
                <ScrollView style={{height: "50%"}}>
                    {
                        produits.map((produit) => (
                            <ProduitRecap key={produit.id} data={produit} modifiable={false} />
                        ))
                    }
                </ScrollView>
                <View style={{height: "50%"}}>
                    <Text style={styles.titre}>Attribu??e ?? : </Text>
                    <View style={styles.container}>
                        <View>
                            <Image style={{width: 70, height: 70, borderRadius: 100}} source={{uri: photo}} />
                        </View>
                        <View>
                            <Text style={styles.text}>{nom}</Text>
                            <Text><Image style={{width: 30, height: 30}} source={require("../../../assets/ville.png")} /> {ville}</Text>
                        </View>
                        <View>
                            {variable}
                        </View>
                    </View>
                    <Text style={styles.titre}>Information de livraison</Text>
                    <View style={{flexDirection: "row", justifyContent: "space-evenly"}}>
                        <View>
                            <Text style={styles.deux}>Date de Validation</Text>
                            <Text style={{textAlign: "center"}}>{jour}/{mois}/{annee} ?? {heures}:{minutes}</Text>
                        </View>
                        <View>
                            <Text style={styles.deux}>Avis du Client</Text>
                            <Rating imageSize={25} readonly startingValue={rating} />
                        </View>
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
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: 'white',
        margin: 15,
        padding: 20,
        borderRadius: 0
    },
    text: {
        color: 'rgb(18, 141, 235)',
        fontSize: 20,
        padding: 10
    },
    deux:{
        fontStyle: 'italic',
        color: 'rgb(18, 141, 235)',
        fontSize: 17,
        textAlign: "center",
        margin: 10
    }
})