import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Card, Input } from 'react-native-elements'
import * as firebase from 'firebase'

export default class Connexion extends Component {

    state = {
        nom: "",
        email: "",
        code_1: "",
        code_2: ""
    }

    inscription = () => {
        if((this.state.nom == "") || (this.state.email == "") || (this.state.code_1 == "") || (this.state.code_2 == "")){
            alert("Veuillez remplir tout les champs");
        } else {
            if((this.state.code_1.length >= 6) && (this.state.code_2.length >= 6)) {
                if(this.state.code_1 == this.state.code_2){
                    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.code_1)
                        .then((userCredential) => {
                            let user = userCredential.user.uid;
                            firebase.default.firestore().collection(this.props.route.params.type).doc(user).set({
                                nom: this.state.nom,
                                email: this.state.email,
                                tel: "aucun",
                                ville: "aucune",
                                photo: "https://firebasestorage.googleapis.com/v0/b/livraison-49ed8.appspot.com/o/icone.png?alt=media&token=96e8736f-cd83-49dd-bd24-e2b28d314e79",
                                dispo: true,
                                transport: "aucun"
                            })
                            alert("Inscription Réussie");
                            if (this.props.route.params.type == "vendeur")
                                this.props.navigation.navigate("Mon Compte Vendeur", {id: user});
                            else
                                this.props.navigation.navigate("Mon Compte Livreur", {id: user});
                        })
                        .catch((error) => {
                            alert(error.message);
                        });
                } else
                    alert("Vérifier votre mot de passe !");
            } else
                alert("Le mot de passe doit contenir au moins 6 caractères !");
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Card containerStyle={{width: "90%"}}>
                    <Card.Title>Création de Compte {this.props.route.params.type}</Card.Title>
                    <Card.Divider/>
                    <Input placeholder='Nom Complet' onChangeText={value => this.setState({ nom: value })} />
                    <Input placeholder='e-mail' onChangeText={value => this.setState({ email: value })} />
                    <Input secureTextEntry={true} placeholder='Mot de passe' onChangeText={value => this.setState({ code_1: value })} />
                    <Input secureTextEntry={true} placeholder='Confirmer le mot de passe' onChangeText={value => this.setState({ code_2: value })} />
                </Card>
                <Button buttonStyle={styles.btn} title="S'inscrire" type='solid' onPress={this.inscription}  />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: "flex-start"
    },
    btn: {
        borderRadius: 200,
        padding: "6%",
        margin: "10%"
    }
});