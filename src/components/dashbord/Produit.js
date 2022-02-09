import React, { Component } from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'
import { Badge } from 'react-native-elements'

export default class Produit extends Component {
    render() {
        const { nomProduit, quantite, uri, id } = this.props.data;
        let nbr_article = quantite + " article";
        return (
            <View style={styles.container}>
                <View>
                    <Image style={{width: 100, height: 100, borderRadius: 20}} source={{uri: uri}} />
                </View>
                <View>
                    <Text style={{fontSize: 17, padding: 8}}>{nomProduit}</Text>
                    <Badge value={nbr_article} status="primary" />
                </View>
                { (this.props.modifiable) ? (
                    <Text onPress={this.props.fiche.bind(this, id)}>
                        <Image style={{tintColor: 'grey', width: 20, height: 20}} source={require("../../../assets/fleche.png")} />
                    </Text>
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
        padding: 5,
        margin: 5,
        backgroundColor: "white",
        borderRadius: 50
    }
})