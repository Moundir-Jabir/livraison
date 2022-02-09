import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ListeCommandeLivreur from './ListeCommandeLivreur'
import DetailCommandeLivreur from './DetailCommandeLivreur'

const Stack = createStackNavigator();

export default class CommandeLivreur extends Component {
    render() {
        return (
            <Stack.Navigator initialRouteName="Liste des commandes à livrer">
                <Stack.Screen name="Liste des commandes à livrer" component={ListeCommandeLivreur} initialParams={{user: this.props.route.params.user}} options={{headerLeft: null}} />
                <Stack.Screen name="Détail Commande" component={DetailCommandeLivreur} />
            </Stack.Navigator>
        )
    }
}
