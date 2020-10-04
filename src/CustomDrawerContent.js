import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, Image, ScrollView, ImageBackground, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Col, Row, Grid } from "react-native-easy-grid";


export default class CustomDrawerContent extends Component {


  render(props) {
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
          {/* <View style={{height:150, alignItems: 'center', justifyContent: 'center'}}> */}
          <Image source={require('./source/logoapp.png')} style={styles.profile} />
          <Text style={styles.name}>Alisson Andrey</Text>

          {/* </View> */}
          <ScrollView style={{ marginLeft: -10, padding: 0 }}>
            <TouchableOpacity
              style={{ marginTop: 20 }}
              onPress={() => this.props.navigation.navigate('HomeAP')}
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
              onPress={() => this.props.navigation.navigate('FormRecommends')}
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
              onPress={() => this.props.navigation.navigate('RegisterAnimalsPerdido')}
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
              onPress={() => this.props.navigation.navigate('RegisterAnimalsAchado')}
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
              onPress={() => this.props.navigation.navigate('RegisterDoacao')}
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
              onPress={() => this.props.navigation.navigate('minhaspublicacoes')}
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
                this.props.navigation.navigate("Splash");
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
}

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