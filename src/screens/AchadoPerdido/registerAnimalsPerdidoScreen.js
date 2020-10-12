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
    Dimensions,
    Image
} from 'react-native';
import {Textarea} from "native-base";
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';
import { useTheme } from 'react-native-paper';
import { Picker } from '@react-native-community/picker';
import Server from '../settings/Server';


const RegisterAnimalPerdidoScreen = ({ route, navigation }) => {


    const [data, setData] = React.useState({
        user: {},
        animalusuario: [],
        idanimal: "",
        estado: "",
        cidade: "",
        descricao: "",
        selected: "key0",
        nameButton: 'Cadastrar',

        isValidAnimal: true,
        isValidDescricao: true,
        isValidCidade: true,
        isValidEstado: true,
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
                    console.log(responseJson)
                    if (responseJson != null) {
                        setData({
                            ...data,
                            animalusuario: responseJson,
                            user: user,
                        });

                        if (user.cidade != "" ) {
                            setCidade(user.cidade);
                        }

                        if (user.estado != "") {
                            setEstado(user.estado);
                        }
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        });
    }, []);



    const _enviar = () => {       

        if (data.idanimal != '' && data.descricao != '' &&
            data.cor != '' && cidade != '' && estado != '' ) {

            setData({
                ...data,
                nameButton:'Cadastrando...'
            })

            let formdata = new FormData();

            formdata.append('idusuario', data.user.idUsuario)
            formdata.append('idanimal', data.idanimal)
            formdata.append('cidade', cidade)
            formdata.append('estado', estado)
            formdata.append('descricao', data.descricao)
            console.log(formdata)


            fetch(Server.API_INSERIR_PET_PERDIDO, {
                method: "POST",
                'Content-Type': 'multipart/form-data',
                body: formdata
            }).then(response => response.json())
                .then(response => {
                    console.log("erro", response)
                    navigation.navigate("HomeAP")

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
    }

    const textInputChangeAnimal = (val) => {
        console.log(val)
        if (val) {

            setData({
                ...data,
                idanimal: val,
                isValidAnimal: true
            });
        } else {
            setData({
                ...data,
                idanimal: '',
                isValidAnimal: false
            });
        }
    }

    const textInputChangeDescricao = (val) => {

        if (val.trim().length >= 0) {

            setData({
                ...data,
                descricao: val,
                isValidDescricao: true
            });
        } else {
            setData({
                ...data,
                isValidDescricao: false
            });
        }
    }

    const textInputChangeCidade = (val) => {
        if (val.trim().length >= 0) {
            setCidade(val);
        } else {
            setData({
                ...data,
                isValidCidade: false
            });
        }
      
    }

    const textInputChangeEstado = (val) => {
        if (val.trim().length >= 0) {
           setEstado(val);
        } else {
            setData({
                ...data,
                isValidEstado: false
            });
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

                // resizeMode="contain"
                />
                <TouchableOpacity style={{ flexDirection: 'row', alignContent: 'center' }}
                    onPress={() => navigation.goBack()}>
                    <Image style={{ width: 80, height: 25, bottom: 90 }}
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

                    <Text style={[styles.text_footer, {
                        color: colors.text, marginTop: 10
                    }]}>Escolha seu animal</Text>
                    <View style={styles.action}>
                        <Picker
                            note
                            mode="dialog"
                            style={{ width: "100%" }}
                            selectedValue={data.idanimal}
                            onValueChange={textInputChangeAnimal.bind(this)}
                            placeholder={"Selecione..."}

                        >
                            <Picker.Item style={{ fontSize: 12 }} label="Selecione seu animal..."  />
                            {
                                data.animalusuario.map((item, index) =>
                                    <Picker.Item key={index} label={item.nome} value={item.idAnimal} />
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
                        //onEndEditing={(e) => handleValidNome(e.nativeEvent.text)}
                        />
                      
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
                                color: colors.text
                            }]}
                            autoCapitalize="none"
                            onChangeText={(val) => textInputChangeEstado(val)}
                        />
                       
                    </View>
                    {data.isValidEstado ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Campo obrigatório.</Text>
                        </Animatable.View>
                    }

                    {/* ========= Descrição ========= */}

                    <Text style={[styles.text_footer, {
                        color: colors.text, marginTop: 0
                    }]}>Descrição do Local</Text>


                    <View style={styles.action}>

                        <Text></Text>
                        <View style={{ flex: 1, flexDirection: 'column' }}>

                            <Textarea style={{ height: 90 }}
                                placeholder="Informe uma descrição detalhada de onde foi perdido seu animalzinho."
                                //value={this.state.descricao}
                                onChangeText={(val) => textInputChangeDescricao(val)}
                                rowSpan={2}
                                bordered
                            />
                        </View>

                    </View>
                    {data.isValidDescricao ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Campo obrigatório.</Text>
                        </Animatable.View>
                    }

                    <View style={styles.button}>

                        <TouchableOpacity
                            style={styles.signIn}
                            onPress={() =>  _enviar() }

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

export default RegisterAnimalPerdidoScreen;

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
        marginTop: 10
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