import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, Switch, ScrollView } from 'react-native'
import { Card, Input, Button } from 'react-native-elements'
import * as firebase from 'firebase'
import * as ImagePicker from 'react-native-image-picker'
import ModalSelector from 'react-native-modal-selector'

export default class Profil extends Component {

    componentDidMount() {
        const ref = firebase.default.firestore().collection(this.props.route.params.type).doc(this.props.route.params.user);
        ref.onSnapshot(docSnapshot => this.setState({profil: docSnapshot.data()}));
    }

    state = {
        profil: {},
        toggle: false,
        newTel: "",
        villes: [
            {key: 0, label: "aucune"},
            {key: 1, label: "Tanger"},
            {key: 2, label: "Tétouan"},
            {key: 3, label: "Larache"},
            {key: 4, label: "Al Hoceïma"},
            {key: 5, label: "Chefchaouen"},
            {key: 6, label: "Oujda"},
            {key: 7, label: "Nador"},
            {key: 8, label: "Berkane"},
            {key: 9, label: "Figuig"},
            {key: 10, label: "Fès"},
            {key: 11, label: "Meknès"},
            {key: 12, label: "Ifrane"},
            {key: 13, label: "Séfrou"},
            {key: 14, label: "Taza"},
            {key: 15, label: "Rabat"},
            {key: 16, label: "Salé"},
            {key: 17, label: "Skhirate"},
            {key: 18, label: "Témara"},
            {key: 19, label: "Kénitra"},
            {key: 20, label: "Khémisset"},
            {key: 21, label: "Sidi Slimane"},
            {key: 22, label: "Béni-Mellal"},
            {key: 23, label: "Azilal"},
            {key: 24, label: "Khénifra"},
            {key: 25, label: "Khouribga"},
            {key: 26, label: "Casablanca"},
            {key: 27, label: "Mohammédia"},
            {key: 28, label: "El Jadida"},
            {key: 29, label: "Benslimane"},
            {key: 30, label: "Berrechid"},
            {key: 31, label: "Settat"},
            {key: 32, label: "Marrakech"},
            {key: 33, label: "Al Haouz"},
            {key: 34, label: "El Kelaâ des Sraghna"},
            {key: 35, label: "Essaouira"},
            {key: 36, label: "Safi"},
            {key: 37, label: "Youssoufia"},
            {key: 38, label: "Errachidia"},
            {key: 39, label: "Ouarzazate"},
            {key: 40, label: "Zagora"},
            {key: 41, label: "Agadir"},
            {key: 42, label: "Aït Melloul"},
            {key: 43, label: "Taroudant"},
            {key: 44, label: "Tiznit"},
            {key: 45, label: "Guelmim"},
            {key: 46, label: "Laâyoune"},
            {key: 47, label: "Dakhla"}
        ],
        moyen: [
            {key: 0, label: "aucun"},
            {key: 1, label: "velo"},
            {key: 2, label: "moto"},
            {key: 3, label: "voiture"},
            {key: 4, label: "van"},
            {key: 5, label: "camion"}
        ]
    }

    upload = () => {
        const options = {noData: true};
        ImagePicker.launchImageLibrary(options, async(response) => {
            if(response.uri) {
                const storageRef = firebase.default.storage().ref().child(`${this.props.route.params.user}/${this.props.route.params.user}`);
                const image = await fetch(response.uri);
                const blob = await image.blob();
                storageRef.put(blob).then(async (e) => {
                    const url = await storageRef.getDownloadURL();
                    const ref = firebase.default.firestore().collection(this.props.route.params.type).doc(this.props.route.params.user);
                    ref.update({photo: url}).then(e => alert("Profil modifié !")).catch(e => alert("Une erreur est survenue !"))
                })
            }
        });
    }

    toggle = () => {
        this.setState({toggle: !this.state.toggle});
    }

