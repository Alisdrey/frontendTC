import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, TouchableOpacity, Image, ScrollView, ImageBackground, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Col, Grid } from "react-native-easy-grid";



  const CustomDrawerContent = ({ props, navigation }) => {

    const [data, setData] = React.useState({
      user: {}
    });

    if(data.user == null){
        AsyncStorage.getItem("User").then(userText => {
          const user = JSON.parse(userText);
          setData({
            ...data,
            user: user,
          });
        });
    }
   
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#323a4e' }}>
        <ImageBackground
          resizeMode="cover"
          blurAmount={1}
          blurRadius={1}
          opacity={0.2}
          source={require("./source/fundotc.jpg")}
          style={{ width: undefined, flex: 1, padding: 16 }}
        >
          <Image source={require('./source/logoapp.png')} style={styles.profile} />
          <Text style={styles.name}>{data.user ? data.user.nome : ''}</Text>

          {/* </View> */}
          <ScrollView style={{ marginLeft: -10, padding: 0 }}>
            <TouchableOpacity
              style={{ marginTop: 20 }}
              onPress={() => navigation.navigate('HomeAP')}
            >

              <Grid>
                <Col size={12}>
                  <MaterialIcons
                    name="person"
                    size={20}
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
                  <MaterialIcons
                    name="person"
                    size={20}
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
                  <MaterialIcons
                    name="person"
                    size={20}
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
                  <MaterialIcons
                    name="person"
                    size={20}
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
                  <MaterialIcons
                    name="person"
                    size={20}
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
                  <MaterialIcons
                    name="person"
                    size={20}
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
              onPress={() => AsyncStorage.clear().then(() => {
                navigation.navigate("Splash");
              })}
            >
              <Grid>
                <Col size={12}>
                  <MaterialIcons
                    name="person"
                    size={20}
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
        </ImageBackground>
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
    borderColor: "#fff"
  },

  name: {
    color: "#fff",
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 8
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