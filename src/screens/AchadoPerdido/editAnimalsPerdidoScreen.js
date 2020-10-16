import React, { useState, useEffect } from 'react';
import styles from '../settings/styles';
import { useIsFocused } from '@react-navigation/native';
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
import { Spinner } from 'native-base';
import ProfileItem from '../../componets/ProfileItemPerdido';
import Server from '../settings/Server';
import CardStack, { Card } from 'react-native-card-stack-swiper';


const editAnimalsPerdidoScreen = ({ route, navigation, props }) => {

    const { date_Perdido } = route.params;
    const { user } = route.params;
    const [loadingPerdido, setLoadingPerdido] = useState(false);

    const [date, setData] = React.useState({
        detailperdido: date_Perdido,
        userPet: [],
        user: {},
        images: [],
        infDono: false
    });

    const [load, setLoad] = useState(true)

    useEffect(() => {
        getImagem();
        getUserPet();

        const url = Server.API_GET_PET_PERDIDO_ID + date_Perdido.idPerdido
        fetch(url)
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson) {
                    setData({
                        ...date,
                        detailperdido: responseJson
                    })
                    setLoadingPerdido(true)

                }
            })
            .catch(err => {
                console.log(err);
            });


        navigation.addListener('focus', () => setLoad(!load))
    }, [load, navigation])


    const getUserPet = () => {
        const url = Server.API_PET_DO_USUARIO + date_Perdido.idUsuario
        fetch(url)
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson) {
                    console.log("OI", responseJson)
                    setData({
                        ...date,
                        userPet: responseJson
                    })
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

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
        <>
            {loadingPerdido ?

                <ImageBackground
                    style={styles.bg, { backgroundColor: '#ebebeb' }}
                >
                    <ScrollView style={styles.containerProfile}>

                        {/* <CardStack
                    verticalSwipe={false}
                    // secondCardZoom={0.95}

                    style={{ flex: 1, resizeMode: "cover", width: 300, height: 400 }} ref={swiper => { swiper = swiper }}>
                    {date.images.map((item, index) => (
                        <Card key={index}>
                            <ImageBackground source={{ uri: item }} style={styles.photo}>
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
                </CardStack> */}


                        <ImageBackground source={{ uri: Server.API_PRINC + date.detailperdido.Animal.Galeria[0].url }} style={styles.photo}>
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
                                matches={'Detalhes Animal'}
                                name={date.detailperdido.Animal.nome.toUpperCase()}
                                age={date.detailperdido.estado}
                                location={date.detailperdido.cidade}
                                info1={'Raça: ' + (date.detailperdido.Animal.raca)}
                                info2={'Porte: ' + (date.detailperdido.Animal.porte)}
                                info3={(date.detailperdido.Animal.especie) + ' - ' + (date.detailperdido.Animal.sexo == 'M' ? 'Macho' : 'Fêmea')}
                                info4={('Filhote: ') + (date.detailperdido.Animal.filhote == '1' ? 'Sim' : 'Não')}
                                info5={('Descrição do local: ') + (date.detailperdido.descricao)}
                                info7={date.detailperdido}
                                iduser={user.idUsuario}
                                iduserPerdido={date.detailperdido.idUsuario}

                            />
                        </Renderif>
                        <Renderif test={date.infDono}>
                            <ProfileItem
                                navigation={navigation}
                                matches={'Detalhes do Dono'}
                                name={(date.userPet.nome) + ' ' + (date.userPet.sobrenome)}
                                age={date.userPet.estado}
                                location={date.userPet.cidade}
                                info1={'Cep: ' + (date.userPet.cep)}
                                info3={'Cidade: ' + (date.userPet.cidade)}
                                info2={'Rua: ' + (date.userPet.rua) + ' - ' + (date.userPet.numero)}
                                info3={('Telefone: ') + (date.userPet.telefone)}
                                info7={date.detailperdido}
                                iduser={user.idUsuario}
                                iduserPerdido={date.detailperdido.idUsuario}

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
                                            <FontAwesome name="info-circle" />   Ver informações do Dono
                         </Text>
                                    </TouchableOpacity>
                                    :

                                    <TouchableOpacity
                                        onPress={() => setData({
                                            ...date,
                                            infDono: false
                                        })}>
                                        <Text style={styles.matchesTextProfileItem}>
                                            <FontAwesome name="info-circle" />  Ver Informações do Animal
                                </Text>
                                    </TouchableOpacity>}

                            </View>
                        </View>

                    </ScrollView>
                </ImageBackground>
                : <Spinner color='#ff9517' />}
        </>
    );
};

export default editAnimalsPerdidoScreen;