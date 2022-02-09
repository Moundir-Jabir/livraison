import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ListeOffres from './ListeOffres'
import DetailOffre from './DetailOffre'

const Stack = createStackNavigator();

export default class Offres extends Component {
    render() {
        return (
            <Stack.Navigator initialRouteName="Offre de Livraison">
                <Stack.Screen name="Offre de Livraison" component={ListeOffres} initialParams={{user: this.props.route.params.user}} options={{headerLeft: null}} />
                <Stack.Screen name="Détail de l'offre" component={DetailOffre} initialParams={{user: this.props.route.params.user}} />
            </Stack.Navigator>
        )
    }
}
