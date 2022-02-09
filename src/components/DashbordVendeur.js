import React, { Component } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Profil from './dashbord/Profil'
import StockVendeur from './vendeur/StockVendeur'
import {Image} from 'react-native'
import MesLivreurs from './vendeur/MesLivreurs'
import MesCommandesVendeur from './vendeur/MesCommandesVendeur'

const Tabs = createBottomTabNavigator();

export default class DashbordVendeur extends Component {
    render() {
        return (
            <Tabs.Navigator initialRouteName="Mon Stock" >
                <Tabs.Screen name="Mon Profil" component={Profil} initialParams={{user: this.props.route.params.id, type: "vendeur", dispo: false}} options={{tabBarIcon: ()=>{return(<Image style={{tintColor: 'rgb(116,116,116)', width: 30, height: 30}} source={require('../../assets/profil.png')} />)}}} />
                <Tabs.Screen name="Mon Stock" component={StockVendeur} initialParams={{user: this.props.route.params.id}} options={{tabBarIcon: ()=>{return(<Image style={{tintColor: 'rgb(116,116,116)', width: 30, height: 30}} source={require('../../assets/stock.png')} />)}}} />
                <Tabs.Screen name="Mes Livreurs" component={MesLivreurs} initialParams={{user: this.props.route.params.id}} options={{tabBarIcon: ()=>{return(<Image style={{tintColor: 'rgb(116,116,116)', width: 30, height: 30}} source={require('../../assets/livreur.png')} />)}}} />
                <Tabs.Screen name="Mes Commandes" component={MesCommandesVendeur} initialParams={{user: this.props.route.params.id}} options={{tabBarIcon: ()=>{return(<Image style={{tintColor: 'rgb(116,116,116)', width: 30, height: 30}} source={require('../../assets/commande.png')} />)}}} />
            </Tabs.Navigator>
        )
    }
}
