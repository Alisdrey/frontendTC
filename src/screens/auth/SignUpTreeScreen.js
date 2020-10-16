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
    Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from 'react-native-paper';
import Server from '../settings/Server';
import AsyncStorage from '@react-native-community/async-storage';


const SignUpTreeScreen = ({ route, navigation}) => {

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
        buttonDisable: true,
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
        nameButton: 'Próximo',
        disabledButton: false,
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,

    });

    const { colors } = useTheme()

    useEffect(() => {
        if (data.username.trim().length >= 4 && data.password.trim().length >= 8) {
            setData({
                ...data,
                buttonDisable: false
            });
        } else {
            setData({
                ...data,
                buttonDisable: true
            });
        }
    }, [data.username, data.password]);

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
     
        setData({
            ...data,
            nameButton:'Aguarde...',
            disabledButton: true,
            buttonDisable: true
        })

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
                
            }).then(val => { _login()  })
        } else {

            setData({
                ...data,
                nameButton:'Próximo...',
                disabledButton: false
            })
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


    const _login = () => {
        setData({
            ...data,
            nameButton:'Aguarde...',
            disabledButton: true,
            buttonDisable: true
        })
        if (data.username != "" && data.password != "") {
          
            const url = Server.API +
                data.username +
                "/" +
                data.password

            fetch(url)
                .then(response => response.json())
                .then(responseJson => {
                    if (responseJson.success != "false") {
                        AsyncStorage.setItem(
                            "User",
                            JSON.stringify(responseJson)
                        ).then(() => {

                            navigation.navigate("FormRecommends");
                        });

                    } else {
                        setData({
                            ...data,
                            nameButton:'Próximo...',
                            disabledButton: false
                        })
                        Alert.alert(
                            "Nome ou senha de usuário incorreto",
                            "O nome de usuário ou senha não parece pertencer a uma conta. Verifique seus dados e tente novamente. ",
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
                })
                .catch(err => {
                    console.log(err);
                });
        } else {

            Alert.alert(
                "Nome ou senha vazios",
                "Preencha todos os campos e tente novamente. ",
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
            <StatusBar backgroundColor='#323a4e' barStyle="light-content" />
                <View style={styles.header}>
                <TouchableOpacity style={{ alignContent: 'center',  bottom: 5  }}
                    onPress={() => navigation.goBack()}>
                    <Image style={{ width: 25, height: 25, marginLeft: 5}}
                        source={require('../../source/arrow.png')}
                        resizeMode='contain' />
                </TouchableOpacity>
                <Text style={styles.text_header}> Falta pouco! {"\n"}Informe um login e senha para acesso ao aplicativo ;D</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
                <Text style={styles.etapa}>3/4</Text>
            </View>
                <Animatable.View
                    animation="fadeInUpBig"
                    style={[styles.footer, {
                        backgroundColor: colors.background
                    }]}
                >

            <ScrollView style={{ width: "100%", marginBottom: -25 }} keyboardShouldPersistTaps={'handled'}>

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
                            disabled={data.buttonDisable ? true : false}
                            style={styles.signIn}
                            onPress={() => { loginHandle() }}
                        >
                            <LinearGradient
                                  colors={data.buttonDisable ?
                                    ['#8a92a8', '#8a92a8'] :
                                    ['#ff9517', '#ff9517']}
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

export default SignUpTreeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#323a4e'
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
        alignItems: 'center',
        marginTop: 160,
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