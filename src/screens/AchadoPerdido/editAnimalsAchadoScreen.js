import React, { useState, useEffect } from 'react';
import styles from '../settings/Styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Renderif from "../../componets/RenderIf";
import LinearGradient from 'react-native-linear-gradient';
import {
    ScrollView,
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Image,
    Alert
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
        loadinUser: false,
        nameButton: 'Animal Encontrado',
        disabledButton: false,

    });

    const [load, setLoad] = useState(true)

    useEffect(() => {

        navigation.addListener('focus', () => {
            setData({
                ...date,
                detailachado: date_Achado,
                infDono: false,
                userPet: {},
                loadinUser: false

            })
        });

        const url = Server.API_GET_PET_ACHADO_ID + date_Achado.idAchado
        fetch(url)
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson) {
                    setData({
                        ...date,
                        detailachado: responseJson
                    })
                    getUserPet();
                }
            })
            .catch(err => {
                console.log(err);
            });


        navigation.addListener('focus', () => setLoad(!load))
    }, [load, navigation])


    const getUserPet = () => {
        console.log('date_Achado', date_Achado)
        const url = Server.API_PET_DO_USUARIO + date_Achado.idUsuario
        fetch(url)
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson) {
                    console.log(responseJson)
                    setData({
                        ...date,
                        userPet: responseJson,
                        loadinUser: true
                    })
                    setLoadingAchado(true)
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    const _enviar = () => {
        Alert.alert(
            "Confirmação",
            "Animal Realmente Encontrado? ",
            [
                {
                    text: "Não",
                    onPress: () => null,
                    style: "cancel"
                },
                {
                    text: "Sim", onPress: () => {
                        setData({
                            ...date,
                            nameButton: 'Aguarde...',
                            disabledButton: true
                        })
                        let formdata = new FormData();

                        formdata.append('idAchado', date_Achado.idAchado)
                        formdata.append('idusuario', date_Achado.idUsuario)
                        formdata.append('descricaoLocal', date_Achado.descricaoLocal)
                        formdata.append('descricaoAnimal', date_Achado.descricaoAnimal)
                        formdata.append('estado', date_Achado.estado)
                        formdata.append('cidade', date_Achado.cidade)
                        formdata.append('acolhido', date_Achado.acolhido)
                        formdata.append('status', 0)
                        formdata.append('file', null)


                        fetch(Server.API_EDITAR_ACHADO, {
                            method: "POST",
                            'Content-Type': 'multipart/form-data',
                            body: formdata
                        }).then(response => response.json())
                            .then(response => {
                                setData({
                                    ...date,
                                    nameButton: 'Animal Encontrado',
                                    disabledButton: false
                                })
                                Alert.alert(
                                    "Parabéns!",
                                    "Você acabou de fazer uma ótima ação <3",
                                    [
                                        {
                                            text: "OK",
                                            onPress: () =>
                                            navigation.navigate("minhaspublicacoes"),
                                            style: "default"
                                        },
                                    ],
                                    { cancelable: false }
                                )
                                

                            })
                    }
                }
            ]);
    }

    return (
        <>
            {date.loadinUser ?
                <ImageBackground
                    style={styles.bg, { backgroundColor: '#ebebeb', height: "100%" }}
                >
                    <ScrollView style={styles.containerProfile}>
                        {console.log("date.date", date)}
                        <ImageBackground source={{ uri: Server.API_PRINC + date_Achado.url }} style={styles.photo}>
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
                                age={date_Achado.estado}
                                location={date_Achado.cidade}
                                info1={('Descrição do local: ') + (date_Achado.descricaoLocal)}
                                info2={('Descrição do animal: ') + (date_Achado.descricaoAnimal)}
                                detailachado={date_Achado}
                                iduser={user.idUsuario}
                                iduserAchado={date_Achado.idUsuario}
                            />
                        </Renderif>

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
                                iduserAchado={date_Achado.idUsuario}
                                detailachado={date_Achado}

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
                                            <FontAwesome name="info-circle" /> Ver informações do responsável
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
                        {user.idUsuario == date_Achado.idUsuario &&
                            date_Achado.status == 1 ?
                            <View style={{
                                alignItems: 'center',
                                marginBottom: 20
                            }}>
                                <TouchableOpacity
                                    disabled={!date.disabledButton ? false : true}
                                    style={{
                                        width: '95%',
                                        height: 50,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: 10
                                    }}
                                    onPress={() => { _enviar() }}
                                >
                                    <LinearGradient
                                        colors={['#ff9517', '#ff9517']}
                                        style={{
                                            width: '95%',
                                            height: 50,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderRadius: 10
                                        }}
                                    >
                                        <Text style={{
                                             fontSize: 18,
                                             fontWeight: 'bold',
                                            color: '#fff'
                                        }}>{date.nameButton}</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View> : null
                        }
                    </ScrollView>
                </ImageBackground>
                : <Spinner color='#ff9517' />}
        </>
    );
};

export default editAnimalsAchadoScreen;