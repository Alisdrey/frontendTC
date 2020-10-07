import React, { useState, useEffect } from 'react';
import styles from '../settings/styles';
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
    Dimensions,
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
    const { user } = route.params;
    const [load, setLoad] = useState(true)

    const [date, setData] = React.useState({
        detailDoacao: date_Doacao,
        user: user,
        infDono: false
    });


    useEffect(() => {
        console.log(date.detailDoacao)

        let formdata = new FormData();

        formdata.append('idUsuario', date.user.idUsuario)
        formdata.append('especie', date_Doacao.Animal.especie)
        formdata.append('raca', date_Doacao.Animal.raca)
        formdata.append('sexo', date_Doacao.Animal.sexo)
        formdata.append('cor', date_Doacao.Animal.cor)
        formdata.append('pelo', date_Doacao.Animal.pelo)
        formdata.append('porte', date_Doacao.Animal.porte)
        formdata.append('filhote', date_Doacao.Animal.filhote)
        console.log(formdata)

        fetch(Server.API_RECOMENDACAO_GOSTO_POST, {
            method: "POST",
            'Content-Type': 'multipart/form-data',
            body: formdata
        }).then(response => response.json())
            .then(response => {

            })

     navigation.addListener('focus', () => setLoad(!load))
    }, [load, navigation])

    const _enviar = () => {
        Alert.alert(
            "Confirmação",
            "Este animal foi realmente doado? ",
            [
                {
                    text: "Não",
                    onPress: () => null,
                    style: "cancel"
                },
                {
                    text: "Sim", onPress: () => {

                        console.log(date)
                        console.log(moment().format('YYYY-MM-DD'))
                        let formdata = new FormData();

                        formdata.append('idDoacao', date.detailDoacao.idDoacao)
                        formdata.append('idanimal', date.detailDoacao.Animal.idAnimal)
                        formdata.append('idAntigoDono', date.user.Animal.idUsuario)
                        formdata.append('idNovoDono', date.user.idUsuario)
                        formdata.append('DataDoacao', moment().format('YYYY-MM-DD hh:mm:ss'))


                        fetch(Server.API_DOADO_EDITAR, {
                            method: "POST",
                            'Content-Type': 'multipart/form-data',
                            body: formdata
                        }).then(response => response.json())
                            .then(response => {
                                console.log('teste', response)

                            })
                    }
                }
            ]);
    }

    return (

        <ImageBackground
            style={styles.bg, { backgroundColor: '#c9871e' }}
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
                        name={(user.nome.toUpperCase()) + (user.sobrenome.toUpperCase())}
                        age={user.estado}
                        location={user.cidade}
                        info1={'Cep: ' + (user.cep)}
                        info2={'Cidade: ' + (user.cidade)}
                        info3={'Rua: ' + (user.rua) + ' - ' + (user.numero)}
                        info4={('Telefone: ') + (user.telefone)}

                    />
                </Renderif>


                <View style={{ marginBottom: 20, marginTop: -20 }}>
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

                {user.idUsuario != date_Doacao.idAntigoDono &&
                    date_Doacao.dataDoacao == null ?
                    <View style={style.button}>
                        <TouchableOpacity
                            style={style.signIn}
                            onPress={() => { _enviar() }}
                        >
                            <LinearGradient
                                colors={['#ff9517', '#ff9517']}
                                style={style.signIn}
                            >
                                <Text style={[style.textSign, {
                                    color: '#fff'
                                }]}>Animal Doado</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View> : null

                }

            </ScrollView>
        </ImageBackground>
    );
};

export default editAnimalsDoacaoScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

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