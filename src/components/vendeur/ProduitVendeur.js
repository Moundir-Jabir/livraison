import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import { PricingCard, Card, Button, Input } from 'react-native-elements';
import * as firebase from 'firebase'

export default class ProduitVendeur extends Component {

    componentDidMount() {
        const ref = firebase.default.firestore().collection('produit').doc(this.props.route.params.id);
        ref.onSnapshot(docSnapshot => this.setState({produit: docSnapshot.data()}));
    }

    state = {
        produit: {},
        prix: false,
        plus: false,
        moin: false,
        nvprix: 0,
        nvplus: 0,
        nvmoin: 0
    }

    modifierPrix = () => {
        const ref = firebase.default.firestore().collection('produit').doc(this.props.route.params.id);
        ref.update({prix: this.state.nvprix}).then(e => {
            alert("Prix modifié");
            this.setState({prix: false});
        })
    }

    ajouterStock = () => {
        const ref = firebase.default.firestore().collection('produit').doc(this.props.route.params.id);
        ref.update({ quantite: this.state.produit.quantite + this.state.nvplus }).then(e => {
            alert("Stock modifié !");
            this.setState({plus: false});
        })
    }

    libererStock = () => {
        if(this.state.nvmoin <= this.state.produit.quantite)
        {
            const ref = firebase.default.firestore().collection('produit').doc(this.props.route.params.id);
            ref.update({ quantite: this.state.produit.quantite - this.state.nvmoin }).then(e => {
                alert("Stock modifié !");
                this.setState({moin: false});
            })
        }
        else
            alert("Stock insufisant !!");
    }

    prix_toggle = () => { this.setState({prix: !this.state.prix}) }

    plus_toggle = () => { this.setState({plus: !this.state.plus}) }

    moin_toggle = () => { this.setState({moin: !this.state.moin}) }

    trans = (qt) => {
        this.props.navigation.navigate("Choix du Livreur", {id_produit: this.props.route.params.id, quantite_vendeur: qt})
    }

    render() {
        const { nomProduit, prix, quantite, uri } = this.state.produit;
        return (
            <ScrollView contentContainerStyle={styles.container} >
                <Image style={{width: 120, height: 120, borderRadius: 10, alignSelf: 'center', margin: 10}} source={{uri: uri}} />
                <PricingCard
                    color="#4f9deb"
                    title={nomProduit}
                    price={`${quantite} articles`}
                    info={[`Prix de vente : ${prix} dh`]}
                    button={{ title: 'Transferer'}}
                    onButtonPress={this.trans.bind(this, quantite)}
                />
                <Card>
                    <Card.Title>Modifier Produit</Card.Title>
                    <Card.Divider/>
                    <Text onPress={this.prix_toggle} style={styles.action}>Modifier le prix de vente</Text>
                    {(this.state.prix) ? (
                        <View>
                            <Input
                                placeholder="nouveau prix"
                                onChangeText={value => this.setState({nvprix: Number(value)})}
                            />
                            <Button type="outline" onPress={this.modifierPrix} title="Valider" />
                        </View>
                    ):null}
                    <Card.Divider/>
                    <Text onPress={this.plus_toggle} style={styles.action}>Ajouter Stock</Text>
                    {(this.state.plus) ? (
                        <View>
                            <Input
                                placeholder="quantité"
                                onChangeText={value => this.setState({nvplus: Number(value)})}
                            />
                            <Button type="outline" onPress={this.ajouterStock} title="Ajouter" />
                        </View>
                    ):null}
                    <Card.Divider/>
                    <Text onPress={this.moin_toggle} style={{color: 'red', fontSize: 20}}>Libérer Stock</Text>
                    {(this.state.moin) ? (
                        <View>
                            <Input
                                placeholder="quantité"
                                onChangeText={value => this.setState({nvmoin: Number(value)})}
                            />
                            <Button titleStyle={{color: 'red'}} type="outline" onPress={this.libererStock} title="Libérer" />
                        </View>
                    ):null}
                </Card>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    action: {
        fontSize: 20,
        color: "#4f9deb"
    },
    container: {
        alignItems: 'stretch',
        justifyContent: "flex-start"
    }
})