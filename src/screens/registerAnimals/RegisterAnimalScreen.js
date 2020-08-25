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
    Thumbnail
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


const RegisterAnimalScreen = ({ route, navigation }) => {


    const [data, setData] = React.useState({
        user: {},
        nome: "",
        raca: "",
        cor: "",
        sexo: "",
        especie: "",
        outraEspecie: "",
        pelo: "",
        porte: "",
        filhote: "",

        isValidNome: true,
        check_Nome: false,
        isValidRaca: true,
        check_Raca: false,
        isValidCor: true,
        check_Cor: false,
        isValidSexo: true,
        check_Sexo: false,
        isValidEspecie: true,
        check_Especie: false,
        isValidPelo: true,
        check_Pelo: false,
        isValidPorte: true,
        check_Porte: false,
        isValidFilhote: true,
        check_Filhote: false,
        isloading: true,

    });

    const { colors } = useTheme();

    useEffect(() => {
        AsyncStorage.getItem("User").then(userText => {
            const user = JSON.parse(userText);
            setData({
                ...data,
                user: user,
            });
        });

    }, []);

 
    const _enviar = () => {

    if( data.nome != '' && data.raca != '' && 
        data.cor != '' && data.sexo != '' &&
        data.especie != '' && data.porte != '' &&
        data.pelo != '' && data.filhote != '') {

        let formdata = new FormData();

        formdata.append('idusuario', data.user.idUsuario)
        formdata.append('nome', data.nome)
        formdata.append('especie', data.especie)
        formdata.append('raca', data.raca)
        formdata.append('sexo', data.sexo)
        formdata.append('cor', data.cor)
        formdata.append('pelo', data.pelo)
        formdata.append('porte', data.porte)
        formdata.append('filhote', data.filhote)

        fetch(Server.API_INSERT_ANIMAL, {
            method: "POST",
            'Content-Type': 'multipart/form-data',
            body: formdata
        }).then(response => response.json())
            .then(response => {
                navigation.navigate("RegisterPhotoAnimals", {
                    idanimal: response.idAnimal
                })

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

    const textInputChangeNome = (val) => {

        if (val.trim().length > 0) {

            setData({
                ...data,
                nome: val,
                check_Nome: true,
                isValidNome: true
            });
        } else {
            setData({
                ...data,
                check_Nome: false,
                isValidNome: false
            });
        }
    }

    const textInputChangeRaca = (val) => {

        if (val.trim().length > 0) {
            setData({
                ...data,
                raca: val,
                check_Raca: true,
                isValidRaca: true
            });
        } else {
            setData({
                ...data,
                check_Raca: false,
                isValidRaca: false
            });
        }
    }

    const textInputChangeCor = (val) => {
        if (val.trim().length > 0) {
            setData({
                ...data,
                cor: val,
                check_Cor: true,
                isValidCor: true
            });
        } else {
            setData({
                ...data,
                check_Cor: false,
                isValidBairro: false
            });
        }
    }
    const textInputChangeSexo = (val) => {
        if (val.trim().length > 0) {
            setData({
                ...data,
                sexo: val,
                isValidCidade: true
            });
        } else {
            setData({
                ...data,
                isValidSexo: true
            });
        }
    }

    const textInputChangeEspecie = (val) => {
        if (val.trim().length > 0) {
            setData({
                ...data,
                especie: val,
                check_Especie: true,
                isValidUf: true
            });
        } else {
            setData({
                ...data,
                check_Especie: false,
                isValidEspecie: false
            });
        }
    }

    const textInputChangePelo = (val) => {
        if (val != 'Key0') {
            setData({
                ...data,
                pelo: val,
                check_Pelo: true,
                isValidPelo: true
            });
        } else {
            setData({
                ...data,
                pelo: "",
                check_Pelo: false,
                isValidPelo: false
            });
        }
    }

    const textInputChangePorte = (val) => {
        if (val != 'Key0') {
            setData({
                ...data,
                porte: val,
                check_Porte: true,
                isValidPorte: true
            });
        } else {
            setData({
                ...data,
                porte: "",
                check_Porte: false,
                isValidPorte: false
            });
        }
    }

    const textInputChangeFilhote = (val) => {
        if (val != 'Key0') {
            setData({
                ...data,
                filhote: val,
                check_Filhote: true,
                isValidFilhote: true
            });
        } else {
            setData({
                ...data,
                filhote: "",
                check_Filhote: false,
                isValidFilhote: false
            });
        }
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <StatusBar backgroundColor='#009387' barStyle="light-content" />
                <View style={styles.header}>
                    <Text style={styles.text_header}>Cadastrar seu animal.</Text>
                </View>
               
                    <Animatable.Image
                        animation="bounceIn"
                        duraton="1500"
                        source={require('../../source/logoapp.png')}
                        style={styles.logo}
                        resizeMode="cover"
                    />



                {/* ====== Nome Animal ======= */}

                <Animatable.View
                    animation="fadeInUpBig"
                    style={[styles.footer, {
                        backgroundColor: colors.background
                    }]}
                >
                    <ScrollView style={{ width: "100%", marginBottom: -25 }}>

                        <Text style={[styles.text_footer, {
                            color: colors.text
                        }]}>Nome</Text>
                        <View style={styles.action}>
                            <FontAwesome
                                name="asterisk"
                                color={colors.text}
                                size={20}
                            />
                            <TextInput
                                placeholder="Informe o nome do seu animal"
                                placeholderTextColor="#666666"
                                style={[styles.textInput, {
                                    color: colors.text
                                }]}
                                autoCapitalize="none"
                                onChangeText={(val) => textInputChangeNome(val)}
                            //onEndEditing={(e) => handleValidNome(e.nativeEvent.text)}
                            />
                            {data.check_Nome ?
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
                        {data.isValidNome ? null :
                            <Animatable.View animation="fadeInLeft" duration={500}>
                                <Text style={styles.errorMsg}>Campo obrigatório.</Text>
                            </Animatable.View>
                        }

                        {/* ========= Raça ========= */}


                        <Text style={[styles.text_footer, {
                            color: colors.text
                        }]}>Raça</Text>
                        <View style={styles.action}>
                            <FontAwesome
                                name="asterisk"
                                color={colors.text}
                                size={20}
                            />
                            <TextInput
                                placeholder="Informe a raça do seu animal"
                                placeholderTextColor="#666666"
                                style={[styles.textInput, {
                                    color: colors.text
                                }]}
                                autoCapitalize="none"
                                onChangeText={(val) => textInputChangeRaca(val)}
                            //onEndEditing={(e) => handleValidNome(e.nativeEvent.text)}
                            />
                            {data.check_Raca ?
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
                        {data.isValidRaca ? null :
                            <Animatable.View animation="fadeInLeft" duration={500}>
                                <Text style={styles.errorMsg}>Campo obrigatório.</Text>
                            </Animatable.View>
                        }

                        {/* ========= Cor ========= */}


                        <Text style={[styles.text_footer, {
                            color: colors.text
                        }]}>Cor</Text>
                        <View style={styles.action}>
                            <FontAwesome
                                name="asterisk"
                                color={colors.text}
                                size={20}
                            />
                            <TextInput
                                placeholder="Informe a cor do seu animal"
                                placeholderTextColor="#666666"
                                style={[styles.textInput, {
                                    color: colors.text
                                }]}
                                autoCapitalize="none"
                                onChangeText={(val) => textInputChangeCor(val)}
                            //onEndEditing={(e) => handleValidNome(e.nativeEvent.text)}
                            />
                            {data.check_Cor ?
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
                        {data.isValidCor ? null :
                            <Animatable.View animation="fadeInLeft" duration={500}>
                                <Text style={styles.errorMsg}>Campo obrigatório.</Text>
                            </Animatable.View>
                        }

                        {/* ===============  SEXO ============= */}

                        <Text style={[styles.text_footer, {
                            color: colors.text,
                            marginTop: 35
                        }]}>Sexo</Text>

                        <View style={styles.action}>
                            <Grid>
                                <Col style={{ left: 110 }}>
                                    <TouchableOpacity onPress={() => setData({ ...data, sexo: 'M' })}>
                                        <FontAwesome name={"mars"} style={{ fontSize: 40 }} color=
                                            {data.sexo == "M" ? color = "#0101f7" : color = "#999"} />
                                        <Text style={styles.fontSexo}> M </Text>
                                    </TouchableOpacity>
                                </Col>

                                <Col>
                                    <TouchableOpacity onPress={() => setData({ ...data, sexo: 'F' })}>
                                        <FontAwesome name={"venus"} style={{ fontSize: 40 }} color=
                                            {data.sexo == "F" ? color = "#f702a5" : color = "#999"} />
                                        <Text style={styles.fontSexo}>  F </Text>
                                    </TouchableOpacity>
                                </Col>
                            </Grid>
                        </View>

                        {data.check_Sexo ?
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

                        {data.isValidSexo ? null :
                            <Animatable.View animation="fadeInLeft" duration={500}>
                                <Text style={styles.errorMsg}>Campo obrigatório.</Text>
                            </Animatable.View>
                        }

                        {/* ========= Especie ========= */}
                        <Text style={[styles.text_footer, {
                            color: colors.text,
                            marginTop: 35
                        }]}>Espécie</Text>
                        <View style={styles.action}>
                            <Grid>
                                <Col style={{ left: 60 }}>
                                    <TouchableOpacity

                                        onPress={() =>
                                            setData({ ...data, especie: 'Gato', outraEspecie: false })

                                        }
                                    >
                                        <FontAwesome name="paw" style={{ fontSize: 40, }} color=
                                            {data.especie == "Gato" ? color = "#E76801" : color = "#999"} />

                                    </TouchableOpacity>
                                </Col>
                                <Col style={{ left: 30 }}>
                                    <TouchableOpacity


                                        onPress={() =>
                                            setData({ ...data, especie: 'Cão', outraEspecie: false })

                                        }
                                    >
                                        <FontAwesome name="paw" style={{ fontSize: 40, }} color=
                                            {data.especie == "Cão" ? color = "#E76801" : color = "#999"} />

                                    </TouchableOpacity>
                                </Col>

                                <Col style={{ right: 5 }}>
                                    <TouchableOpacity


                                        onPress={() =>
                                            setData({ ...data, outraEspecie: true, especie: "" })
                                        }>


                                        <FontAwesome name={"question"} style={{ fontSize: 35 }} color=
                                            {data.outraEspecie ? color = "#E76801" : color = "#999"} />

                                    </TouchableOpacity>
                                </Col>
                            </Grid>
                        </View>



                        <Renderif test={data.outraEspecie}>
                            <Text style={[styles.text_footer, {
                                color: colors.text, marginTop: 30
                            }]}>Outra Espécie</Text>
                            <View style={styles.action}>
                                <FontAwesome
                                    name="asterisk"
                                    color={colors.text}
                                    size={20}
                                />
                                <TextInput
                                    placeholder="Informe a espécie do seu animal"
                                    placeholderTextColor="#666666"
                                    style={[styles.textInput, {
                                        color: colors.text
                                    }]}
                                    autoCapitalize="none"
                                    onChangeText={(val) => textInputChangeEspecie(val)}
                                />

                                {data.check_Especie ?
                                    <Animatable.View animation="bounceIn">
                                        <Feather
                                            name="check-circle"
                                            color="green"
                                            size={20}
                                        />
                                    </Animatable.View>
                                    : null}
                            </View>
                            {data.isValidEspecie ? null :
                                <Animatable.View animation="fadeInLeft" duration={500}>
                                    <Text style={styles.errorMsg}>Campo obrigatório.</Text>
                                </Animatable.View>
                            }
                        </Renderif>

                        <Text style={[styles.text_footer, {
                            color: colors.text, marginTop: 30
                        }]}>Porte</Text>

                        <View style={styles.action}>
                            <FontAwesome
                                name="asterisk"
                                color={colors.text}
                                size={20}
                            />
                            <Picker
                                note
                                mode="dialog"
                                style={{ width: "100%" }}
                                selectedValue={data.porte}
                                onValueChange={textInputChangePorte.bind(this)}
                                placeholder={"Selecione..."}

                            >
                                <Picker.Item label="Selecione..." value="Key0" />

                                <Picker.Item label="Pequeno" value="Pequeno" />

                                <Picker.Item label="Médio" value="Médio" />

                                <Picker.Item label="Grande" value="Grande" />
                            </Picker>

                            {data.check_Porte ?
                                <Animatable.View animation="bounceIn">
                                    <Feather
                                        name="check-circle"
                                        color="green"
                                        size={20}
                                    />
                                </Animatable.View>
                                : null}
                        </View>
                        {data.isValidPorte ? null :
                            <Animatable.View animation="fadeInLeft" duration={500}>
                                <Text style={styles.errorMsg}>Campo obrigatório.</Text>
                            </Animatable.View>
                        }


                        <Text style={[styles.text_footer, {
                            color: colors.text, marginTop: 30
                        }]}>Pelagem</Text>
                        <View style={styles.action}>
                            <FontAwesome
                                name="asterisk"
                                color={colors.text}
                                size={20}
                            />
                            <Picker
                                note
                                mode="dialog"
                                style={{ width: "100%" }}
                                selectedValue={data.pelo}
                                onValueChange={textInputChangePelo.bind(this)}
                                placeholder={"Selecione..."}

                            >
                                <Picker.Item label="Selecione..." value="Key0" />

                                <Picker.Item label="Curta" value="Curta" />

                                <Picker.Item label="Longa" value="Longa" />

                                <Picker.Item label="Lisa" value="Lisa" />

                                <Picker.Item label="Enrolada" value="Enrolada" />

                            </Picker>

                            {data.check_Pelo ?
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
                        {data.isValidPelo ? null :
                            <Animatable.View animation="fadeInLeft" duration={500}>
                                <Text style={styles.errorMsg}>Campo obrigatório.</Text>
                            </Animatable.View>
                        }


                        <Text style={[styles.text_footer, {
                            color: colors.text, marginTop: 30
                        }]}>Filhote</Text>
                        <View style={styles.action}>
                            <FontAwesome
                                name="asterisk"
                                color={colors.text}
                                size={20}
                            />
                            <Picker
                                note
                                mode="dialog"
                                style={{ width: "100%" }}
                                selectedValue={data.filhote}
                                onValueChange={textInputChangeFilhote.bind(this)}
                                placeholder={"Selecione..."}

                            >
                                <Picker.Item label="Selecione..." value="Key0" />

                                <Picker.Item label="Sim" value="1" />

                                <Picker.Item label="Não" value="0" />

                            </Picker>

                            {data.check_Filhote ?
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
                        {data.isValidPelo ? null :
                            <Animatable.View animation="fadeInLeft" duration={500}>
                                <Text style={styles.errorMsg}>Campo obrigatório.</Text>
                            </Animatable.View>
                        }

                        <View style={styles.button}>

                            <TouchableOpacity
                                style={styles.signIn}
                                onPress={() => { _enviar() }}

                            >
                                <LinearGradient
                                    colors={['#08d4c4', '#01ab9d']}
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
        </SafeAreaView>
    );
};

export default RegisterAnimalScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
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
        width: height_logo,
        height: height_logo,
        borderRadius: 55,
        borderWidth: 2,
        height: 85,
        width: 90,
        position: "absolute",
        marginLeft: 130,
        justifyContent: 'center',
        alignItems: 'center',
    },

});