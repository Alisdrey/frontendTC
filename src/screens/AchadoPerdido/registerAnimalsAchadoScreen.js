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
    SafeAreaView,
    Dimensions
} from 'react-native';
import {
    Thumbnail, Textarea,
} from "native-base";
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { Col, Row, Grid } from "react-native-easy-grid";
import AsyncStorage from '@react-native-community/async-storage';
import { useTheme } from 'react-native-paper';
import Renderif from "../../componets/RenderIf";
import { Picker } from '@react-native-community/picker';
import Server from '../settings/Server';


const registerAnimalsAchadoScreen = ({ route, navigation }) => {


    const [data, setData] = React.useState({
        user: {},
        descricaolocal: "",
        descricaoanimal: "",
        estado: "",
        cidade: "",
        acolhido: [],
        selected: "key0",

        isValidAnimal: true,
        check_Animal: false,
        isValidLocal: true,
        check_Local: false,
        isValidCidade: true,
        check_Cidade: false,
        isValidEstado: true,
        check_Estado: false,
        isValidAcolhido: true,
        check_Acolhido: false,
        isloading: true,

    });


    const [cidade, setCidade] = useState([]);
    const [estado, setEstado] = useState([]);


    const { colors } = useTheme();


    useEffect(() => {

        AsyncStorage.getItem("User").then(userText => {
            const user = JSON.parse(userText);

            let url = Server.API_PET_DO_USUARIO + user.idUsuario + '/pets'
            fetch(url)
                .then(response => response.json())
                .then(responseJson => {
                   
                    if (responseJson != null) {
                        setData({
                            ...data,
                            animalusuario: responseJson,
                            user: user,
                        });

                        if (user.cidade != "") {
                            setCidade(user.cidade);
                            // setData({
                            //     ...data,
                            //     check_Cidade: true,
                            //     isValidCidade: true
                            // })
                        }

                        if (user.estado != "") {
                            setEstado(user.estado);
                            // setData({
                            //     ...data,
                            //     check_Estado: true,
                            //     isValidEstado: true
                            // })
                        }
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        });
    }, []);


    const textInputChangeAnimal = (val) => {
        if (val.trim().length > 0) {

            setData({
                ...data,
                descricaoanimal: val,
                check_Animal: true,
                isValidAnimal: true
            });
        } else {
            setData({
                ...data,
                check_Animal: false,
                isValidAnimal: false
            });
        }
    }

    const textInputChangeLocal = (val) => {

        if (val.trim().length > 0) {

            setData({
                ...data,
                descricaolocal: val,
                check_Local: true,
                isValidLocal: true
            });
        } else {
            setData({
                ...data,
                check_Local: false,
                isValidLocal: false
            });
        }
    }

    const textInputChangeCidade = (val) => {
        if (val.trim().length >= 0) {
            setCidade(val);
            setData({
                ...data,
                check_Cidade: true,
                isValidCidade: true
            })
        } else {
            setData({
                ...data,
                check_Cidade: false,
                isValidCidade: false
            });
        }

    }

    const textInputChangeEstado = (val) => {
        if (val.trim().length >= 0) {
            setEstado(val);
            setData({
                ...data,
                isValidEstado: true
            })
           
        } else {
            setData({
                ...data,
                isValidEstado: false
            });
        }
    }

    const textInputChangeAcolhido = (val) => {
        if (val) {
            setData({
                ...data,
                acolhido: val,
            });
        } else {
            setData({
                ...data,
                acolhido: '',
            });
        }
    }

    const _enviar = () => {
        console.log("data",data)
        if (data.descricaolocal != '' && data.descricaoanimal != '' &&
            cidade != '' && estado != '' && data.acolhido != '') {
            navigation.navigate(
                "registerPhotoAnimalsAchado"
                , {
                    idusuario: data.user.idUsuario,
                    descricaolocal: data.descricaolocal,
                    descricaoanimal: data.descricaoanimal,
                    cidade: cidade,
                    estado: estado,
                    acolhido: data.acolhido
                })
        } else {
            Alert.alert(
                "Campos vazios",
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

        navigation.addListener ('focus', () =>{
            setData({
                ...data,
                    descricaolocal: '',
                    descricaoanimal: '',
                    acolhido: []
            })
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
                    }]}>Cidade</Text>
                    <View style={styles.action}>

                        <TextInput
                            value={String(cidade || '')}
                            placeholder="Informe a cidade"
                            placeholderTextColor="#666666"
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            autoCapitalize="none"
                            onChangeText={(val) => textInputChangeCidade(val)}
                        />
                        {data.check_Cidade ?
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
                    {data.isValidCidade ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Campo obrigatório.</Text>
                        </Animatable.View>
                    }

                    {/* ========= Estado ========= */}


                    <Text style={[styles.text_footer, {
                        color: colors.text
                    }]}>Estado</Text>
                    <View style={styles.action}>

                        <TextInput
                            value={String(estado || '')}
                            placeholder="Informe o estado"
                            placeholderTextColor="#666666"
                            style={[styles.textInput, {
                                color: colors.text, marginBottom: 0
                            }]}
                            autoCapitalize="none"
                            onChangeText={(val) => textInputChangeEstado(val)}
                        />
                        {data.check_Estado ?
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
                    {data.isValidEstado ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Campo obrigatório.</Text>
                        </Animatable.View>
                    }

                    {/* ========= Descrição ========= */}

                    <Text style={[styles.text_footer, {
                        color: colors.text
                    }]}>Descrição do Animal</Text>

                    <View style={styles.action}>

                        <Text></Text>
                        <View style={{ flex: 1, flexDirection: 'column' }}>

                            <Textarea style={{ height: 90, marginBottom: 10 }}
                                placeholder="Informe uma descrição detalhada do animal."
                                onChangeText={(val) => textInputChangeAnimal(val)}
                                rowSpan={2}
                                bordered
                            />
                        </View>

                        {data.check_Animal ?
                            <Animatable.View
                                animation="bounceIn"
                            >
                                <Feather
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                    style={{ padding: 5 }}
                                />
                            </Animatable.View>
                            : null}
                    </View>
                    {data.isValidAnimal ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Campo obrigatório.</Text>
                        </Animatable.View>
                    }


                    <Text style={[styles.text_footer, {
                        color: colors.text, bottom: 2
                    }]}>Descrição do Local</Text>


                    <View style={styles.action}>

                        <Text></Text>
                        <View style={{ flex: 1, flexDirection: 'column' }}>

                            <Textarea style={{ height: 90, }}
                                placeholder="Informe uma descrição detalhada de onde foi encontrado o animal."
                                onChangeText={(val) => textInputChangeLocal(val)}
                                rowSpan={2}
                                bordered
                            />
                        </View>

                        {data.check_Local ?
                            <Animatable.View
                                animation="bounceIn"
                            >
                                <Feather
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                    style={{ padding: 5 }}
                                />
                            </Animatable.View>
                            : null}
                    </View>
                    {data.isValidLocal ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Campo obrigatório.</Text>
                        </Animatable.View>
                    }


                    <Text style={[styles.text_footer, {
                        color: colors.text, marginTop: 10
                    }]}>Animal Acolhido</Text>
                    <View style={styles.action}>

                        <Picker
                            note
                            mode="dialog"
                            style={{ width: "100%" }}
                            selectedValue={data.acolhido}
                            onValueChange={textInputChangeAcolhido.bind(this)}
                            placeholder={"Selecione..."}

                        >
                            <Picker.Item label="Selecione..." value="Key0" />

                            <Picker.Item label="Sim" value="1" />

                            <Picker.Item label="Não" value="0" />

                        </Picker>

                        {data.check_Acolhido ?
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
                    {data.isValidAcolhido ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Campo obrigatório.</Text>
                        </Animatable.View>
                    }

                    <View style={styles.button}>

                        <TouchableOpacity
                            style={styles.signIn}
                            onPress={() => _enviar()}

                        >
                            <LinearGradient
                                colors={['#ff9517', '#ff9517']}
                                style={styles.signIn}
                            >
                                <Text style={[styles.textSign, {
                                    color: '#fff'
                                }]}>Próximo</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Animatable.View>

        </View>
    );
};

export default registerAnimalsAchadoScreen;

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
        paddingLeft: 0,
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