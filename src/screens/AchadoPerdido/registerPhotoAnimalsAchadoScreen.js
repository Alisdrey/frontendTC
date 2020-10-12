import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Alert,
    PermissionsAndroid,
    Image,
    Dimensions

} from 'react-native';
import { Root, ActionSheet } from 'native-base'
import ImagePicker from 'react-native-image-crop-picker';
import styles from '../settings/styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Server from '../settings/Server';
import { useIsFocused } from "@react-navigation/native"

const registerPhotoAnimalsAchadoScreen = ({ route, navigation, props }) => {


    const { idusuario } = route.params;
    const { descricaolocal } = route.params;
    const { descricaoanimal } = route.params;
    const { cidade } = route.params;
    const { estado } = route.params;
    const { acolhido } = route.params;

    const [date, setData] = React.useState({
        hasImage: false,
        idusuario: idusuario,
        descricaolocal: descricaolocal,
        descricaoanimal: descricaoanimal,
        cidade: cidade,
        estado: estado,
        acolhido: acolhido,
        imagem: [],
        variant: '',
        haveimg: false


    });


    const fullWidth = Dimensions.get('window').width;
    const imageStyle = [
        {
            borderRadius: 8,
            width: date.variant ? fullWidth / 2 - 30 : fullWidth - 80,
            height: date.variant ? 170 : 350,
            margin: date.variant ? 0 : 20
        }
    ];

    const nameStyle = [
        {
            color: '#363636',
            fontSize: date.variant ? 15 : 14
        }
    ];

    const isFocused = useIsFocused();

    useEffect(() => {
        console.log(date)
    }, [isFocused]);


    const _enviar = () => {
        console.log(date.imagem)
        if (date.imagem.length != 0) {
            sendToServer().then(() => {
                console.log('cadastrado')
            })
        } else {
            Alert.alert(
                "[Sem imagem]",
                "Ops, parece que você não inseriu nenhuma imagem :( ",
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



    const sendToServer = async () => {
        console.log("entrou", date.imagem)
        try {
            let formdata_img = new FormData();

            const fileURL = date.imagem.path;
            const fileName = fileURL.split("/").pop();
            const ext = fileURL.split(".").pop();

            formdata_img.append("file", {
                type: "image/" + ext,
                uri: fileURL,
                name: fileName,

            });

            formdata_img.append("idusuario", date.idusuario);
            formdata_img.append("descricaolocal", date.descricaolocal);
            formdata_img.append("descricaoanimal", date.descricaoanimal);
            formdata_img.append("cidade", date.cidade);
            formdata_img.append("estado", date.estado);
            formdata_img.append("acolhido", date.acolhido);

            console.log(formdata_img)

            fetch(Server.API_INSERIR_IMAGEM_ACHADO, {
                method: "POST",
                'Content-Type': 'multipart/form-data',
                body: formdata_img
            }).then(response => response.json())
                .then(response => {

                    navigation.addListener ('focus', () =>{
                        setData({
                            ...date,
                                descricaolocal: '',
                                descricaoanimal: '',
                                acolhido: [],
                                imagem: [],
                                haveimg: false
                        })
                      });

                    navigation.navigate("HomeAP")

                }).catch(error => {
                    console.log(error);
                })

        } catch (err) {
            console.log(err);
        }
    }


    const _handleActionSheetButton = (btnIndex) => {
      
        switch (btnIndex) {

            // case 0:
            //     ImagePicker.openCamera({
            //         width: 800,
            //         height: 800,
            //         includeBase64: true,
            //         cropping: true,
            //         compressImageQuality: 0.4,
            //         compressImageMaxWidth: 800,
            //         compressImageMaxHeight: 800,
            //         cropperChooseText: "Confirmar",
            //         cropperCancelText: "Cancelar",
            //         loadingLabelText: "Carregando",
            //         cropperStatusBarColor: "#E76801",
            //         cropperToolbarColor: "#E76801",
            //         cropperActiveWidgetColor: "#E76801",
            //         cropperTintColor: "#E76801",
            //     })
            //         .then(imagem => {
            //             console.log(imagem)
            //             const dados = {
            //                 imagem: imagem
            //             }
            //         })
            //         .catch(error => {
            //             console.log(error);
            //         })
            //     break;

            case 1:
                ImagePicker.openPicker({
                    multiple: true,
                    width: 800,
                    height: 800,
                    includeBase64: true,
                    cropping: true,
                    compressImageQuality: 0.4,
                    compressImageMaxWidth: 800,
                    compressImageMaxHeight: 800,
                    cropperChooseText: "Confirmar",
                    cropperCancelText: "Cancelar",
                    loadingLabelText: "Carregando",
                    cropperStatusBarColor: "#E76801",
                    cropperToolbarColor: "#E76801",
                    cropperActiveWidgetColor: "#E76801",
                    cropperTintColor: "#E76801",
                })
                    .then(img => {
                        setData({
                            ...date,
                            imagem: img[0],
                            haveimg: true
                        })
                    })
                break;

            default:
                break;
        }
    }
    const _handleChooseImage = () => {
        ActionSheet.show(
            {
                options: ["Câmera", "Galeria", "Cancelar"],
                cancelButtonIndex: 2,
                title: "Escolha o que fazer"
            },
            buttonIndex => {
                _handleActionSheetButton(buttonIndex);
            }
        );
    }

    return (
        <Root>
            <View style={styles.containerCardItem}>
                {console.log(date)}
                <TouchableOpacity
                    style={{ padding: 15, }}
                    onPress={() => { _handleActionSheetButton(1) }}
                >
                    {
                        !date.haveimg ?
                            <Image source={require('../../source/no-image.jpg')} style={imageStyle} />
                            :

                            <Image source={{
                                uri:
                                    "data:image/jpeg;base64," +
                                    date.imagem.data
                            }} style={imageStyle} />

                    }

                </TouchableOpacity>

                {/* <View style={styles.matchesCardItem}>
                    <Text style={styles.matchesTextCardItem}>
                        <FontAwesome name="heart" />
                    </Text>
                </View> */}

                {/* <Text style={nameStyle}>olá</Text> */}

                <Text style={styles.descriptionCardItem, nameStyle}>2/2</Text>


                <View style={styles.actionsCardItem}>

                    <TouchableOpacity
                        style={{ padding: 20 }}
                        onPress={() =>
                            navigation.goBack()} >
                        <View style={styles.matchesCardItem}>
                            <Text style={styles.matchesTextGoBack}>
                                <FontAwesome style={{ fontSize: 15 }} name="arrow-left" />
                                {/* <Text>{'\n'}voltar </Text> */}
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ padding: 20 }} onPress={() => _enviar()}>
                        <View style={styles.matchesCardItem}>
                            <Text style={styles.matchesTextConfirm}>
                                <FontAwesome style={{ fontSize: 40 }} name="check" />
                                {/* <Text>{'\n'} confirmar </Text> */}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </Root>
    );
};

export default registerPhotoAnimalsAchadoScreen;
