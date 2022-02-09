import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import * as firebase from 'firebase'

export default class LivreurSimple extends Component {

    componentDidMount() {
        const ref = firebase.default.firestore().collection('produit-livreur');
        ref.where('produit','==',this.props.id_produit).where('livreur','==',this.props.data.id).onSnapshot(e => {
            if(e.size === 0)
                this.setState({quantite: "aucun"});
            else
                e.forEach(doc => this.setState({quantite: doc.data().quantite, doc: doc.id}))
        })
    }

    state = {
        quantite: 0,
        doc: ""
    }

    render() {
        const { id, nom, photo } = this.props.data;
        const { quantite, doc } = this.state;
        return (
            <View style={styles.container}>
                <View>
                    <Image style={{width: 80, height: 80, borderRadius: 100}} source={{uri: photo}} />
                </View>
                <View>
                    <Text style={styles.text}>{nom}</Text>
                    <Text style={{textAlign: "center"}}>{quantite} article</Text>
                </View>
                <View>
                    <Pressable onPress={this.props.transferer.bind(this, id, quantite, doc)}>
                    <Image style={{tintColor: 'grey', width: 20, height: 20}} source={require("../../../assets/fleche.png")} />
                    </Pressable>
                </View>
            </View>
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
        padding: 10
    },
    text: {
        color: 'rgb(18, 141, 235)',
        fontSize: 20,
        padding: 10
    }
})