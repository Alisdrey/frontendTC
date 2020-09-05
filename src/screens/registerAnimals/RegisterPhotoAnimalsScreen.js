import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Alert,
    Image,
    Dimensions,
    StatusBar

} from 'react-native';
import { Root } from 'native-base'
import * as Animatable from 'react-native-animatable';
import Renderif from "../../componets/RenderIf";
import { Avatar } from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import styles from '../settings/styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Server from '../settings/Server';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const RegisterPhotoAnimals = ({ route, navigation, props }) => {

    const { idanimal } = route.params;


    const [date, setData] = React.useState({
        idanimal: idanimal,
        user: {},
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


    const sendToServer = async () => {
        try {
            
            let formdata_img = new FormData();

            date.imagem.forEach(item => {

                const fileURL = item.imagem.path;
                const fileName = fileURL.split("/").pop();
                const ext = fileURL.split(".").pop();

                formdata_img.append("file", {
                    type: "image/" + ext,
                    uri: fileURL,
                    name: fileName,

                });

                formdata_img.append("idanimal", date.idanimal);

                console.log(formdata_img)

                fetch(Server.API_UPLOAD_IMG, {
                    method: "POST",
                    'Content-Type': 'multipart/form-data',
                    body: formdata_img
                }).then(response => response.json())
                    .then(response => {
                       navigation.navigate("HomeAP")

                    }).catch(error => {
                        console.log(error);
                    })
            })
        } catch (err) {
            console.log(err);
        }
    }


    const _enviar = () => {
        if (date.imagem != "") {
            sendToServer().then(() => {
                date.imagem.forEach(element => {
                    console.log("element", element)
                });
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


    const _handleActionSheetButton = () => {
        
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
                    .then(imagem => {

                        setData(prevState => ({
                            ...date,
                            imagem: [...prevState.imagem, {"imagem": imagem[0]}],
                            haveimg: true
                        }))
                    })
         
    }

    const _navigation = () => {
        if (date.imagem.length != 0) {
            navigation.navigate(
                "RegisterPhotoAnimalsTwo"
                , {
                   imagem: date.imagem,
                   idanimal: date.idanimal
                }
            )
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

    return (
        <Root>
            {console.log(date)}
            <View style={styles.containerCardItem}>
            <StatusBar backgroundColor='#f4f4f1' barStyle="light-content" />
                {/* IMAGE */}
                <TouchableOpacity
                    style={{ padding: 15, }}
                    onPress={() => { _handleActionSheetButton() }}
                >
                    {
                        !date.haveimg ?
                            <Image source={require('../../source/no-image.jpg')} style={imageStyle} />
                            :

                            <Image source={{
                                uri:
                                    "data:image/jpeg;base64," +
                                    date.imagem[0].imagem.data
                            }} style={imageStyle} />

                    }


                </TouchableOpacity>

                {/* <View style={styles.matchesCardItem}>
                    <Text style={styles.matchesTextCardItem}>
                        <FontAwesome name="heart" />
                    </Text>
                </View> */}

                {/* <Text style={nameStyle}>olá</Text> */}


                <Text style={styles.descriptionCardItem,nameStyle}>1/3</Text>


                <View style={styles.actionsCardItem}>

                    <TouchableOpacity
                       style={{ padding: 20 }}
                        onPress={() =>
                            navigation.goBack()} >
                        <View style={styles.matchesCardItem}>
                            <Text style={styles.matchesTextGoBack}>
                                <FontAwesome style={{fontSize:15}} name="arrow-left" />
                            {/* <Text>{'\n'}voltar </Text> */}
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ padding: 20 }} onPress={() => _enviar()}>
                        <View style={styles.matchesCardItem}>
                            <Text style={styles.matchesTextConfirm}>
                                <FontAwesome style={{fontSize:40}} name="check" />
                                {/* <Text>{'\n'} confirmar </Text> */}
                            </Text>
                        </View>
                    </TouchableOpacity>
                   
                    <TouchableOpacity 
                        style={{ padding: 20 }}
                         onPress={() =>
                           _navigation()} >
                            <View style={styles.matchesCardItem}>
                                <Text style={styles.matchesTextGoUp}>
                                    <FontAwesome style={{fontSize:15}} name="arrow-right" />
                                    {/* <Text>{'\n'} próximo </Text> */}
                                </Text>
                            </View>
                    </TouchableOpacity>
                 
                </View>
            </View>
        </Root>
    );
};

export default RegisterPhotoAnimals;
