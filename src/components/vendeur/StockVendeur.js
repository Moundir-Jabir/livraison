import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ListeProduits from './ListeProduits'
import AjouterProduit from './AjouterProduit'
import ProduitVendeur from './ProduitVendeur'
import ChoisirLivreur from './ChoisirLivreur'
import TransfereDetail from './TransfereDetail'

const Stack = createStackNavigator();

export default class StockVendeur extends Component {
    render() {
        return (
            <Stack.Navigator initialRouteName="Liste Des Produits" >
                <Stack.Screen name="Liste Des Produits" component={ListeProduits} initialParams={{user: this.props.route.params.user}} options={{headerLeft: null}} />
                <Stack.Screen name="Nouveau Produit" component={AjouterProduit} initialParams={{user: this.props.route.params.user}} />
                <Stack.Screen name="Fiche Produit" component={ProduitVendeur} />
                <Stack.Screen name="Choix du Livreur" component={ChoisirLivreur} initialParams={{user: this.props.route.params.user}} />
                <Stack.Screen name="Quantité transférée" component={TransfereDetail} />
            </Stack.Navigator>
        )}
}
