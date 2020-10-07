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
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text'

const SignUpTwoScreen = ({ route, navigation }) => {

    const { nome } = route.params;
    const { sobrenome } = route.params;
    const { sexo } = route.params;
    const { nascimento } = route.params;
    const { telefone } = route.params;

    const [data, setData] = React.useState({
        nome: nome,
        sobrenome: sobrenome,
        sexo: sexo,
        nascimento: nascimento,
        telefone: telefone,

        rua: "",
        numero: "",
        bairro: "",
        cidade: "",
        uf: "",
        cep: "",
        latitude: "",
        longitude: "",

        isValidRua: true,
        check_Rua: false,
        isValidNumero: true,
        check_Numero: false,
        isValidBairro: true,
        check_Bairro: false,
        isValidCidade: true,
        check_Cidade: false,
        isValidUf: true,
        check_Uf: false,
        isValidCep: true,
        check_Cep: false,
        isloading: true,

    });

    const { colors } = useTheme()

    const _enviar = () => {

        if (data.nome && data.sobrenome && data.sexo &&
            data.nascimento && data.telefone && data.rua &&
            data.bairro && data.cidade && data.uf && data.cep ) {
            navigation.navigate(
                "SignUpTree"
                , {
                    nome: data.nome,
                    sobrenome: data.sobrenome,
                    sexo: sexo,
                    nascimento: data.nascimento,
                    telefone: data.telefone,

                    rua: data.rua,
                    numero: data.numero,
                    bairro: data.bairro,
                    cidade: data.cidade,
                    uf: data.uf,
                    cep: data.cep,
                }

            )
        } else {
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

    const textInputChangeRua = (val) => {

        if (val.trim().length > 0) {

            setData({
                ...data,
                rua: val,
                check_Rua: true,
                isValidRua: true
            });
        } else {
            setData({
                ...data,
                check_Rua: false,
                isValidRua: false
            });
        }
    }

    const textInputChangeNumero = (val) => {

        if (val.trim().length > 0) {
            setData({
                ...data,
                numero: val,
                check_Numero: true,
                isValidNumero: true
            });
        } else {
            setData({
                ...data,
                check_Numero: false,
                isValidNumero: false
            });
        }
    }


    const textInputChangeBairro = (val) => {
        if (val.trim().length > 0) {
            setData({
                ...data,
                bairro: val,
                isValidBairro: true
            });
        } else {
            setData({
                ...data,
                bairro: val,
                isValidBairro: true
            });
        }
    }

    const textInputChangeCidade = (val) => {
        if (val.trim().length > 0) {
            setData({
                ...data,
                cidade: val,
                isValidCidade: true
            });
        } else {
            setData({
                ...data,
                cidade: val,
                isValidCidade: true
            });
        }
    }

    const textInputChangeUf = (val) => {
        if (val.trim().length > 0) {
            setData({
                ...data,
                uf: val,
                isValidUf: true
            });
        } else {
            setData({
                ...data,
                uf: val,
                isValidUf: true
            });
        }
    }

    const textInputChangeCep = (val) => {
        if (val.trim().length > 0) {
            setData({
                ...data,
                cep: val,
                isValidCep: true
            });
        } else {
            setData({
                ...data,
                cep: val,
                isValidCep: true
            });
        }
    }


    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#323a4e' barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>Boa! Agora vamos para seu endereço residencial. {"\n"}Conta para gente onde você mora.</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
                <Text style={styles.etapa}>2/4</Text>
            </View>

            {/* ====== Rua ======= */}

            <Animatable.View
                animation="fadeInUpBig"
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}
            >
                <ScrollView style={{ width: "100%", marginBottom: -25 }}>

                    <Text style={[styles.text_footer, {
                        color: colors.text
                    }]}>Rua</Text>
                    <View style={styles.action}>

                        <TextInput
                            placeholder="Informe sua rua"
                            placeholderTextColor="#666666"
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            autoCapitalize="none"
                            onChangeText={(val) => textInputChangeRua(val)}
                        //onEndEditing={(e) => handleValidNome(e.nativeEvent.text)}
                        />
                        {data.check_Rua ?
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
                    {data.isValidRua ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Campo obrigatório.</Text>
                        </Animatable.View>
                    }

                    {/* ========= Número ========= */}

                    <Text style={[styles.text_footer, {
                        color: colors.text,
                        marginTop: 35
                    }]}>Número</Text>
                    <View style={styles.action}>

                        <TextInput
                            keyboardType="numeric"
                            placeholder="Informe o nº da sua residência"
                            placeholderTextColor="#666666"
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            autoCapitalize="none"
                            onChangeText={(val) => textInputChangeNumero(val)}
                        //onEndEditing={(e) => handleValidSobrenome(e.nativeEvent.text)}
                        />
                        {data.check_Numero ?
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

                    {data.isValidNumero ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Campo obrigatório.</Text>
                        </Animatable.View>
                    }


                    {/* =========== Bairro ========== */}

                    <Text style={[styles.text_footer, {
                        color: colors.text,
                        marginTop: 35
                    }]}>Bairro</Text>
                    <View style={styles.action}>

                        <TextInput
                            placeholder="Informe seu Bairro"
                            placeholderTextColor="#666666"
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            autoCapitalize="none"
                            onChangeText={(val) => textInputChangeBairro(val)}
                        //onEndEditing={(e) => handleValidTelefone(e.nativeEvent.text)}
                        />
                        {data.check_Bairro ?
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

                    {data.isValidBairro ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Campo obrigatório.</Text>
                        </Animatable.View>
                    }

                    <Text style={[styles.text_footer, {
                        color: colors.text,
                        marginTop: 35
                    }]}>Cep</Text>
                    <View style={styles.action}>

                        <TextInputMask
                            keyboardType="numeric"
                            type={'custom'}
                            options={{
                                mask: '99999-999'
                            }}
                            value={data.cep}
                            placeholder="Informe seu Cep"
                            placeholderTextColor="#666666"
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            autoCapitalize="none"
                            onChangeText={(val) => textInputChangeCep(val)}
                        //onEndEditing={(e) => handleValidTelefone(e.nativeEvent.text)}
                        />
                        {data.check_Cep ?
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

                    {data.isValidCep ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Campo obrigatório.</Text>
                        </Animatable.View>
                    }

                    <Text style={[styles.text_footer, {
                        color: colors.text,
                        marginTop: 35
                    }]}>Cidade</Text>
                    <View style={styles.action}>

                        <TextInput
                            placeholder="Informe sua Cidade"
                            placeholderTextColor="#666666"
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            autoCapitalize="none"
                            onChangeText={(val) => textInputChangeCidade(val)}
                        //onEndEditing={(e) => handleValidTelefone(e.nativeEvent.text)}
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


                    <Text style={[styles.text_footer, {
                        color: colors.text,
                        marginTop: 35
                    }]}>UF</Text>
                    <View style={styles.action}>

                        <TextInput
                            placeholder="Informe seu Estado"
                            placeholderTextColor="#666666"
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            autoCapitalize="none"
                            onChangeText={(val) => textInputChangeUf(val)}
                        //onEndEditing={(e) => handleValidTelefone(e.nativeEvent.text)}
                        />
                        {data.check_Uf ?
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

                    {data.isValidUf ? null :
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

export default SignUpTwoScreen;

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