import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import * as firebase from 'firebase'

export default class ChoixLivreur extends Component {

    componentDidMount() {
        const ref = firebase.default.firestore().collection('produit-livreur');
        ref.where('livreur','==',this.props.data.id).onSnapshot(e => {
            this.setState({produits: []});
            e.forEach(doc => {
                this.setState({ produits: [{id_produit: doc.data().produit, quantite: doc.data().quantite, id: doc.id}, ...this.state.produits] })
                })
            })
    }

    state = {
        produits: []
    }

    render() {
        const { data, choisir } = this.props;
        const { nom, photo, ville, transport, id } = data;
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
            <Pressable onPress={choisir.bind(this, this.state.produits, id)} style={styles.container}>
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
            </Pressable>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: 'white',
        margin: 10,
        padding: 10,
        borderRadius: 30
    },
    text: {
        color: 'rgb(18, 141, 235)',
        fontSize: 20,
        padding: 10
    },
    transport: {
        width: 30,
        height: 30
    }
})