import React, { useState, useEffect } from 'react';
import styles from '../settings/styles';

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

    const [date, setData] = React.useState({
        detailachado: date_Achado,
        user: {}
    });

    useEffect(() => {
        AsyncStorage.getItem("User").then(userText => {
            const user = JSON.parse(userText);
            setData({
                ...date,
                user: user,
            });
        });

    }, []);


    return (

        <ImageBackground
            style={styles.bg, { backgroundColor: '#c9871e', height:"100%" }}
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

                <ProfileItem
                    navigation={navigation}
                    matches={'Detalhes'}
                    name={'AJUDE A ENCONTRAR :('}
                    age={date.detailachado.estado}
                    location={date.detailachado.cidade}
                    info5={('Descrição do local: ') + (date.detailachado.descricaoLocal)}
                    info6={('Descrição do animal: ') + (date.detailachado.descricaoAnimal)}
                    info7={date.detailachado}
                    iduser={date.detailachado.idUsuario}
                    iduserPerdido={date.user.idUsuario}
                />

                {/* <View style={styles.actionsProfile}>
                    <TouchableOpacity style={styles.circledButton}>
                        <Text style={styles.iconButton}>
                            <Icon name="optionsH" />
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.roundedButton}>
                        <Text style={styles.iconButton}>
                            <Icon name="chat" />
                        </Text>
                        <Text style={styles.textButton}>Start chatting</Text>
                    </TouchableOpacity>
                </View> */}
            </ScrollView>
        </ImageBackground>
    );
};

export default editAnimalsAchadoScreen;