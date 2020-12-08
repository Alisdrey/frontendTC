import React, { useState } from 'react';
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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { Col, Grid } from "react-native-easy-grid";
import { TextInputMask } from 'react-native-masked-text'
import moment from "moment/min/moment-with-locales";
import { useTheme } from 'react-native-paper';

const SignUpScreen = ({ navigation }) => {

    const [data, setData] = React.useState({
        nome: "",
        sobrenome: "",
        sexo: "",
        nascimento: "",
        telefone: "",
        nameButton: 'Próximo',
        disabledButton: false,
        isValidNome: true,
        check_Nome: false,
        isValidSobrenome: true,
        check_Sobrenome: false,
        isValidSexo: true,
        check_Sexo: false,
        isValidTelefone: true,
        check_Telefone: false,
        isValidNascimento: true,
        check_Nascimento: false,

    });

    const [sexo, setSexo] = useState(0);
    const { colors } = useTheme();

    const _enviar = () => {

        setData({
            ...data,
            nameButton: 'Aguarde...',
            disabledButton: true
        })

        //let data_nascimento

        if (data.nome && data.sobrenome && sexo &&
            data.telefone) {

            //data_nascimento = moment(new Date(data.nascimento)).format("YYYY-MM-DD");

            navigation.navigate(
                "SignUpTwo"
                , {
                    nome: data.nome,
                    sobrenome: data.sobrenome,
                    sexo: sexo,
                    nascimento: '1970-01-01',
                    telefone: data.telefone
                }
            )
        } else {
            setData({
                ...data,
                nameButton: 'Próximo...',
                disabledButton: false
            })
            Alert.alert(
                "",
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

    const textInputChangeSobrenome = (val) => {

        if (val.trim().length > 0) {
            setData({
                ...data,
                sobrenome: val,
                check_Sobrenome: true,
                isValidSobrenome: true
            });
        } else {
            setData({
                ...data,
                check_Sobrenome: false,
                isValidSobrenome: false
            });
        }
    }

    const textInputChangeTelefone = (val) => {
        if (val.trim().length > 0) {
            setData({
                ...data,
                telefone: val,
                check_Telefone: true,
                isValidTelefone: true
            });
        } else {
            setData({
                ...data,
                telefone: "",
                isValidTelefone: true
            });
        }
    }

    const textInputChangeNascimento = (val) => {

        if (val.trim().length > 0) {
            setData({
                ...data,
                nascimento: val,
                check_Nascimento: true,
                isValidNascimento: true
            });
        } else {
            setData({
                ...data,
                nascimento: "",
                check_Nascimento: false,
                isValidNascimento: false
            });
        }
    }

    const handleValidNome = (val) => {
        if (val.trim().length > 0) {
            setData({
                ...data,
                isValidNome: true
            });
        } else {
            setData({
                ...data,
                isValidNome: false
            });
        }
    }

    const handleValidSobrenome = (val) => {
        if (val.trim().length > 1) {
            setData({
                ...data,
                isValidSobrenome: true
            });
        } else {
            setData({
                ...data,
                isValidSobrenome: false
            });
        }
    }

    const handleValidTelefone = (val) => {
        if (val.trim().length > 0) {
            setData({
                ...data,
                isValidTelefone: true
            });
        } else {
            setData({
                ...data,
                isValidTelefone: false
            });
        }
    }

    const handleValidNascimento = (val) => {
        if (val.trim().length > 0) {
            setData({
                ...data,
                isValidNascimento: true
            });
        } else {
            setData({
                ...data,
                isValidNascimento: false
            });
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#323a4e' barStyle="light-content" />
            <View style={styles.header}>
                <TouchableOpacity style={{ alignContent: 'center', bottom: 5 }}
                    onPress={() => navigation.goBack()}>
                    <Image style={{ width: 25, height: 25, marginLeft: 5 }}
                        source={require('../../source/arrow.png')}
                        resizeMode='contain' />
                </TouchableOpacity>
                <Text style={styles.text_header}>Comece sua experiência no PetWord ;)
            {"\n"}Agora vamos pedir algumas informações para realizarmos seu cadastro.</Text>
            </View>

            <View style={{ alignItems: 'center' }}>
                <Text style={styles.etapa}>1/4</Text>
            </View>

            <Animatable.View
                animation="fadeInUpBig"
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}
            >
                <ScrollView style={{ width: "100%", marginBottom: -25 }} keyboardShouldPersistTaps={'handled'}>

                    {/* ====== Nome ======= */}

                    <Text style={[styles.text_footer, {
                        color: colors.text
                    }]}>Nome</Text>
                    <View style={styles.action}>

                        <TextInput
                            placeholder="Informe seu nome"
                            placeholderTextColor="#666666"
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            autoCapitalize="none"
                            onChangeText={(val) => textInputChangeNome(val)}
                            onEndEditing={(e) => handleValidNome(e.nativeEvent.text)}
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

                    {/* ========= Sobrenome ========= */}

                    <Text style={[styles.text_footer, {
                        color: colors.text,
                        marginTop: 35
                    }]}>Sobrenome</Text>
                    <View style={styles.action}>

                        <TextInput
                            placeholder="Informe seu sobrenome"
                            placeholderTextColor="#666666"
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            autoCapitalize="none"
                            onChangeText={(val) => textInputChangeSobrenome(val)}
                            onEndEditing={(e) => handleValidSobrenome(e.nativeEvent.text)}
                        />
                        {data.check_Sobrenome ?
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

                    {data.isValidSobrenome ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Campo obrigatório.</Text>
                        </Animatable.View>
                    }


                    {/* =========== Telefone ========== */}

                    <Text style={[styles.text_footer, {
                        color: colors.text,
                        marginTop: 35
                    }]}>Telefone</Text>
                    <View style={styles.action}>

                        <TextInputMask
                            autoCorrect={false}
                            keyboardType="numeric"
                            placeholder="Informe seu Telefone"
                            placeholderTextColor="#666666"
                            type={'custom'}
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            options={{
                                mask: '(99) 999999999'
                            }}
                            value={data.telefone}
                            onChangeText={(val) => textInputChangeTelefone(val)}
                            onEndEditing={(e) => handleValidTelefone(e.nativeEvent.text)}

                        />

                        {data.check_Telefone ?
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

                    {data.isValidTelefone ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Campo obrigatório.</Text>
                        </Animatable.View>
                    }

                    {/* =============== NASCIMENTO ======== */}

                    {/* <Text style={[styles.text_footer, {
                        color: colors.text,
                        marginTop: 35
                    }]}>Data de Nascimento</Text>
                    <View style={styles.action}>

                        <TextInputMask
                            type={'datetime'}
                            options={{
                                format: 'DD/MM/YYYY'
                            }}
                            value={data.nascimento}
                            placeholder="Informe seu Nascimento"
                            placeholderTextColor="#666666"
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            autoCapitalize="none"
                            onChangeText={(val) => textInputChangeNascimento(val)}
                            onEndEditing={(e) => handleValidNascimento(e.nativeEvent.text)}
                        />
                        {data.check_Nascimento ?
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

                    {data.isValidNascimento ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Campo obrigatório.</Text>
                        </Animatable.View>
                    } */}

                    {/* ===============  SEXO ============= */}

                    <Text style={[styles.text_footer, {
                        color: colors.text,
                        marginTop: 35
                    }]}>Sexo</Text>

                    <View style={styles.action}>
                        <Grid>
                            <Col style={{ left: 110 }}>
                                <TouchableOpacity onPress={() => setSexo('M')}>
                                    <FontAwesome name={"mars"} style={{ fontSize: 40 }} color=
                                        {sexo == "M" ? color = "#0101f7" : color = "#999"} />
                                    <Text style={styles.fontSexo}> M </Text>
                                </TouchableOpacity>
                            </Col>

                            <Col>
                                <TouchableOpacity onPress={() => setSexo('F')}>
                                    <FontAwesome name={"venus"} style={{ fontSize: 40 }} color=
                                        {sexo == "F" ? color = "#f702a5" : color = "#999"} />
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

export default SignUpScreen;

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
    }
});