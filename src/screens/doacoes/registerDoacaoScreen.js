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
import {
    Spinner
} from "native-base";
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { Col,  Grid } from "react-native-easy-grid";
import AsyncStorage from '@react-native-community/async-storage';
import { useTheme } from 'react-native-paper';
import Renderif from "../../componets/RenderIf";
import { Picker } from '@react-native-community/picker';
import Server from '../settings/Server';
import { useIsFocused } from "@react-navigation/native"


const registerDoadoScreen = ({ route, navigation }) => {

    const [data, setData] = React.useState({
        user: {},
        animalusuario: [],
        animalSelect: [],
        idanimal: "",
        selected: "key0",
        nameButton: 'Doar',
        disabledButton: false,
        isValidAnimal: true,
        check_Animal: false,
        loading: false
    });

    const { colors } = useTheme();
    const [load, setLoad] = useState(true)
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        AsyncStorage.getItem("User").then(userText => {
            const user = JSON.parse(userText);

            let url = Server.API_PET_DO_USUARIO + user.idUsuario + '/pets/doacao'
            fetch(url)
                .then(response => response.json())
                .then(responseJson => {
                    console.log(responseJson)
                    if (responseJson != null) {
                        setData({
                            ...data,
                            animalusuario: responseJson,
                            user: user,
                        });
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        });
        navigation.addListener('focus', () => setLoad(!load))
    }, [load, navigation]);


    const textInputChangeAnimal = (val) => {

        if (val) {
            setData({
                ...data,
                idanimal: val,
                loading: true

            });
            getAnimal(val)
        }
    }

    const isFocused = useIsFocused();

    useEffect(() => {
        setData({
            ...data,
            user: {},
            animalSelect: [],
            idanimal: "",
            selected: "key0",
            nameButton: 'Doar',
            disabledButton: false,
            isValidAnimal: true,
            check_Animal: false,
        })
    }, [isFocused]);



    const getAnimal = (value) => {
        console.log(value)
        let url =
            Server.API_ANIMAL +
            value
        fetch(url)
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson != null) {
                    
                    setData({
                        ...data,
                        animalSelect: responseJson,
                        loading: false
                    });
                }
            })
            .catch(error => {
                console.log(error);
            });
    };


    const _enviar = () => {
        setData({
            ...data,
            nameButton: 'Aguarde...',
            disabledButton: true
        })

        if (data.animalSelect != '') {

            let formdata = new FormData();

            formdata.append('idanimal', data.animalSelect.idAnimal)

            fetch(Server.API_INSERT_DOACAO, {
                method: "POST",
                'Content-Type': 'multipart/form-data',
                body: formdata
            }).then(response => response.json())
                .then(response => {
                    navigation.navigate("HomeAP")

                })

        } else {
            setData({
                ...data,
                nameButton: 'Doar',
                disabledButton: false
            })
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
                 <TouchableOpacity style={{ alignContent: 'center',  bottom: 85  }}
                    onPress={() => navigation.goBack()}>
                    <Image style={{ width: 40, height: 25, marginLeft:5}}
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
                <ScrollView style={{ width: "100%", marginBottom: -25 }}>
                    <Text style={styles.text_title}>Doar Animal</Text>

                    <Text style={[styles.text_footer, {
                        color: colors.text, marginTop: 30
                    }]}>Escolha seu animal</Text>
                    <View style={styles.action}>

                        <Picker
                            note
                            mode="dialog"
                            style={{ width: "100%", right: 7 }}
                            selectedValue={data.animalSelect.idAnimal}
                            onValueChange={textInputChangeAnimal.bind(this)}
                            placeholder={"Selecione..."}

                        >
                            <Picker.Item label="Selecione seu animal..." value="key0" />
                            {
                                data.animalusuario.map((item, index) =>
                                    <Picker.Item key={item.nome} label={item.nome} value={item.idAnimal} />
                                )
                            }

                        </Picker>

                        {data.check_Animal ?
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
                    {data.isValidAnimal ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Campo obrigatório.</Text>
                        </Animatable.View>
                    }

                    {!data.loading ?
                        <Renderif test={data.animalSelect != ""}>
                            <Text style={[styles.text_footer, {
                                color: colors.text
                            }]}>Nome</Text>
                            <View style={styles.action}>

                                <TextInput
                                    editable={false}
                                    value={data.animalSelect.nome}
                                    placeholderTextColor="#666666"
                                    style={[styles.textInput, {
                                        color: colors.text
                                    }]}
                                    autoCapitalize="none"
                              
                                />

                                <Animatable.View
                                    animation="bounceIn"
                                >
                                    <Feather
                                        name="check-circle"
                                        color="green"
                                        size={20}
                                    />
                                </Animatable.View>

                            </View>


                            {/* ========= Raça ========= */}


                            <Text style={[styles.text_footer, {
                                color: colors.text
                            }]}>Raça</Text>
                            <View style={styles.action}>

                                <TextInput
                                    editable={false}
                                    value={data.animalSelect.raca}
                                    placeholderTextColor="#666666"
                                    style={[styles.textInput, {
                                        color: colors.text
                                    }]}
                                    autoCapitalize="none"

                                //onEndEditing={(e) => handleValidNome(e.nativeEvent.text)}
                                />

                                <Animatable.View
                                    animation="bounceIn"
                                >
                                    <Feather
                                        name="check-circle"
                                        color="green"
                                        size={20}
                                    />
                                </Animatable.View>

                            </View>

                            {/* ========= Especie ========= */}



                            <Text style={[styles.text_footer, {
                                color: colors.text
                            }]}>Espécie</Text>
                            <View style={styles.action}>

                                <TextInput
                                    editable={false}
                                    value={data.animalSelect.especie}
                                    placeholderTextColor="#666666"
                                    style={[styles.textInput, {
                                        color: colors.text
                                    }]}
                                    autoCapitalize="none"
                                />

                                <Animatable.View
                                    animation="bounceIn"
                                >
                                    <Feather
                                        name="check-circle"
                                        color="green"
                                        size={20}
                                    />
                                </Animatable.View>

                            </View>

                            {/* ===============  SEXO ============= */}

                            <Text style={[styles.text_footer, {
                                color: colors.text,
                                marginTop: 35
                            }]}>Sexo</Text>

                            <View style={styles.action}>
                                <Grid>
                                    <Col style={{ left: 110 }}>
                                        <TouchableOpacity>
                                            <FontAwesome name={"mars"} style={{ fontSize: 40 }} color=
                                                {data.animalSelect.sexo == "M" ? color = "#0101f7" : color = "#999"} />
                                            <Text style={styles.fontSexo}> M </Text>
                                        </TouchableOpacity>
                                    </Col>

                                    <Col>
                                        <TouchableOpacity>
                                            <FontAwesome name={"venus"} style={{ fontSize: 40 }} color=
                                                {data.animalSelect.sexo == "F" ? color = "#f702a5" : color = "#999"} />
                                            <Text style={styles.fontSexo}>  F </Text>
                                        </TouchableOpacity>
                                    </Col>
                                </Grid>
                            </View>

                            <View style={styles.button}>

                                <TouchableOpacity
                                    disabled={!data.disabledButton ? false : true}
                                    style={styles.signIn}
                                    onPress={() => _enviar()}

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
                        </Renderif>
                        : <Spinner color='#ff9517' />}
                </ScrollView>
            </Animatable.View>

        </View>
    );
};

export default registerDoadoScreen;


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
        marginTop: 20

    },
    text_title: {
        color: 'black', 
        textAlign: 'center',
        fontSize:20,
        marginBottom:20
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