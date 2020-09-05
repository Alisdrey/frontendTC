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
import ProfileItem from '../../componets/ProfileItemDoacao';
import Icon from '../../componets/Icon';
import Server from '../settings/Server';

const editAnimalsDoacaoScreen = ({ route, navigation, props }) => {

    const { date_Doacao } = route.params;

    const [date, setData] = React.useState({
        detailDoacao: date_Doacao
    });

    useEffect(() => {

    }, []);

    return (

        <ImageBackground
            style={styles.bg, { backgroundColor: '#c9871e' }}
        >
            <ScrollView style={styles.containerProfile}>
                <ImageBackground source={{ uri: Server.API_PRINC + date.detailDoacao.Animal.Galeria[0].url }} style={styles.photo}>
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
                    matches={'Detalhes'}
                    name={date.detailDoacao.Animal.nome.toUpperCase()}
                    age={'Não compre amor'}
                    location={'adote e faça um animalzinho feliz.'}
                    info1={'Raça: ' + (date.detailDoacao.Animal.raca)}
                    info2={'Porte: ' + (date.detailDoacao.Animal.porte)}
                    info3={(date.detailDoacao.Animal.especie) + ' - ' + (date.detailDoacao.Animal.sexo == 'M' ? 'Macho' : 'Fêmea')}
                    info4={('Filhote: ') + (date.detailDoacao.Animal.filhote == '1' ? 'Sim' : 'Não')}
                    info5={('Descrição do local: ') + (date.detailDoacao.descricao)}

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

export default editAnimalsDoacaoScreen;