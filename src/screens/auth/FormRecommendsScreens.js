import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Platform,
    StyleSheet,
    StatusBar,
    Alert,
    ScrollView,
    Dimensions,
    BackHandler,
    ToastAndroid
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import { useTheme } from 'react-native-paper';
import { Picker } from '@react-native-community/picker';
import Server from '../settings/Server';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import {useFocusEffect} from '@react-navigation/native';

const FormRecommendsScreens = ({ route, navigation, props }) => {

    const items = [
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

    const itemsRaca = [
        {
            name: 'Cão',
            id: 0,
            children: [
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
                {
                    name: 'Raça Indefinida',
                    id: 6,
                },
            ],
        },
        {
            name: 'Gato',
            id: 1,
            children: [
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
            ],
        },
    ];

    const itemsEspecie = [
        {
            name: 'Espécie',
            id: 0,
            children: [
                {
                    name: 'Cão',
                    id: 1,
                },
                {
                    name: 'Gato',
                    id: 2,
                },
            ],
        },
    ];

    const itemsPorte = [
        {
            name: 'Porte',
            id: 0,
            children: [
                {
                    name: 'Pequeno',
                    id: 1,
                },
                {
                    name: 'Médio',
                    id: 2,
                },
                {
                    name: 'Grande',
                    id: 3,
                },
            ],
        },
    ];

    const itemsPelagem = [
        {
            name: 'Pelagem',
            id: 0,
            children: [
                {
                    name: 'Curta',
                    id: 1,
                },
                {
                    name: 'Longa',
                    id: 2,
                },
                {
                    name: 'Lisa',
                    id: 3,
                },
                {
                    name: 'Enrolada',
                    id: 3,
                },
            ],
        },
    ];

    const itemsSexo = [
        {
            name: 'Sexo',
            id: 0,
            children: [
                {
                    name: 'Macho',
                    id: 1,
                },
                {
                    name: 'Fêmea',
                    id: 2,
                }
            ],
        },
    ];

    const [itensRaca, setItensRaca] = React.useState({})

    const [data, setData] = React.useState({

        user: {},
        raca: [],
        cor: [],
        sexo: [],
        especie: [],
        pelo: [],
        porte: [],
        filhote: "",
    });


    const [numberClick, setNumberClick] = useState(0);
  
    const backHandler = useCallback(() => {
      if (numberClick === 1) {
        BackHandler.exitApp();
      }
      setNumberClick(2);
      ToastAndroid.show(
        'Pressione novamente para sair do aplicativo',
        ToastAndroid.SHORT,
      );
      setTimeout(() => {
        setNumberClick(1);
      }, 1000);
      return true;
    }, [numberClick]);
  
    useFocusEffect(
      useCallback(() => {
        BackHandler.addEventListener('hardwareBackPress', backHandler);
        return () => {
          BackHandler.removeEventListener('hardwareBackPress', backHandler);
        };
      }, [backHandler]),
    );

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

        let concatRaca = '';
        let concatCor = '';
        let concatSexo = '';
        let concatEspecie = '';
        let concatPorte = '';
        let concatPelo = '';

        data.raca.forEach(item => {
            concatRaca += item + ';'
        });

        concatRaca = concatRaca.substr(0, concatRaca.length - 1);


        data.cor.forEach(item => {
            concatCor += item + ';'
        });

        concatCor = concatCor.substr(0, concatCor.length - 1);

        data.sexo.forEach(item => {
            if(item == 'Macho'){
                item = 'M'
            } 
            if(item == 'Fêmea'){
                item = 'F'
            }
          
            concatSexo += item + ';'
        });

        concatSexo = concatSexo.substr(0, concatSexo.length - 1);
        
        data.especie.forEach(item => {
            concatEspecie += item + ';'
        });

        concatEspecie = concatEspecie.substr(0, concatEspecie.length - 1);

        data.porte.forEach(item => {
            concatPorte += item + ';'
        });

        concatPorte = concatPorte.substr(0, concatPorte.length - 1);

        data.pelo.forEach(item => {
            concatPelo += item + ';'
        });

        concatPelo = concatPelo.substr(0, concatPelo.length - 1);

        if (data.raca != '' && data.filhote != '' &&
            data.cor != '' && data.sexo != '' &&
            data.especie != '' && data.porte != '' &&
            data.pelo != '') {

            let formdata = new FormData();

            formdata.append('idUsuario', data.user.idUsuario)
            formdata.append('especie', concatEspecie)
            formdata.append('raca', concatRaca)
            formdata.append('sexo', concatSexo)
            formdata.append('cor', concatCor)
            formdata.append('pelo', concatPelo)
            formdata.append('porte', concatPorte)
            formdata.append('filhote', data.filhote)
            console.log(formdata)

            fetch(Server.API_RECOMENDACAO_GOSTO_POST, {
                method: "POST",
                'Content-Type': 'multipart/form-data',
                body: formdata
            }).then(val => { navigation.navigate("HomeAP")  })
                // .then(responseJson => {
                //     navigation.navigate("HomeAP")
            // }).then(val => { _login()  })

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

    const onSelectedItemsChange = (val) => {
        if (val) {
            setData({
                ...data,
                cor: val
            });
        }
    };

    const textInputChangeRaca = (val) => {
        if (val) {
            setData({
                ...data,
                raca: val
            });
        }
    };

    const textInputChangeSexo = (val) => {
        if (val) {
            setData({
                ...data,
                sexo: val
            });
          
        }
    }

    const textInputChangeEspecie = (val) => {
        if (val) {
            if(val == "Cão") {
                setItensRaca([
                    {
                        name: 'Cão',
                        id: 0,
                        children: [
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
                            {
                                name: 'Raça Indefinida',
                                id: 6,
                            },
                        ],
                    },
                ]);
            } else if(val == "Gato") {
                setItensRaca([
                    {
                        name: 'Gato',
                        id: 1,
                        children: [
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
                        ],
                    },
                ]);
            } else {
                setItensRaca([
                    {
                        name: 'Cão',
                        id: 0,
                        children: [
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
                            {
                                name: 'Raça Indefinida',
                                id: 6,
                            },
                        ],
                    },
                    {
                        name: 'Gato',
                        id: 1,
                        children: [
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
                        ],
                    },
                ]);
            }
            setData({
                ...data,
                especie: val
            });
        }
    }

    const textInputChangePelo = (val) => {
        if (val) {
            setData({
                ...data,
                pelo: val
            });
        }
    }

    const textInputChangePorte = (val) => {
        if (val) {
            setData({
                ...data,
                porte: val,
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

        <View style={styles.container}>
            <StatusBar backgroundColor='#323a4e' barStyle="light-content" />
            <View style={styles.header}>

                <Text style={styles.text_header}>Seu cadastro foi realizado com sucesso. {"\n"} Por fim, Informe seus gostos para sabermos melhor sobre você ;D</Text>
              
            </View>

            <Animatable.View
                animation="fadeInUpBig"
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}
            >
                <ScrollView style={{ width: "100%", marginBottom: -25 }} keyboardShouldPersistTaps={'handled'}>

                      {/* ========= Especie ========= */}
                      <Text style={[styles.text_footer, {
                        color: colors.text,
                        marginTop: 35
                    }]}>Espécie</Text>
                    <View style={styles.action, { width: '100%' }}>

                        <SectionedMultiSelect
                            showCancelButton={true}
                            items={itemsEspecie}
                            uniqueKey="name"
                            subKey="children"
                            selectText="Selecione..."
                            confirmText='Confirmar'
                            selectedText='Selecionado'
                            searchPlaceholderText='Pesquisar Categorias'
                            showDropDowns={true}
                            readOnlyHeadings={true}
                            onSelectedItemsChange={textInputChangeEspecie}
                            selectedItems={data.especie}
                            expandDropDowns={true}

                        />

                    </View>


                    {/* ========= Raça ========= */}

                    <Text style={[styles.text_footer, {
                        color: colors.text
                    }]}>Raça</Text>
                    <View style={styles.action, { width: '100%', }}>
                        {console.log(itensRaca)}
                        <SectionedMultiSelect
                            showCancelButton={true}
                            items={itensRaca}
                            uniqueKey="name"
                            subKey="children"
                            selectText="Selecione..."
                            confirmText='Confirmar'
                            selectedText='Selecionado'
                            searchPlaceholderText='Pesquisar Categorias'
                            showDropDowns={true}
                            readOnlyHeadings={true}
                            onSelectedItemsChange={textInputChangeRaca}
                            selectedItems={data.raca}
                            expandDropDowns={true}

                        />

                    </View>
                  
                    {/* ========= Cor ========= */}


                    <Text style={[styles.text_footer, {
                        color: colors.text
                    }]}>Cor</Text>
                    <View style={styles.action, { width: '100%' }}>

                        <SectionedMultiSelect
                            showCancelButton={true}
                            items={items}
                            uniqueKey="name"
                            subKey="children"
                            selectText="Selecione..."
                            confirmText='Confirmar'
                            selectedText='Selecionado'
                            searchPlaceholderText='Pesquisar Categorias'
                            showDropDowns={true}
                            readOnlyHeadings={true}
                            onSelectedItemsChange={onSelectedItemsChange}
                            selectedItems={data.cor}
                            expandDropDowns={true}

                        />

                    </View>
                  
                    {/* ===============  SEXO ============= */}

                    <Text style={[styles.text_footer, {
                        color: colors.text,
                        marginTop: 35
                    }]}>Sexo</Text>

                    <View style={styles.action, { width: '100%' }}>

                        <SectionedMultiSelect
                            showCancelButton={true}
                            items={itemsSexo}
                            uniqueKey="name"
                            subKey="children"
                            selectText="Selecione..."
                            confirmText='Confirmar'
                            selectedText='Selecionado'
                            searchPlaceholderText='Pesquisar Categorias'
                            showDropDowns={true}
                            readOnlyHeadings={true}
                            onSelectedItemsChange={textInputChangeSexo}
                            selectedItems={data.sexo}
                            expandDropDowns={true}

                        />

                    </View>
                  
                    <Text style={[styles.text_footer, {
                        color: colors.text, marginTop: 20
                    }]}>Porte</Text>

                    <View style={styles.action, { width: '100%' }}>

                        <SectionedMultiSelect
                            showCancelButton={true}
                            items={itemsPorte}
                            uniqueKey="name"
                            subKey="children"
                            selectText="Selecione..."
                            confirmText='Confirmar'
                            selectedText='Selecionado'
                            searchPlaceholderText='Pesquisar Categorias'
                            showDropDowns={true}
                            readOnlyHeadings={true}
                            onSelectedItemsChange={textInputChangePorte}
                            selectedItems={data.porte}
                            expandDropDowns={true}

                        />

                    </View>

                    <Text style={[styles.text_footer, {
                        color: colors.text, marginTop: 30
                    }]}>Pelagem</Text>
                    <View style={styles.action, { width: '100%' }}>

                        <SectionedMultiSelect
                            showCancelButton={true}
                            items={itemsPelagem}
                            uniqueKey="name"
                            subKey="children"
                            selectText="Selecione..."
                            confirmText='Confirmar'
                            selectedText='Selecionado'
                            searchPlaceholderText='Pesquisar Categorias'
                            showDropDowns={true}
                            readOnlyHeadings={true}
                            onSelectedItemsChange={textInputChangePelo}
                            selectedItems={data.pelo}
                            expandDropDowns={true}

                        />

                    </View>

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
                  

                    <View style={styles.button}>

                        <TouchableOpacity
                            style={styles.signIn}
                            onPress={() => { _enviar() }}

                        >
                            <LinearGradient
                                colors={['#ff9517', '#ff9517']}
                                style={styles.signIn}
                            >
                                <Text style={[styles.textSign, {
                                    color: '#fff'
                                }]}>Finalizar</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Animatable.View>

        </View>
    );
};

export default FormRecommendsScreens;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    width: {
        width: 300,
    },
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
    text_header: {
        color: "white",
        fontSize: 14,
        marginTop: 10,
        textAlign: "center",
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18,
        marginTop:20
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