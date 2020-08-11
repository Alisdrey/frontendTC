import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Alert,
    ScrollView,
    PermissionsAndroid,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { Col, Row, Grid } from "react-native-easy-grid";
import Geolocation from 'react-native-geolocation-service';
import { useTheme } from 'react-native-paper';
import Server from '../settings/Server';

const SignUpTreeScreen = ({ route, navigation }) => {

    const { nome } = route.params;
    const { sobrenome } = route.params;
    const { sexo } = route.params;
    const { nascimento } = route.params;
    const { telefone } = route.params;

    const { rua } = route.params;
    const { numero } = route.params;
    const { bairro } = route.params;
    const { cidade } = route.params;
    const { uf } = route.params;
    const { cep } = route.params;


    const [data, setData] = React.useState({
        nome: nome,
        sobrenome: sobrenome,
        sexo: sexo,
        nascimento: nascimento,
        telefone: telefone,

        rua: rua,
        numero: numero,
        bairro: bairro,
        cidade: cidade,
        uf: uf,
        cep: cep,

        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,

    });

    const { colors } = useTheme()

    const textInputChange = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if( val.trim().length >= 8 ) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                isValidPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const handleValidUser = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }

    const loginHandle = () => {
        if (data.username != "" && data.password != "") {
          
            let formdata = new FormData();
        
            formdata.append('login', data.username)
            formdata.append('senha', data.password)
            formdata.append('nome', data.nome)
            formdata.append('sobrenome', data.sobrenome)
            formdata.append('sexo', data.sexo)
            formdata.append('nascimento', data.nascimento)
            formdata.append('rua', data.rua)
            formdata.append('numero',data.numero)
            formdata.append('bairro', data.bairro)
            formdata.append('cidade', data.cidade)
            formdata.append('estado', data.uf)
            formdata.append('cep', data.cep)
            formdata.append('telefone', data.telefone)
            console.log(formdata)
            fetch(Server.API_INSERIR_USER, {
                method: "POST",
                'Content-Type': 'multipart/form-data',
                body: formdata
                
            }).then(val => {
            console.log(val)

                Alert.alert(
                    "Êxito",
                    "Cadastro realizado com sucesso",
                    [
                        {
                            text: "OK",
                            onPress: () =>
                                navigation.navigate("SignIn"),
                            style: "default"
                        },
                    ],
                    { cancelable: false }
                )
            })
        } else {
            Alert.alert(
                "Ação Bloqueada",
                "Senhas não conferem, verifique e tente novamente.",
                [
                    {
                        text: "OK",
                        onPress: () =>
                            console.log("cancel"),
                        style: "default"
                    },
                ],
                { cancelable: false }
            )
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content" />
                <View style={styles.header}>
                <Text style={styles.text_header}> Falta pouco! {"\n"}Informe um login e senha para acesso ao aplicativo ;D</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
                <Text style={styles.etapa}>3/3</Text>
            </View>

            <Animatable.View
                animation="fadeInUpBig"
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}
            >
                <Text style={[styles.text_footer, {
                    color: colors.text
                }]}>Usuário</Text>
                <View style={styles.action}>
                    <MaterialIcons
                        name="person"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        placeholder="Seu usuário"
                        placeholderTextColor="#666666"
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        onChangeText={(val) => textInputChange(val)}
                        onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                    />
                    {data.check_textInputChange ?
                        <Animatable.View
                            animation="bounceIn"
                        >
                            <Feather
                                name="check-circle"
                                color="green"
                                size={20}
                            />
                        </Animatable.View>
                        : null}
                </View>
                {data.isValidUser ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>O nome de usuário deve ter 4 caracteres.</Text>
                    </Animatable.View>
                }


                <Text style={[styles.text_footer, {
                    color: colors.text,
                    marginTop: 35
                }]}>Senha</Text>
                <View style={styles.action}>
                    <Feather
                        name="lock"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        placeholder="Sua senha"
                        placeholderTextColor="#666666"
                        secureTextEntry={data.secureTextEntry ? true : false}
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        onChangeText={(val) => handlePasswordChange(val)}
                    />
                    <TouchableOpacity
                        onPress={updateSecureTextEntry}
                    >
                        {data.secureTextEntry ?
                            <Feather
                                name="eye-off"
                                color="grey"
                                size={20}
                            />
                            :
                            <Feather
                                name="eye"
                                color="grey"
                                size={20}
                            />
                        }
                    </TouchableOpacity>
                </View>
                {data.isValidPassword ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>A senha deve conter pelo menos 8 caracteres.</Text>
                    </Animatable.View>
                }


                <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.signIn}
                        onPress={() => { loginHandle() }}
                    >
                        <LinearGradient
                            colors={['#08d4c4', '#01ab9d']}
                            style={styles.signIn}
                        >
                            <Text style={[styles.textSign, {
                                color: '#fff'
                            }]}>Cadastrar</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                </View>
            </Animatable.View>
        </View>
    );
};

export default SignUpTreeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 4
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
        margin: 20,
        textAlign: "center",
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
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
        position: 'absolute',
        padding: "6%",
        flex:1,
        left: 0,
        right: 0,
        bottom: 10,
        flexDirection:'row',
        height:80,
        alignItems:'center',
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
    }
});