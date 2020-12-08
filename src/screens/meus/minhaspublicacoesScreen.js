import React, { useState, useEffect } from 'react';
import styles from '../settings/Styles';
import {
    Tab,
    Tabs,
    ScrollableTab,
    TabHeading,
    Spinner
} from 'native-base';
import {
    View,
    Text,
    TouchableOpacity,
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


const minhaspublicacoesScreen = ({ navigation, props }) => {

    const [data, setData] = React.useState({
        user: {},
        variant: ''
    });

    const [feed, setFeed] = useState([]);
    const [feedPerdido, setFeedPerdido] = useState([]);
    const [loadingPerdido, setLoadingPerdido] = useState(false);
    const [feedAchado, setFeedAchado] = useState([]);
    const [loadingAchado, setLoadingAchado] = useState(false);
    const [feedDoado, setFeedDoado] = useState([]);
    const [loadingDoado, setLoadingDoado] = useState(false);
    const [user, setUser] = useState([]);
    const [load, setLoad] = useState(true)

    const fullWidth = Dimensions.get('window').width;
    const imageStyle = [
        {
            borderRadius: 8,
            width: data.variant ? fullWidth / 2 - 90 : fullWidth - 240,
            height: data.variant ? 170 : 140,
            margin: data.variant ? 0 : 15,
        }
    ];

    const nameStyle = [
        {
            textAlign: 'center',
            color: '#363636',
            fontSize: data.variant ? 15 : 20,
            marginBottom:10
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

            let url = Server.API_DOADO_USER + user.idUsuario
            fetch(url)
                .then(response => response.json())
                .then(responseJson => {
                    if (responseJson != null) {
                        setFeedDoado(responseJson)
                        setLoadingDoado(true)
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        });
        navigation.addListener('focus', () => setLoad(!load))
    }, [load, navigation]);

    useEffect(() => {

        AsyncStorage.getItem("User").then(userText => {
            const user = JSON.parse(userText);

            let url = Server.API_ACHADO_USER + user.idUsuario
            fetch(url)
                .then(response => response.json())
                .then(responseJson => {
                    if (responseJson != null) {
                        setFeedAchado(responseJson)
                        setLoadingAchado(true)
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        });
        navigation.addListener('focus', () => setLoad(!load))
    }, [load, navigation]);

    useEffect(() => {

        AsyncStorage.getItem("User").then(userText => {
            const user = JSON.parse(userText);

            let url = Server.API_PERDIDO_USER + user.idUsuario
            fetch(url)
                .then(response => response.json())
                .then(responseJson => {
                    console.log(responseJson)
                    if (responseJson != null) {
                        setFeedPerdido(responseJson)
                        setLoadingPerdido(true)
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        });
        navigation.addListener('focus', () => setLoad(!load))
    }, [load, navigation]);
    

    function renderItemPerdido({ item: feed }) {
        return (
            <View style={styles.containerCardItem}>
                <View>
                    <Text style={{ fontSize: 12, paddingTop: 12 }}>
                        {moment(feed.dataRegistro).locale('pt-br').startOf('hour ').fromNow()}
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('editAnimalPerdido', {
                        date_Perdido: feed,
                        user: user
                    })}>
                    <Image source={{ uri: Server.API_PRINC + feed.Animal.Galeria[0].url }} style={imageStyle} />
                    <Text style={nameStyle}>{(feed.Animal.nome)}</Text>
                    <Text style={{ fontSize: 15, color: '#363636', textAlign: 'center', paddingBottom: 10 }}>{feed.Animal.raca}</Text>
                </TouchableOpacity>
            </View>
        );
    }


    function renderItemAchado({ item: feed }) {
        return (
            <View style={styles.containerCardItem}>
                <View>
                    <Text style={{ fontSize: 12, paddingTop: 12 }}>
                        {moment(feed.dataRegistro).locale('pt-br').startOf('hour ').fromNow()}
                    </Text>
                </View>
                <TouchableOpacity style={styles.action}
                    onPress={() => navigation.navigate('editAnimalAchado', {
                        date_Achado: feed,
                        user: user
                    })}>
                    <Image source={{ uri: Server.API_PRINC + feed.url }} style={imageStyle} />
                    <Text style={nameStyle}>{'teste'}</Text>
                </TouchableOpacity>


            </View>
        );
    }

    function renderItemDoado({ item: feed }) {
        return (
            <View style={styles.containerCardItem}>
                <View>
                    <Text style={{ fontSize: 12, paddingTop: 12 }}>
                        {moment(feed.dataRegistro).locale('pt-br').startOf('hour ').fromNow()}
                    </Text>
                </View>
                <TouchableOpacity style={styles.action}
                    onPress={() => navigation.navigate('editAnimalDoacao', {
                        date_Doacao: feed,
                        user: user
                    })}>
                    <Image source={{ uri: Server.API_PRINC + feed.Animal.Galeria[0].url }} style={imageStyle} />
                    <Text style={nameStyle}>{'fdfd'}</Text>
                </TouchableOpacity>

            </View>
        );
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f4f4f4' }}>
            <CustomHeader title="Home" isHome={true} navigation={navigation} />

            <Tabs style={{ backgroundColor: '#323a4e' }}
                tabBarBackgroundColor={'#323a4e'}
                tabBarUnderlineStyle={{ backgroundColor: "white" }}
                renderTabBar={() => <ScrollableTab />}>
                <Tab heading={
                    <TabHeading
                        style={{
                            backgroundColor: '#323a4e'
                        }}
                    >
                        <Text style={{ color: "white" }}>
                            Perdidos
                        </Text>
                    </TabHeading>
                }>
                    <View style={styles.containerMatches}>
                        {feedPerdido.length > 0 ?
                            <FlatList
                                numColumns={2}
                                data={feedPerdido}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={renderItemPerdido}
                            />
                            : !loadingPerdido ? <Spinner color='#ff9517' />
                            : <Text style={{ textAlign: 'center', padding:10 }}>Nenhum registro encontrado!</Text>}
                    </View>
                </Tab>

                <Tab heading={
                    <TabHeading
                        style={{
                            backgroundColor: '#323a4e'
                        }}
                    >
                        <Text style={{ color: "white" }}>
                            Achados
                            </Text>
                    </TabHeading>
                }>
                    <View style={styles.containerMatches}>
                        {feedAchado.length > 0 ?
                            <FlatList
                                numColumns={2}
                                data={feedAchado}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={renderItemAchado}
                            />
                            : !loadingAchado ? <Spinner color='#ff9517' />
                            : <Text style={{ textAlign: 'center', padding:10}}>Nenhum registro encontrado!</Text>}
                    </View>
                </Tab>

                <Tab heading={
                    <TabHeading
                        style={{
                            backgroundColor: '#323a4e'
                        }}
                    >
                        <Text style={{ color: "white" }}>
                            Doações
                            </Text>
                    </TabHeading>
                }>
                    <View style={styles.containerMatches}>
                        {feedDoado.length > 0 ?
                            <FlatList
                                numColumns={2}
                                data={feedDoado}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={renderItemDoado}
                            />
                            : !loadingDoado ? <Spinner color='#ff9517' />
                            : <Text style={{ textAlign: 'center', padding:10 }}>Nenhum registro encontrado!</Text>}
                    </View>
                </Tab>
            </Tabs>
        </SafeAreaView>

    );
};

export default minhaspublicacoesScreen;