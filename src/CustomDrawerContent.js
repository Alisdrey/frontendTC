import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, TouchableOpacity, Image, ScrollView, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Col, Grid } from "react-native-easy-grid";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const CustomDrawerContent = ({ props, navigation }) => {

  const [user, setUser] = React.useState();

  useEffect(() => {
    AsyncStorage.getItem("User").then(userText => {
      const user = JSON.parse(userText);
      setUser(user)
    });
  }, []);

  const clearAsync = async () => {
    await AsyncStorage.removeItem('User').then(responseJson => {
      navigation.navigate("Splash")
    })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#323a4e', width: undefined, padding: 15 }}>

      <Image source={require('./source/logoapp.png')} style={styles.profile} />
      <View style={{ marginTop: -10 }}>
        {/* <Text style={styles.name}>Olá, {user ? user.nome : ''}</Text> */}
      </View>
      <View
        style={{
          borderBottomColor: 'white',
          borderBottomWidth: 3,
          width: '100%',
          flex: 1,
        }}
      />

      {/* </View> */}
      <ScrollView style={{ marginLeft: -10, paddingLeft: 5 }}>
        <TouchableOpacity
          style={{ marginTop: 30 }}
          onPress={() => navigation.navigate('HomeAP')}
        >

          <Grid>
            <Col size={12}>
              <MaterialIcons
                name="home"
                size={20}
                style={{ color: 'white' }}
              />
            </Col>

            <Col size={80}>
              <Text style={{
                color: '#fff', fontSize: 15
              }}>Home</Text>
            </Col>
          </Grid>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ marginTop: 30 }}
          onPress={() => navigation.navigate('RegisterAnimal')}
        >
          <Grid>
            <Col size={12}>
              <FontAwesome
                name="plus-square"
                size={20}
                style={{ color: 'white' }}
              />
            </Col>

            <Col size={80}>
              <Text style={{
                color: '#fff', fontSize: 15
              }}>Cadastrar Animal</Text>
            </Col>
          </Grid>
        </TouchableOpacity>


        <TouchableOpacity
          style={{ marginTop: 30 }}
          onPress={() => navigation.navigate('RegisterAnimalsPerdido')}
        >
          <Grid>
            <Col size={12}>
              <FontAwesome
                name="frown-o"
                size={20}
                style={{ color: '#fff' }}
              />
            </Col>

            <Col size={80}>
              <Text style={{
                color: '#fff', fontSize: 15
              }}>Animal Perdido</Text>
            </Col>
          </Grid>

        </TouchableOpacity>

        <TouchableOpacity
          style={{ marginTop: 30 }}
          onPress={() => navigation.navigate('RegisterAnimalsAchado')}
        >
          <Grid>
            <Col size={12}>
              <FontAwesome
                name="smile-o"
                size={20}
                style={{ color: '#fff' }}
              />
            </Col>

            <Col size={80}>
              <Text style={{
                color: '#fff', fontSize: 15
              }}>Animal Encontrado</Text>
            </Col>
          </Grid>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ marginTop: 30 }}
          onPress={() => navigation.navigate('RegisterDoacao')}
        >
          <Grid>
            <Col size={12}>
              <FontAwesome
                name="heart"
                size={20}
                style={{ color: '#fff' }}
              />
            </Col>

            <Col size={80}>
              <Text style={{
                color: '#fff', fontSize: 15
              }}>Doar Animal</Text>
            </Col>
          </Grid>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ marginTop: 30 }}
          onPress={() => navigation.navigate('minhaspublicacoes')}
        >
          <Grid>
            <Col size={12}>
              <FontAwesome
                name="user-o"
                size={20}
                style={{ color: '#fff' }}
              />
            </Col>

            <Col size={80}>
              <Text style={{
                color: '#fff', fontSize: 15
              }}>Minhas Publicações</Text>
            </Col>
          </Grid>

        </TouchableOpacity>

        <TouchableOpacity
          style={{ marginTop: 30 }}
          onPress={() => navigation.navigate('meusanimais')}
        >
          <Grid>
            <Col size={12}>
              <FontAwesome
                name="paw"
                size={20}
                style={{ color: '#fff' }}
              />
            </Col>

            <Col size={80}>
              <Text style={{
                color: '#fff', fontSize: 15
              }}>Meus Animais</Text>
            </Col>
          </Grid>

        </TouchableOpacity>


        <TouchableOpacity
          style={{ marginTop: 30 }}

          onPress={() => clearAsync()}
        >
          <Grid>
            <Col size={12}>
              <FontAwesome name="sign-out"
                size={20}
                style={{ color: 'white' }}
              />
            </Col>

            <Col size={80}>
              <Text style={{
                color: '#fff', fontSize: 15
              }}>Sair</Text>
            </Col>
          </Grid>

        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>

  )
}

export default CustomDrawerContent;

const styles = StyleSheet.create({

  profile: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "#fff",
    marginTop: 10,

  },

  name: {
    color: "#fff",
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 6,
    marginTop: 60
  },

  signIn: {
    width: '100%',
    height: 40,
    padding: 10,
    borderRadius: 10
  },

  textSign: {
    fontWeight: 'bold'
  }
})