import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ListeMesLivreurs from './ListeMesLivreurs'
import ListeLivreurs from './ListeLivreurs'
import ProposerOffre from './ProposerOffre'
import InfosLivreur from './InfosLivreur'

const Stack = createStackNavigator();

export default class MesLivreurs extends Component {
    render() {
        return (
            <Stack.Navigator initialRouteName="Liste De Mes Livreurs" >
                <Stack.Screen name="Liste De Mes Livreurs" component={ListeMesLivreurs} initialParams={{user: this.props.route.params.user}} options={{headerLeft: null}} />
                <Stack.Screen name="Livreurs Disponible" component={ListeLivreurs} initialParams={{user: this.props.route.params.user}} />
                <Stack.Screen name="Proposer une offre" component={ProposerOffre} initialParams={{user: this.props.route.params.user}} />
                <Stack.Screen name="Infos Livreur" component={InfosLivreur} initialParams={{user: this.props.route.params.user}} />
            </Stack.Navigator>
        )
    }
}
