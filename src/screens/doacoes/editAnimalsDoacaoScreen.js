import React, { useState, useEffect } from 'react';
import styles from '../settings/Styles';
import AsyncStorage from '@react-native-community/async-storage';
import Renderif from "../../componets/RenderIf";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {
    ScrollView,
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Image,
    StyleSheet,
    Spinner,
    Alert
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ProfileItem from '../../componets/ProfileItemDoacao';
import Icon from '../../componets/Icon';
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


const editAnimalsDoacaoScreen = ({ route, navigation, props }) => {

    const { date_Doacao } = route.params;
    const { dateRecom } = route.params;
    const { user } = route.params;
    const { recomendacao } = route.params;

    const [date, setData] = React.useState({
        detailDoacao: date_Doacao,
        user: user,
        infDono: false,
        nameButton: 'Adotar Animal',
        disabledButton: false,
        userPet: {},
        loadinUser: false
    });

    const [load, setLoad] = useState(true)

    useEffect(() => {
        navigation.addListener('focus', () => {
            postRecommends();
        });
            getUserPet();
        navigation.addListener('focus', () => setLoad(!load))
    }, [date_Doacao.idAntigoDono])

    const postRecommends = () => {
        let formdata = new FormData();

        formdata.append('idUsuario', date.user.idUsuario)
        formdata.append('especie', date_Doacao.Animal.especie)
        formdata.append('raca', date_Doacao.Animal.raca)
        formdata.append('sexo', date_Doacao.Animal.sexo)
        formdata.append('cor', date_Doacao.Animal.cor)
        formdata.append('pelo', date_Doacao.Animal.pelo)
        formdata.append('porte', date_Doacao.Animal.porte)
        formdata.append('filhote', date_Doacao.Animal.filhote)

        fetch(Server.API_RECOMENDACAO_GOSTO_POST, {
            method: "POST",
            'Content-Type': 'multipart/form-data',
            body: formdata
        }).then(val => {
            console.log('')
        })

    }

    const getUserPet = () => {
        let value = "";
        if(recomendacao) {
            value = dateRecom.idAntigoDono
        } else {
            value = date_Doacao.idAntigoDono
        }
        const url = Server.API_PET_DO_USUARIO +  value
        fetch(url)
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson) {
                    setData({
                        ...date,
                        userPet: responseJson,
                        loadinUser: true
                    })
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    const _enviar = () => {
        Alert.alert(
            "Confirmação",
            "Deseja realmente adotar este animal? ",
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
                        const formdata = new FormData();
                        if(recomendacao) {
                            formdata.append('idDoacao', dateRecom.idDoacao)
                            formdata.append('idanimal', date_Doacao.Animal.idAnimal)
                            formdata.append('idNovoDono', user.idUsuario)
                            formdata.append('DataDoacao', moment().format('YYYY-MM-DD hh:mm:ss'))
                        } else {
                            formdata.append('idDoacao', date_Doacao.idDoacao)
                            formdata.append('idanimal', date_Doacao.Animal.idAnimal)
                            formdata.append('idAntigoDono', date_Doacao.Animal.idUsuario)
                            formdata.append('idNovoDono', user.idUsuario)
                            formdata.append('DataDoacao', moment().format('YYYY-MM-DD hh:mm:ss'))
                        }
                      
                        fetch(Server.API_DOADO_EDITAR, {
                            method: "POST",
                            'Content-Type': 'multipart/form-data',
                            body: formdata
                        }).then(response => response.json())
                            .then(response => {
                                if (response) {
                                    setData({
                                        ...date,
                                        nameButton: 'Adotar Animal',
                                        disabledButton: true
                                    })
                                    Alert.alert(
                                        "Parabéns!",
                                        "Você acabou de fazer uma ótima ação <3",
                                        [
                                            {
                                                text: "OK",
                                                onPress: () =>
                                                    navigation.navigate("HomeAP"),
                                                style: "default"
                                            },
                                        ],
                                        { cancelable: false }
                                    )

                                } else {
                                    setData({
                                        ...date,
                                        nameButton: 'Adotar Animal',
                                        disabledButton: false
                                    })
                                }
                            })

                    }
                }
            ]);
    }

    return (

        <>

            {true ?

                <ImageBackground
                    style={styles.bg, { backgroundColor: '#ebebeb', height: "100%" }}
                >
                    <ScrollView style={styles.containerProfile}>
                        <ImageBackground source={{ uri: Server.API_PRINC + date_Doacao.Animal.Galeria[0].url }} style={styles.photo}>
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
                                matches={'Detalhes do Animal'}
                                name={date_Doacao.Animal.nome.toUpperCase()}
                                age={'Não compre amor'}
                                location={'adote e faça um animalzinho feliz.'}
                                info1={'Raça: ' + (date_Doacao.Animal.raca)}
                                info2={'Porte: ' + (date_Doacao.Animal.porte)}
                                info3={(date_Doacao.Animal.especie) + ' - ' + (date_Doacao.Animal.sexo == 'M' ? 'Macho' : 'Fêmea')}
                                info4={('Filhote: ') + (date_Doacao.Animal.filhote == '1' ? 'Sim' : 'Não')}
                                info5={('Descrição do local: ') + (date_Doacao.descricao)}

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
                                info3={'Rua: ' + (date.userPet.rua) + ' - ' + (date.userPet.numero)}
                                info4={('Telefone: ') + (date.userPet.telefone)}

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

                        {user.idUsuario != date_Doacao.idAntigoDono &&
                            date_Doacao.dataDoacao == null ?
                            <View style={style.button}>
                                <TouchableOpacity
                                    disabled={!date.disabledButton ? false : true}
                                    style={style.signIn}
                                    onPress={() => { _enviar() }}
                                >
                                    <LinearGradient
                                        colors={['#ff9517', '#ff9517']}
                                        style={style.signIn}
                                    >
                                        <Text style={[style.textSign, {
                                            color: '#fff'
                                        }]}>{date.nameButton}</Text>
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

export default editAnimalsDoacaoScreen;

const style = StyleSheet.create({

    button: {
        alignItems: 'center',
        marginBottom: 20
    },
    signIn: {
        width: '95%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },

});