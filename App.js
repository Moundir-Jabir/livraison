import 'react-native-gesture-handler';
import '@react-native-async-storage/async-storage'
import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Demarage from './src/components/Demarage'
import DashbordVendeur from './src/components/DashbordVendeur'
import DashbordLivreur from './src/components/DashbordLivreur'
import { enableScreens } from 'react-native-screens'
import * as firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyCUAiPP-BOD1UScZhNIKi5NMIh6DgGXnrU",
  authDomain: "livraison-49ed8.firebaseapp.com",
  projectId: "livraison-49ed8",
  storageBucket: "livraison-49ed8.appspot.com",
  messagingSenderId: "104513572793",
  appId: "1:104513572793:web:f3e650304fb51f7a3a3068"
};
firebase.initializeApp(firebaseConfig);

enableScreens();

const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Ma Livraison" >
          <Stack.Screen name="Ma Livraison" component={Demarage} />
          <Stack.Screen name="Mon Compte Vendeur" component={DashbordVendeur} options={{headerLeft: null}} />
          <Stack.Screen name="Mon Compte Livreur" component={DashbordLivreur} options={{headerLeft: null}} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}
