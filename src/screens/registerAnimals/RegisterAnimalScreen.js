import React, { useEffect } from 'react';
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
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Col, Grid } from "react-native-easy-grid";
import AsyncStorage from '@react-native-community/async-storage';
import { useTheme } from 'react-native-paper';
import { Picker } from '@react-native-community/picker';
import Server from '../settings/Server';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { useIsFocused } from "@react-navigation/native"

const RegisterAnimalScreen = ({ route, navigation }) => {

    const [data, setData] = React.useState({
        user: {},
        nome: "",
        raca: "",
        cor: [],
        sexo: "",
        especie: "",
        pelo: "",
        porte: "",
        filhote: "",
        nameButton: 'Próximo',
        disabledButton: false,

        isValidNome: true,
        isValidRaca: true,
        isValidCor: true,
        isValidSexo: true,
        isValidEspecie: true,
        isValidPelo: true,
        isValidPorte: true,
        isValidFilhote: true,
        isloading: true,

    });

    const { colors } = useTheme();


    const racaCao = [

        {
            name: 'Pug',
            id: 1,
        },
        {
            name: 'Maltês',
            id: 2,
        },
        {
            name: 'Buldogue',
            id: 3,
        },
        {
            name: 'PitBull',
            id: 4,
        },
        {
            name: 'Spitz Alemão',
            id: 5,
        },
    ];

    const racaGato = [

        {
            name: 'Persa',
            id: 1,
        },
        {
            name: 'Siamês',
            id: 2,
        },
        {
            name: 'Maine Coon',
            id: 3,
        },
        {
            name: 'Ragdoll',
            id: 4,
        },
        {
            name: 'Sphynx',
            id: 5,
        },
        {
            name: 'Raça Indefinida',
            id: 6,
        },


    ];

    const itemsCor = [
        {
            name: 'Cor',
            id: 0,
            children: [
                {
                    name: 'Branco',
                    id: 1,
                },
                {
                    name: 'Preto',
                    id: 2,
                },
                {
                    name: 'Cinza',
                    id: 3,
                },
                {
                    name: 'Bege',
                    id: 4,
                },
                {
                    name: 'Marrom',
                    id: 5,
                },
            ],
        },
    ];

    useEffect(() => {
        AsyncStorage.getItem("User").then(userText => {
            const user = JSON.parse(userText);
            setData({
                ...data,
                user: user,
            });
        });

    }, []);

    const isFocused = useIsFocused();

    useEffect(() => {
        setData({
            ...data,
            nome: "",
            raca: "",
            cor: [],
            sexo: "",
            especie: "",
            pelo: "",
            porte: "",
            filhote: "",
            nameButton: 'Próximo',
            disabledButton: false,
        })
    }, [isFocused]);

    const _enviar = () => {

        setData({
            ...data,
            nameButton: 'Aguarde...',
            disabledButton: true
        })

        let concatCor = '';

        concatCor = concatCor.substr(0, concatCor.length - 1);
        data.cor.forEach(item => {
            concatCor += item + ';'
        });

        concatCor = concatCor.substr(0, concatCor.length - 1);

        if (data.nome != '' && data.raca != '' &&
            data.cor != '' && data.sexo != '' &&
            data.especie != '' && data.porte != '' &&
            data.pelo != '' && data.filhote != '') {

            let formdata = new FormData();

            formdata.append('idusuario', data.user.idUsuario)
            formdata.append('nome', data.nome)
            formdata.append('especie', data.especie)
            formdata.append('raca', data.raca)
            formdata.append('sexo', data.sexo)
            formdata.append('cor', concatCor)
            formdata.append('pelo', data.pelo)
            formdata.append('porte', data.porte)
            formdata.append('filhote', data.filhote)

            navigation.navigate("RegisterPhotoAnimals", {
                formdata: formdata
            })


        } else {
            setData({
                ...data,
                nameButton: 'Próximo',
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

    const textInputChangeNome = (val) => {

        if (val.trim().length > 0) {

            setData({
                ...data,
                nome: val,
                isValidNome: true
            });
        } else {
            setData({
                ...data,
                isValidNome: false,
                nome: '',
            });
        }
    }

    const textInputChangeRaca = (val) => {
        console.log(val)
        if (val) {
            setData({
                ...data,
                raca: val,
                isValidRaca: true
            });
        } else {
            setData({
                ...data,
                isValidRaca: false
            });
        }
    }

    const textInputChangeCor = (val) => {
        if (val != "") {
            setData({
                ...data,
                cor: val,
                isValidCor: true
            });

        } else {
            console.log('val')
            setData({
                ...data,
                cor: "",
                isValidCor: false
            });
        }
    }

    const textInputChangePelo = (val) => {
        if (val != 'Key0') {
            setData({
                ...data,
                pelo: val,
                isValidPelo: true
            });
        } else {
            setData({
                ...data,
                pelo: "",
                isValidPelo: false
            });
        }
    }

    const textInputChangePorte = (val) => {
        if (val != 'Key0') {
            setData({
                ...data,
                porte: val,
                isValidPorte: true
            });
        } else {
            setData({
                ...data,
                porte: "",
                isValidPorte: false
            });
        }
    }

    const textInputChangeFilhote = (val) => {
        if (val != 'Key0') {
            setData({
                ...data,
                filhote: val,
                isValidFilhote: true
            });
        } else {
            setData({
                ...data,
                filhote: "",
                isValidFilhote: false
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
                />

                <TouchableOpacity style={{ alignContent: 'center', bottom: 85 }}
                    onPress={() => navigation.goBack()}>
                    <Image style={{ width: 25, height: 25, marginLeft: 5 }}
                        source={require('../../source/arrow.png')}
                        resizeMode='contain' />
                </TouchableOpacity>
            </View>


            {/* ====== Nome Animal ======= */}

            <Animatable.View
                animation="fadeInUpBig"
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}
            >
                <ScrollView style={{ width: "100%", marginBottom: -25 }} keyboardShouldPersistTaps={'handled'}>
                    <Text style={styles.text_title}>Cadastrar Animal</Text>
                    <Text style={[styles.text_footer, {
                        color: colors.text
                    }]}>Nome</Text>
                    <View style={styles.action}>

                        <TextInput
                            value={data.nome}
                            placeholder="Informe o nome do seu animal"
                            placeholderTextColor="#666666"
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            autoCapitalize="none"
                            onChangeText={(val) => textInputChangeNome(val)}
                        />

                    </View>
                    {data.isValidNome ? null :
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
                                        setData({ ...data, especie: 'Cão' })

                                    }
                                >
                                    {data.especie == "Cão" ?
                                        <Image style={{ width: 30, height: 30, marginLeft: 20, bottom: 1 }}
                                            source={require('../../source/dog-escuro.png')}
                                        /> :
                                        <Image style={{ width: 30, height: 30, marginLeft: 20, bottom: 1 }}
                                            source={require('../../source/dog.png')}
                                        />}


                                </TouchableOpacity>
                            </Col>
                            <Col style={{ left: 20 }}>
                                <TouchableOpacity

                                    onPress={() =>
                                        setData({ ...data, especie: 'Gato' })

                                    }
                                >

                                    {data.especie == "Gato" ?
                                        <Image style={{ width: 30, height: 30, marginLeft: 20, bottom: 1 }}
                                            source={require('../../source/gato-preto.png')}
                                        /> :
                                        <Image style={{ width: 30, height: 30, marginLeft: 20, bottom: 1 }}
                                            source={require('../../source/gato.png')}
                                        />}

                                </TouchableOpacity>
                            </Col>
                        </Grid>
                    </View>

                    {/* ========= Raça ========= */}


                    <Text style={[styles.text_footer, {
                        color: colors.text
                    }]}>Raça</Text>
                    <View style={styles.action}>
                        <Picker
                            note
                            mode="dialog"
                            style={{ width: "100%" }}
                            selectedValue={data.raca}
                            onValueChange={textInputChangeRaca.bind(this)}
                            placeholder={"Selecione..."}

                        >
                            <Picker.Item label="Selecione..." value="Key0" />

                            {
                                data.especie == 'Cão' ? racaCao.map((item, index) =>
                                    <Picker.Item key={index} label={item.name} value={item.name} />
                                )
                                    :
                                    data.especie === 'Gato' ? racaGato.map((item, index) =>
                                        <Picker.Item key={index} label={item.name} value={item.name} />
                                    )
                                        : <Picker.Item label="Selecione uma espécie" value="Key0" />
                            }
                        </Picker>

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
                    <View style={styles.action, { width: '100%' }}>

                        <SectionedMultiSelect
                            showCancelButton={true}
                            items={itemsCor}
                            uniqueKey="name"
                            subKey="children"
                            selectText="Selecione..."
                            confirmText='Confirmar'
                            selectedText='Selecionado'
                            searchPlaceholderText='Pesquisar Categorias'
                            showDropDowns={true}
                            readOnlyHeadings={true}
                            onSelectedItemsChange={textInputChangeCor}
                            selectedItems={data.cor}
                            expandDropDowns={true}

                        />

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

                    {data.isValidSexo ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Campo obrigatório.</Text>
                        </Animatable.View>
                    }

                    <Text style={[styles.text_footer, {
                        color: colors.text, marginTop: 0
                    }]}>Porte</Text>

                    <View style={styles.action}>
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

                    </View>
                    {data.isValidFilhote ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Campo obrigatório.</Text>
                        </Animatable.View>
                    }

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

export default RegisterAnimalScreen;

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
        paddingHorizontal: 20,
        paddingBottom: 50,
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_title: {
        color: 'black',
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 20
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
        flex: 1,
        top: 30,
        width: null,
        height: null,
        resizeMode: 'contain'
    }

});