import React, { Component } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Profil from './dashbord/Profil'
import {Image} from 'react-native'
import Offres from './livreur/Offres'
import * as firebase from 'firebase'
import StockLivreur from './livreur/StockLivreur'
import CommandeLivreur from './livreur/CommandeLivreur'

const Tabs = createBottomTabNavigator();

export default class DashbordLivreur extends Component {

    componentDidMount() {
        const ref = firebase.default.firestore().collection('offre');
        ref.where('livreur','==',this.props.route.params.id).where('statut','==',false).onSnapshot(e => this.setState({nbr_offre: e.size}) )
        const commande = firebase.default.firestore().collection("commande");
        commande.where('etat','==','en-cours').where('livreur','==',this.props.route.params.id).onSnapshot(e => this.setState({nbr_commande: e.size}))
    }

    state = {
        nbr_offre: 0,
        nbr_commande: 0
    }

    render() {
        const { nbr_offre, nbr_commande } = this.state
        return (
            <Tabs.Navigator initialRouteName="Mes Commandes" >
                <Tabs.Screen name="Mon Profil" component={Profil} initialParams={{user: this.props.route.params.id, type: "livreur", dispo: true}} options={{tabBarIcon: ()=>{return(<Image style={{tintColor: 'rgb(116,116,116)', width: 30, height: 30}} source={require('../../assets/profil.png')} />)}}} />
                <Tabs.Screen name="Mon Stock" component={StockLivreur} initialParams={{user: this.props.route.params.id}} options={{tabBarIcon: ()=>{return(<Image style={{tintColor: 'rgb(116,116,116)', width: 30, height: 30}} source={require('../../assets/stock.png')} />)}}} />
                <Tabs.Screen name="Offres" component={Offres} initialParams={{user: this.props.route.params.id}} options={{tabBarIcon: ()=>{return(<Image style={{tintColor: 'rgb(116,116,116)', width: 30, height: 30}} source={require('../../assets/offre.png')} />)}, tabBarBadge: nbr_offre}} />
                <Tabs.Screen name="Mes Commandes" component={CommandeLivreur} initialParams={{user: this.props.route.params.id}} options={{tabBarIcon: ()=>{return(<Image style={{tintColor: 'rgb(116,116,116)', width: 30, height: 30}} source={require('../../assets/commande.png')} />)}, tabBarBadge: nbr_commande}} />
            </Tabs.Navigator>
        )
    }
}
