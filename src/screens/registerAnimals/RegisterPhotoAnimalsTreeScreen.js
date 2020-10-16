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
    Image,
    Dimensions

} from 'react-native';
import { Root, ActionSheet } from 'native-base'
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import { Col, Row, Grid } from "react-native-easy-grid";
import Geolocation from 'react-native-geolocation-service';
import { useTheme } from 'react-native-paper';
import Renderif from "../../componets/RenderIf";
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import { Picker } from '@react-native-community/picker';
import ResponsiveImage from 'react-native-responsive-image';
import styles from '../settings/styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useIsFocused } from "@react-navigation/native"
import Server from '../settings/Server';

const RegisterPhotoAnimalsTree = ({ route, navigation, props }) => {


    const { idanimal } = route.params;
    const { imagemone } = route.params;
    const { imagemtwo } = route.params;

    const [date, setData] = React.useState({
        idanimal: idanimal,
        imagemone: imagemone,
        imagemtwo: imagemtwo,
        imagemtree: [],
        variant: '',
        haveimg: false
    });


    const isFocused = useIsFocused();

    useEffect(() => {
        console.log(date)
        date.idanimal = idanimal,
        date.imagemtree = []
        date.variant = ''
        date.haveimg = false
    }, [isFocused]);

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

    const _enviar = () => {
        if (date.imagem != "") {
            sendToServer().then(() => {
                date.idanimal = []
               console.log("sucesso")
               
            })
        }
    }

    const sendToServer = async () => {

        let imagem = []

        imagem = [date.imagemone,date.imagemtwo, date.imagemtree];
console.log(imagem)
        try {
            let formdata_img = new FormData();

            imagem.forEach(item => {

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


    const _handleActionSheetButton = (btnIndex) => {
        { console.log(date) }
      
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
                setData({
                    ...date,
                    imagemtree: {"imagem": imagem[0]},
                    haveimg: true
                })
            })
    }


    return (
        <Root>
            <View style={styles.containerCardItem}>
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
                                    date.imagemtree.imagem.data
                            }} style={imageStyle} />

                    }

                </TouchableOpacity>


                <Text style={styles.descriptionCardItem, nameStyle}>3/3</Text>


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


                </View>
            </View>
        </Root>
    );
};

export default RegisterPhotoAnimalsTree;
