import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, Image, ScrollView, ImageBackground, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Col, Row, Grid } from "react-native-easy-grid";


export default class CustomDrawerContent extends Component {


  render(props) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#db921d' }}>
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
                <LinearGradient colors={['#f0d7af', '#c9871e']} style={styles.signIn}>
                  <Grid>
                    <Col size={12}>
                      <MaterialIcons
                        name="person"
                        size={20}
                      />
                    </Col>

                    <Col size={80}>
                      <Text style={[styles.textSign, {
                        color: '#fff'
                      }]}>Home</Text>
                    </Col>
                  </Grid>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                  style={{ marginTop: 5 }}
                  onPress={() => this.props.navigation.navigate('RegisterAnimal')}
                >
                   <LinearGradient colors={['#f0d7af', '#c9871e']} style={styles.signIn}>
                      <Grid>
                        <Col size={12}>
                          <MaterialIcons
                            name="person"
                            size={20}
                          />
                        </Col>

                        <Col size={80}>
                          <Text style={[styles.textSign, {
                              color: '#fff'
                          }]}>Cadastrar Animal</Text>
                        </Col>
                      </Grid>
                  </LinearGradient>
                </TouchableOpacity>


                <TouchableOpacity
                  style={{ marginTop: 5 }}
                  onPress={() => this.props.navigation.navigate('RegisterAnimalsPerdido')}
                >
                   <LinearGradient colors={['#f0d7af', '#c9871e']} style={styles.signIn}>
                      <Grid>
                        <Col size={12}>
                          <MaterialIcons
                            name="person"
                            size={20}
                          />
                        </Col>

                        <Col size={80}>
                          <Text style={[styles.textSign, {
                              color: '#fff'
                          }]}>Animal Perdido</Text>
                        </Col>
                      </Grid>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ marginTop: 5 }}
                  onPress={() => this.props.navigation.navigate('RegisterAnimalsAchado')}
                >
                   <LinearGradient colors={['#f0d7af', '#c9871e']} style={styles.signIn}>
                      <Grid>
                        <Col size={12}>
                          <MaterialIcons
                            name="person"
                            size={20}
                          />
                        </Col>

                        <Col size={80}>
                          <Text style={[styles.textSign, {
                              color: '#fff'
                          }]}>Animal Encontrado</Text>
                        </Col>
                      </Grid>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ marginTop: 5 }}
                  onPress={() => this.props.navigation.navigate('RegisterDoacao')}
                >
                   <LinearGradient colors={['#f0d7af', '#c9871e']} style={styles.signIn}>
                      <Grid>
                        <Col size={12}>
                          <MaterialIcons
                            name="person"
                            size={20}
                          />
                        </Col>

                        <Col size={80}>
                          <Text style={[styles.textSign, {
                              color: '#fff'
                          }]}>Doar Animal</Text>
                        </Col>
                      </Grid>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ marginTop: 5 }}
                  onPress={() => AsyncStorage.clear().then(() => {
                    this.props.navigation.navigate("Splash");
                  })}
                >
                   <LinearGradient colors={['#f0d7af', '#c9871e']} style={styles.signIn}>
                      <Grid>
                        <Col size={12}>
                          <MaterialIcons
                            name="person"
                            size={20}
                          />
                        </Col>

                        <Col size={80}>
                          <Text style={[styles.textSign, {
                              color: '#fff'
                          }]}>Sair</Text>
                        </Col>
                      </Grid>
                  </LinearGradient>
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