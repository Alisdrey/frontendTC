import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Platform,
    StyleSheet,
    StatusBar,
    ScrollView,
    Dimensions,
    Image
} from 'react-native';
import {Textarea} from "native-base";
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from 'react-native-paper';
import Server from '../settings/Server';


const updatePerdidoScreen = ({ route, navigation, props }) => {

    const { date_Achado } = route.params;
    const [data, setData] = React.useState({
        date_Achado: date_Achado,
        descricaoAnimal: date_Achado.descricaoAnimal,
        descricaoLocal: date_Achado.descricaoLocal,
        isValidDescricao: true,
        check_Descricao: false,
        isloading: true,
        nameButton: 'Editar',
        disabledButton: false,

    });

    const { colors } = useTheme();

    const _enviar = () => {

        setData({
            ...data,
            nameButton: 'Editando...',
            disabledButton: true
        })

        let formdata = new FormData();

        formdata.append('idAchado', data.date_Achado.idAchado)
        formdata.append('idusuario', data.date_Achado.idUsuario)
        formdata.append('descricaoLocal', data.descricaoLocal)
        formdata.append('descricaoAnimal', data.descricaoAnimal)
        formdata.append('estado', data.date_Achado.estado)
        formdata.append('cidade', data.date_Achado.cidade)
        formdata.append('acolhido', data.date_Achado.acolhido)
        formdata.append('status', data.date_Achado.status)
        formdata.append('file', null)

        fetch(Server.API_EDITAR_ACHADO, {
            method: "POST",
            'Content-Type': 'multipart/form-data',
            body: formdata
        }).then(response => response.json())
            .then(response => {
                setData({
                    ...data,
                    nameButton: 'Editar',
                    disabledButton: false
                })
                navigation.navigate("editAnimalAchado", {
                    date_Achado: date_Achado
                })
            })
            
    }


    const textInputChangeDescricaoLocal = (val) => {
        setData({
            ...data,
            descricaoLocal: val,
        });
    }

    const textInputChangeAnimal = (val) => {
        setData({
            ...data,
            descricaoAnimal: val,
        });
    }

    return (

        <View style={styles.container}>
            <StatusBar backgroundColor='#323a4e' barStyle="light-content" />
            <View style={styles.header}>
                <Animatable.Image
                    animation="bounceIn"
                    duraton="1500"
                    source={require('../../source/logo.png')}
                    style={styles.logo}
                />
                <TouchableOpacity style={{ alignContent: 'center', bottom: 85 }}
                    onPress={() => navigation.goBack()}>
                    <Image style={{ width: 40, height: 25, marginLeft: 5 }}
                        source={require('../../source/arrow.png')}
                        resizeMode='contain' />
                </TouchableOpacity>
            </View>


            <Animatable.View
                animation="fadeInUpBig"
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}
            >
                <ScrollView style={{ width: "100%", marginBottom: -25 }} keyboardShouldPersistTaps={'handled'}>

                    {/* ========= Descrição ========= */}

                    <Text style={styles.text_title}>Editar Achado</Text>
                    <Text style={[styles.text_footer, {
                        color: colors.text, marginTop: 0
                    }]}>Descrição do Local</Text>

                    <View style={styles.action}>

                        <Text></Text>
                        <View style={{ flex: 1, flexDirection: 'column' }}>

                            <Textarea style={{ height: 90 }}
                                //placeholder={data.date_Achado.descricaoLocal}
                                value={data.descricaoLocal}
                                onChangeText={(val) => textInputChangeDescricaoLocal(val)}
                                rowSpan={2}
                                bordered
                            />
                        </View>

                    </View>


                    <Text style={[styles.text_footer, {
                        color: colors.text, marginTop: 20
                    }]}>Descrição do Animal</Text>

                    <View style={styles.action}>

                        <Text></Text>
                        <View style={{ flex: 1, flexDirection: 'column' }}>

                            <Textarea style={{ height: 90 }}
                                //placeholder={data.date_Achado.descricaoAnimal}
                                value={data.descricaoAnimal}
                                onChangeText={(val) => textInputChangeAnimal(val)}
                                rowSpan={2}
                                bordered
                            />
                        </View>

                    </View>


                    <View style={styles.button}>

                        <TouchableOpacity
                            disabled={!data.disabledButton ? false : true}
                            style={styles.signIn}
                            onPress={() => { _enviar() }}

                        >
                            <LinearGradient
                                colors={['#ff9517', '#ff9517']}
                                style={styles.signIn}
                            >
                                <Text style={[styles.textSign, {
                                    color: '#fff'
                                }]}>{data.nameButton}</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Animatable.View>
        </View>
    );
};

export default updatePerdidoScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#323a4e'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 20
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: "white",
        fontSize: 14,
        marginTop: 10,
        textAlign: "center",
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18,
        marginTop: 30
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    text_title: {
        color: 'black', 
        textAlign: 'center',
        fontSize:20,
        marginBottom:20
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 20
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    etapa: {
        fontSize: 12,
        paddingBottom: 5,
        color: "white"
    },

    fontSexo: {
        fontSize: 14,
        marginTop: 10
    },


    logo: {
        flex: 1,
        top: 10,
        width: null,
        height: null,
        resizeMode: 'contain'
    },

});