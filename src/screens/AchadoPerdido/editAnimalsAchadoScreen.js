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
import Server from '../settings/Server';
import { Spinner } from 'native-base';


const editAnimalsAchadoScreen = ({ route, navigation, props }) => {

    const { date_Achado } = route.params;
    const { user } = route.params;
    const [loadingAchado, setLoadingAchado] = useState(false);

    const [date, setData] = React.useState({
        detailachado: date_Achado,
        infDono: false,
        userPet: {},

    });

    const [load, setLoad] = useState(true)

    useEffect(() => {

        getUserPet();

        const url = Server.API_GET_PET_ACHADO_ID + date_Achado.idAchado
        fetch(url)
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson) {
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


    const getUserPet = () => {
        console.log(date_Achado)
        const url = Server.API_PET_DO_USUARIO + date_Achado.idUsuario
        fetch(url)
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson) {
                    console.log(responseJson)
                    setData({
                        ...date,
                        userPet: responseJson
                    })
                    setLoadingAchado(true)
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (

        <ImageBackground
            style={styles.bg, { backgroundColor: '#ebebeb', height: "100%" }}
        >
            <ScrollView style={styles.containerProfile}>
                {console.log("date.date", date)}
                <ImageBackground source={{ uri: Server.API_PRINC + date.detailachado.url }} style={styles.photo}>
                    <View style={styles.top}>
                        <TouchableOpacity style={{ bottom: 20, alignContent: 'center' }}
                            onPress={() => navigation.goBack()}>
                            <Image style={{ width: 25, height: 25, marginLeft: 5 }}
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
                        detailachado={date.detailachado}
                        iduser={user.idUsuario}
                        iduserAchado={date.detailachado.idUsuario}
                    />
                </Renderif>
                {loadingAchado ?
                    <Renderif test={date.infDono}>
                        <ProfileItem
                            navigation={navigation}
                            matches={'Dados do usuário'}
                            name={(date.userPet.nome) + ' ' + (date.userPet.sobrenome)}
                            age={date.userPet.estado}
                            location={date.userPet.cidade}
                            info1={'Cep: ' + (date.userPet.cep)}
                            info2={'Cidade: ' + (date.userPet.cidade)}
                            info3={'Rua: ' + (date.userPet.rua) + ' - nº ' + (date.userPet.numero)}
                            info4={('Telefone: ') + (date.userPet.telefone)}
                            iduser={user.idUsuario}
                            iduserAchado={date.detailachado.idUsuario}
                            detailachado={date.detailachado}

                        />
                    </Renderif>

                    : <Spinner color='#ff9517' />}

                <View style={{ marginBottom: 20, marginTop: 10 }}>
                    <View style={styles.matchesProfileItemInfDono}>
                        {!date.infDono ?
                            <TouchableOpacity
                                onPress={() => setData({
                                    ...date,
                                    infDono: true
                                })}>
                                <Text style={styles.matchesTextProfileItem}>
                                    <FontAwesome name="info-circle" />  Ver informações do Dono
                         </Text>
                            </TouchableOpacity>
                            :

                            <TouchableOpacity
                                onPress={() => setData({
                                    ...date,
                                    infDono: false
                                })}>
                                <Text style={styles.matchesTextProfileItem}>
                                    <FontAwesome name="info-circle" /> Ver Informações do Animal
                                </Text>
                            </TouchableOpacity>}

                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

export default editAnimalsAchadoScreen;