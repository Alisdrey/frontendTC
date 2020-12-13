import React, { useState, useEffect } from 'react';
import styles from '../settings/Styles';
import {
    Spinner
} from 'native-base';
import {
    View,
    Text,
    FlatList,
    Dimensions,
    Image,
    SafeAreaView,
} from 'react-native';
import { CustomHeader } from '../../index';
import AsyncStorage from '@react-native-community/async-storage';
import Server from '../settings/Server';
import moment from "moment/min/moment-with-locales";
moment.updateLocale("pt-br", {
    months: [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro"
    ]
});
moment.locale("pt-br");


const meusanimaisScreen = ({ navigation, props }) => {

    const [feedMeuAnimal, setFeedMeuAnimal] = useState([]);
    const [loadingMeuAnimal, setLoadingMeuAnimal] = useState(false);

    const [user, setUser] = useState([]);
    const [load, setLoad] = useState(true)

    const fullWidth = Dimensions.get('window').width;
    const imageStyle = [
        {
            borderRadius: 8,
            width: fullWidth - 240,
            height: 140,
            margin: 15,
        }
    ];

    const nameStyle = [
        {
            textAlign: 'center',
            color: '#363636',
            fontSize: 20,
            marginBottom: 10
        }
    ];

    useEffect(() => {
        AsyncStorage.getItem("User").then(userText => {
            const user = JSON.parse(userText);
            setUser(user)
        });

    }, []);


    useEffect(() => {
        AsyncStorage.getItem("User").then(userText => {
            const user = JSON.parse(userText);
            let url = Server.API_GET_ANIMAL_USER + user.idUsuario + '/pets'
            fetch(url)
                .then(response => response.json())
                .then(responseJson => {
                    setFeedMeuAnimal(responseJson)
                    setLoadingMeuAnimal(true)
                })
                .catch(error => {
                    console.log(error);
                });
        });
        navigation.addListener('focus', () => setLoad(!load))
    }, [load, navigation]);



    function renderItemAnimal({ item: feed }) {
        return (
            <>
                {feed.Galeria != '' ?
                    <View style={styles.containerCardItem}>


                        {feed.Galeria != '' ? <Image source={{ uri: Server.API_PRINC + feed.Galeria[0].url }} style={imageStyle} />
                            : console.log("d")
                        }
                        <Text style={nameStyle}>{(feed.nome)}</Text>
                        <Text style={{ fontSize: 15, color: '#363636', textAlign: 'center', paddingBottom: 10 }}>{feed.raca}</Text>

                    </View>
                    : console.log('')}
            </>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f4f4f4' }}>
            <CustomHeader title="Home" isHome={true} navigation={navigation} />

            <View style={styles.containerMatches}>
                <Text style={{
                    paddingLeft: 10,
                    paddingTop: 10,
                    fontSize:18,
                    fontWeight: "bold"
                }}>Meus Animais</Text>
                {feedMeuAnimal.length > 0 ?
                    <FlatList
                        numColumns={2}
                        data={feedMeuAnimal}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderItemAnimal}
                    />
                    : !loadingMeuAnimal ? <Spinner color='#ff9517' />
                    : <Text style={{ textAlign: 'center', padding: 10 }}>Nenhum registro encontrado!</Text>}
            </View>

        </SafeAreaView>

    );
};

export default meusanimaisScreen;