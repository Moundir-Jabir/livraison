import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Acceuil from "./demarage/Acceuil"
import Connexion from "./demarage/Connexion"
import Inscription from "./demarage/Inscription"
import Type from './demarage/Type'
const Stack = createStackNavigator();

export default class Demarage extends Component {
    render() {
        return (
            <Stack.Navigator initialRouteName="Acceuil">
                <Stack.Screen name="Acceuil" component={Acceuil} />
                <Stack.Screen name="Connexion" component={Connexion} />
                <Stack.Screen name="Inscription" component={Inscription} />
                <Stack.Screen name="Choisir un type de Compte" component={Type} />
            </Stack.Navigator>
        )
    }
}
