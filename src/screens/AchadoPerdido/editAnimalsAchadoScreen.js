import React, { useState, useEffect } from 'react';
import styles from '../settings/styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Renderif from "../../componets/RenderIf";

import {
    ScrollView,
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Image
} from 'react-native';
import ProfileItem from '../../componets/ProfileItemAchado';
import Icon from '../../componets/Icon';
import Server from '../settings/Server';
import AsyncStorage from '@react-native-community/async-storage';


const editAnimalsAchadoScreen = ({ route, navigation, props }) => {

    const { date_Achado } = route.params;
    const { user } = route.params;

    const [date, setData] = React.useState({
        detailachado: date_Achado,
        infDono: false
    });

    const [load, setLoad] = useState(true)

    useEffect(() => {
        const url = Server.API_GET_PET_ACHADO_ID + date_Achado.idAchado
        fetch(url)
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson) {
                    console.log(responseJson)
                    setData({
                        ...date,
                        detailachado: responseJson
                    })
                }
            })
            .catch(err => {
                console.log(err);
            });


        navigation.addListener('focus', () => setLoad(!load))
    }, [load, navigation])


    return (

        <ImageBackground
            style={styles.bg, { backgroundColor:'#ebebeb', height: "100%" }}
        >
            <ScrollView style={styles.containerProfile}>
                <ImageBackground source={{ uri: Server.API_PRINC + date.detailachado.url }} style={styles.photo}>
                    <View style={styles.top}>
                        <TouchableOpacity style={{ flexDirection: 'row', alignContent: 'center' }}
                            onPress={() => navigation.goBack()}>
                            <Image style={{ width: 25, height: 25, marginLeft: 5, bottom: 20 }}
                                source={require('../../source/arrow.png')}
                                resizeMode='contain' />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>

                <Renderif test={!date.infDono}>
                    <ProfileItem
                        navigation={navigation}
                        matches={'Detalhes do Animal'}
                        name={'AJUDE A ENCONTRAR :('}
                        age={date.detailachado.estado}
                        location={date.detailachado.cidade}
                        info1={('Descrição do local: ') + (date.detailachado.descricaoLocal)}
                        info2={('Descrição do animal: ') + (date.detailachado.descricaoAnimal)}
                        info3={date.detailachado}
                        iduser={date.detailachado.idUsuario}
                        iduserAchado={user.idUsuario}
                    />
                </Renderif>
                <Renderif test={date.infDono}>
                    <ProfileItem
                        navigation={navigation}
                        matches={'Dados do usuário'}
                        name={(user.nome.toUpperCase()) + (user.sobrenome.toUpperCase())}
                        age={user.estado}
                        location={user.cidade}
                        info1={'Cep: ' + (user.cep)}
                        info2={'Cidade: ' + (user.cidade)}
                        info3={'Rua: ' + (user.rua) + ' - ' + (user.numero)}
                        info4={('Telefone: ') + (user.telefone)}
                        iduser={date.detailachado.idUsuario}
                        iduserAchado={user.idUsuario}

                    />
                </Renderif>

                <View style={{ marginBottom: 20, marginTop: 10 }}>
                    <View style={styles.matchesProfileItemInfDono}>
                        {!date.infDono ?
                            <TouchableOpacity
                                onPress={() => setData({
                                    ...date,
                                    infDono: true
                                })}>
                                <Text style={styles.matchesTextProfileItem}>
                                    <FontAwesome name="info-circle" />  Informações do Dono
                         </Text>
                            </TouchableOpacity>
                            :

                            <TouchableOpacity
                                onPress={() => setData({
                                    ...date,
                                    infDono: false
                                })}>
                                <Text style={styles.matchesTextProfileItem}>
                                    <FontAwesome name="info-circle" />  Informações do Animal
                                </Text>
                            </TouchableOpacity>}

                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

export default editAnimalsAchadoScreen;