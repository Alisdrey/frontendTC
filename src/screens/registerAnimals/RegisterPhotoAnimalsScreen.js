import React, { useEffect } from 'react';
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
import ImagePicker from 'react-native-image-crop-picker';
import styles from '../settings/Styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Server from '../settings/Server';
import { useIsFocused } from "@react-navigation/native"


const RegisterPhotoAnimals = ({ route, navigation, props }) => {

    const { formdata } = route.params;


    const [date, setData] = React.useState({
        formdata: formdata,
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

    const isFocused = useIsFocused();

    useEffect(() => {
        console.log(date)
        date.formdata = formdata,
            date.imagem = []
        date.variant = ''
        date.haveimg = false
    }, [isFocused]);


    const sendToServer = async () => {

        fetch(Server.API_INSERT_ANIMAL, {
            method: "POST",
            'Content-Type': 'multipart/form-data',
            body: date.formdata
        }).then(response => response.json())
            .then(response => {
                try {

                    let formdata_img = new FormData();

                    const fileURL = date.imagem.imagem.path;
                    const fileName = fileURL.split("/").pop();
                    const ext = fileURL.split(".").pop();

                    formdata_img.append("file", {
                        type: "image/" + ext,
                        uri: fileURL,
                        name: fileName,

                    });

                    formdata_img.append("idanimal", response.idAnimal);

                    console.log(formdata_img)

                    fetch(Server.API_UPLOAD_IMG, {
                        method: "POST",
                        'Content-Type': 'multipart/form-data',
                        body: formdata_img
                    }).then(response => response.json())
                        .then(response => {

                            navigation.navigate("meusanimais")

                        }).catch(error => {
                            console.log(error);
                        })

                } catch (err) {
                    console.log(err);
                }
            })
    }


    const _enviar = () => {
        if (date.imagem != "") {

            sendToServer().then(() => {
                console.log("Sucesso")
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
                date.imagem = []

                setData({
                    ...date,
                    imagem: { "imagem": imagem[0] },
                    haveimg: true
                })
                console.log(date.imagem)
            })

    }

    const _navigation = () => {
        if (date.imagem.length != 0) {

            navigation.navigate(
                "RegisterPhotoAnimalsTwo"
                , {
                    imagem: date.imagem,
                    formdata: date.formdata
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
                                    date.imagem.imagem.data
                            }} style={imageStyle} />

                    }


                </TouchableOpacity>

                <Text style={styles.descriptionCardItem, nameStyle}>1/3</Text>

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

                    <TouchableOpacity
                        style={{ padding: 20 }}
                        onPress={() =>
                            _navigation()} >
                        <View style={styles.matchesCardItem}>
                            <Text style={styles.matchesTextGoUp}>
                                <FontAwesome style={{ fontSize: 15 }} name="arrow-right" />
                            </Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </View>
        </Root>
    );
};

export default RegisterPhotoAnimals;
