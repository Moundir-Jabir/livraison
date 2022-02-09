import React, { Component } from 'react'
import {View, Pressable, StyleSheet, Text, Image} from 'react-native'
import { Input, Button } from 'react-native-elements'

export default class ProduitCommande extends Component {

    state = {
        toggle: false,
        input: 0,
        prix_livraison: 0
    }

    toggle = () => {this.setState({toggle: !this.state.toggle})}

    ajouter = (id, nomProduit, prix) => {
        if(this.state.input <= 0)
            alert("veuillez entrer une valeur positive");
        else {
            this.props.ajouter({id: id, nomProduit: nomProduit, quantite: this.state.input, prix: prix, prix_livraison: this.state.prix_livraison});
            this.toggle();
        }
    }

    render() {
        const { nomProduit, prix, uri, id } = this.props.data;
        return (
            <View>
                <Pressable onPress={this.toggle}>
                    <View style={styles.container}>
                        <View>
                            <Image style={{width: 70, height: 70, borderRadius: 20}} source={{uri: uri}} />
                        </View>
                        <View>
                            <Text style={{fontSize: 17, padding: 8}}>{nomProduit}</Text>
                            <Text style={{color: 'grey', textAlign: 'center'}}>{prix} dh</Text>
                        </View>
                    </View>
                </Pressable>
                { (this.state.toggle) ? (
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <Input onChangeText={(value) => this.setState({input: Number(value)})} containerStyle={{width: "35%"}} placeholder="nbr article" />
                        <Input onChangeText={(value) => this.setState({prix_livraison: Number(value)})} containerStyle={{width: "40%"}} placeholder="prix de livraison" />
                        <Button onPress={this.ajouter.bind(this, id, nomProduit, prix)} title="ajouter" />
                    </View>
                ):null }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: "center",
        margin: 5,
        backgroundColor: "white"
    }
})