    update = () => {
        const ref = firebase.default.firestore().collection(this.props.route.params.type).doc(this.props.route.params.user);
        ref.update({tel: this.state.newTel}).then(e => {
            alert("Télephone modifié !");
            this.setState({toggle: false});
        })
    }

    disponible = () => {
        const ref = firebase.default.firestore().collection(this.props.route.params.type).doc(this.props.route.params.user);
        ref.update({dispo: !this.state.profil.dispo})
    }

    render() {
        const { nom, email, tel, ville, photo, dispo, transport } = this.state.profil;
        return (
            <ScrollView contentContainerStyle={styles.container} >
                <View style={{backgroundColor: 'white', margin: 20, padding: 20, borderRadius: 50 }}>
                    <Image style={{width: 140, height: 140, borderRadius: 100, alignSelf: 'center', margin: 12}} source={{uri: photo}} />
                    <Text style={styles.text}>{nom}</Text>
                    <Text style={styles.text}>{email}</Text>
                    <View style={{flexDirection: 'row', justifyContent: "space-evenly", alignItems:"center"}}>
                        <View style={{flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start"}}>
                            <Image source={require("../../../assets/ville.png")} />
                            <Text style={{marginTop: "20%"}}>{ville}</Text>
                        </View>
                        <View style={{flexDirection: "row", justifyContent: "flex-start"}}>
                            <Image source={require("../../../assets/phone.png")} />
                            <Text style={{marginTop: "20%"}}>{tel}</Text>
                        </View>
                    </View>
                </View>
                <Card>
                    <Card.Title>Paramètres</Card.Title>
                    <Card.Divider/>
                    <Text onPress={this.upload} style={styles.params}>Modifier la Photo de Profil</Text>
                    <Card.Divider/>
                    <View style={styles.choix}>
                        <Text style={styles.params}>Modifier la Ville</Text>
                        <ModalSelector
                            data={this.state.villes}
                            initValue={ville}
                            onChange={(option) => {
                                const ref = firebase.default.firestore().collection(this.props.route.params.type).doc(this.props.route.params.user);
                                ref.update({ville: option.label})
                            }}
                        />
                    </View>
                    <Card.Divider/>
                    <Text onPress={this.toggle} style={styles.params}>Modifier le Numéro de Télephone</Text>
                    {
                        (this.state.toggle) ? (
                            <View>
                                <Input placeholder="nouveau téléphone" onChangeText={value => this.setState({newTel: value})} />
                                <Button buttonStyle={styles.btn} title="Modifier" type='solid' onPress={this.update} />
                            </View>
                        ): null
                    }
                    <Card.Divider/>
                    {(this.props.route.params.dispo) ? (
                    <View>
                        <View style={styles.choix}>
                            <Text style={styles.params}>Disponible</Text>
                            <Switch onValueChange={this.disponible} value={dispo} />
                        </View>
                        <Card.Divider/>
                        <View style={styles.choix}>
                            <Text style={styles.params}>Moyen de Transport</Text>
                            <ModalSelector
                                data={this.state.moyen}
                                initValue={transport}
                                onChange={(option) => {
                                    const ref = firebase.default.firestore().collection(this.props.route.params.type).doc(this.props.route.params.user);
                                    ref.update({transport: option.label})
                                }}
                            />
                        </View>
                    </View>
                    ):null }
                    <Text onPress={() => { this.props.navigation.navigate("Ma Livraison") }} style={{fontSize: 20, padding: 20, textAlign: 'center'}}>Se Déconnecter</Text>
                </Card>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
        justifyContent: "flex-start"
    },
    text: {
        textAlign: "center",
        marginBottom: "5%",
        fontSize: 20,
        color: 'rgb(0, 140, 255)'
    },
    params: {
        color: "red",
        fontSize: 20,
        padding: 5
    },
    btn: {
        borderRadius: 200
    },
    choix: {
        flexDirection: 'row', justifyContent: "space-between"
    }
})