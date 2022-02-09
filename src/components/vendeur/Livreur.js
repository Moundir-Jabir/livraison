import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import { Rating } from 'react-native-elements'
import * as firebase from 'firebase'

export default class Livreur extends Component {

    componentDidMount() {
        const ref = firebase.default.firestore().collection('commande');
        ref.where('etat','==','livrée').where('livreur','==',this.props.data.id).onSnapshot(e => {
            this.setState({ nbr_commande: e.size });
            e.forEach(doc => {
                this.setState({ somme: doc.data().rating + this.state.somme });
            })
        })
    }

    state = {
        somme: 0,
        nbr_commande: 0
    }

    render() {
        const { id, nom, photo, tel, ville, transport, id_offre, solde } = this.props.data;
        const { somme, nbr_commande } = this.state;
        if(nbr_commande === 0)
            this.setState({ nbr_commande: 1 });
        let moyenne = somme / nbr_commande;
        let variable = <Image source={require("../../../assets/aucun.png")} />
        if(transport == "velo")
            variable = <Image source={require("../../../assets/velo.png")} />
        else if(transport == "moto")
            variable = <Image source={require("../../../assets/moto.png")} />
        else if(transport == "voiture")
            variable = <Image source={require("../../../assets/voiture.png")} />
        else if(transport == "van")
            variable = <Image source={require("../../../assets/van.png")} />
        else if(transport == "camion")
            variable = <Image source={require("../../../assets/camion.png")} />
        return (
            <View style={styles.container}>
                <View>
                    <Image style={{width: 80, height: 80, borderRadius: 100}} source={{uri: photo}} />
                    <Rating imageSize={18} readonly startingValue={moyenne} />
                </View>
                <View>
                    <Text style={styles.text}>{nom}</Text>
                    <Text><Image style={{width: 30, height: 30}} source={require("../../../assets/ville.png")} /> {ville}</Text>
                    <Text><Image style={{width: 30, height: 30}} source={require("../../../assets/phone.png")} /> {tel}</Text>
                </View>
                <View style={styles.flex}>
                    {variable}
                    {(this.props.ajouter) ? (
                        <Pressable onPress={this.props.proposer.bind(this, id)}>
                            <Image style={{tintColor: 'rgb(18, 141, 235)', width: 30, height: 30, margin: 15}} source={require("../../../assets/offre.png")} />
                        </Pressable>
                    ): null}
                    { (this.props.press) ? (
                    <Text onPress={this.props.infos.bind(this, id, id_offre, solde)}>
                        <Image style={{tintColor: 'grey', width: 20, height: 20}} source={require("../../../assets/fleche.png")} />
                    </Text>
                ):null }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "stretch",
        backgroundColor: 'white',
        margin: 10,
        padding: 10
    },
    text: {
        color: 'rgb(18, 141, 235)',
        fontSize: 20,
        padding: 10
    },
    flex: {
        justifyContent: "space-around"
    }
})