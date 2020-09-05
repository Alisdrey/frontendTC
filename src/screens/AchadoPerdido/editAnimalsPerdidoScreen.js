import React, { useState, useEffect } from 'react';
import styles from '../settings/styles';
import { useIsFocused } from '@react-navigation/native';

import {
    ScrollView,
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Image
} from 'react-native';
import ProfileItem from '../../componets/ProfileItemPerdido';
import Icon from '../../componets/Icon';
import Server from '../settings/Server';
import CardStack, { Card } from 'react-native-card-stack-swiper';

const editAnimalsPerdidoScreen = ({ route, navigation, props }) => {

    const { date_Perdido } = route.params;

    const [date, setData] = React.useState({
        detailperdido: date_Perdido,
        images: []
    });

    useEffect(() => {
    
        getImagem();
    
      }, []);


     const getImagem = () => {
        var imagem = [];
        for (let i = 0; i < date.detailperdido.Animal.Galeria.length; i++) {
            imagem[i] = 'https://petworld.marinamendesacademy.com.br/' + date.detailperdido.Animal.Galeria[i].url
        }

       setData({
            ...date,
            images: imagem
        })
     }
const isFocused = useIsFocused();

    return (

        <ImageBackground 
            style={styles.bg, { backgroundColor: '#c9871e' }}
        >
            <ScrollView style={styles.containerProfile}>
          
            <CardStack
            verticalSwipe={false}
            // secondCardZoom={0.95}
            
             style={{flex: 1,resizeMode: "cover", width: 300,height:400}} ref={swiper => { swiper = swiper }}>
             {date.images.map((item, index) => (
             <Card key={index}>
               <ImageBackground source={{ uri:  item }} style={styles.photo}>
                    <View style={styles.top}>
                        <TouchableOpacity style={{ flexDirection: 'row', alignContent: 'center' }}
                            onPress={() => navigation.goBack()}>
                            <Image style={{ width: 25, height: 25, marginLeft: 5, bottom: 20 }}
                                source={require('../../source/arrow.png')}
                                resizeMode='contain' />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
                </Card>
                 ))}
            </CardStack> 
 
{/* 
                <ImageBackground source={{ uri: Server.API_PRINC + date.detailperdido.Animal.Galeria[0].url }} style={styles.photo}>
                    <View style={styles.top}>
                        <TouchableOpacity style={{ flexDirection: 'row', alignContent: 'center' }}
                            onPress={() => navigation.goBack()}>
                            <Image style={{ width: 25, height: 25, marginLeft: 5, bottom: 20 }}
                                source={require('../../source/arrow.png')}
                                resizeMode='contain' />
                        </TouchableOpacity>
                    </View>
                </ImageBackground> */}

                <ProfileItem
                    navigation={navigation}
                    matches={'Detalhes'}
                    name={date.detailperdido.Animal.nome.toUpperCase()}
                    age={date.detailperdido.estado}
                    location={date.detailperdido.cidade}
                    info1={'Raça: ' + (date.detailperdido.Animal.raca)}
                    info2={'Porte: ' + (date.detailperdido.Animal.porte)}
                    info3={(date.detailperdido.Animal.especie) + ' - ' + (date.detailperdido.Animal.sexo == 'M' ? 'Macho' : 'Fêmea')}
                    info4={('Filhote: ') + (date.detailperdido.Animal.filhote == '1' ? 'Sim' : 'Não')}
                    info5={('Descrição do local: ') + (date.detailperdido.descricao)}
                    info7={date.detailperdido}

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

export default editAnimalsPerdidoScreen;