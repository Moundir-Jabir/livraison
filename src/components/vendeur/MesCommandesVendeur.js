import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ListeCommandeVendeur from './ListeCommandeVendeur'
import NouvelleCommande from './NouvelleCommande'
import DetailCommande from './DetailCommande'
import Recapitulatif from './Recapitulatif'
import EnCours from './EnCours'
import CommandeLivree from './CommandeLivree'

const Stack = createStackNavigator();

export default class MesCommandesVendeur extends Component {
    render() {
        return (
            <Stack.Navigator initialRouteName="Liste des Commandes" >
                <Stack.Screen name="Liste des Commandes" component={ListeCommandeVendeur} initialParams={{user: this.props.route.params.user}} options={{headerLeft: null}} />
                <Stack.Screen name="Nouvelle Commande" component={NouvelleCommande} initialParams={{user: this.props.route.params.user}} />
                <Stack.Screen name="Détail Commande" component={DetailCommande} initialParams={{user: this.props.route.params.user}} />
                <Stack.Screen name="Récapitulatif" component={Recapitulatif} initialParams={{user: this.props.route.params.user}} />
                <Stack.Screen name="Infos Commande" component={EnCours} />
                <Stack.Screen name="Infos sur la livraison" component={CommandeLivree} />
            </Stack.Navigator>
        )
    }
}
