import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  BackHandler,
  ToastAndroid,
  ScrollView,
  RefreshControl

} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import {
  Tab,
  Tabs,
  TabHeading,
  Content,
  Spinner,
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { CustomHeader } from '../../index';
import { Col, Grid } from "react-native-easy-grid";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Server from '../settings/Server';
import { Header, Avatar, Name, Cover } from './styles';
import moment from "moment/min/moment-with-locales";
import Renderif from "../../componets/RenderIf";

moment.updateLocale("pt-br", {
  months: [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
  ]
});
moment.locale("pt-br");

const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}
const HomeAPScreen = ({ navigation, props }) => {

  const [feedConteudo, setFeedConteudo] = useState([]);
  const [feedColaborativo, setFeedColaborativo] = useState([]);
  const [feedDoacao, setFeedDoacao] = useState([]);
  const [feedPerdido, setFeedPerdido] = useState([]);
  const [loadingPerdido, setLoadingPerdido] = useState(false);
  const [loadingAchado, setLoadingAchado] = useState(false);
  const [loadingDoado, setLoadingDoado] = useState(false);
  const [feedAchado, setFeedAchado] = useState([]);
  const [user, setUser] = useState([]);
  const [load, setLoad] = useState(true)

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

  const getPerdido = () => {
    const url = Server.API_GET_PET_PERDIDO
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson) {

          setFeedPerdido(responseJson);
          setLoadingPerdido(true)

        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  const getAchado = () => {
    const url = Server.API_GET_PET_ACHADO
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson) {
          setFeedAchado(responseJson);
          setLoadingAchado(true)
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  const getDoado = () => {
    const url = Server.API_GET_DOADO
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson) {
          setFeedDoacao(responseJson);
          setLoadingDoado(true)

        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  useEffect(() => {
    getPerdido()
    getAchado();
    getDoado();
    navigation.addListener('focus', () => setLoad(!load))
  }, [load, navigation]);


  useEffect(() => {
    AsyncStorage.getItem("User").then(userText => {
      const user = JSON.parse(userText);
      setUser(user)
      recomendacao_Colaborativa(user);
      recomendacao_Conteudo(user);
    });
    navigation.addListener('focus', () => setLoad(!load))
  }, [load, navigation]);

  const recomendacao_Colaborativa = (user) => {
    const url = Server.API_RECOMENDACAO_COLABORATIVA + user.idUsuario
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson) {
          setFeedColaborativo(responseJson);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  const recomendacao_Conteudo = (user) => {
    const url = Server.API_RECOMENDACAO_CONTEUDO + user.idUsuario
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson) {
          setFeedConteudo(responseJson);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    const url = Server.API_GET_DOADO
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson) {
          setFeedDoacao(responseJson);
          setLoadingDoado(true)

        }
      })
      .catch(err => {
        console.log(err);
      });

    wait(2000).then(() => setRefreshing(false));
  }, []);

  function renderItemRecomendacaoCounteudo({ item: feed }) {
    return (
      <>
        <View style={{ padding: 10 }}>
          <TouchableOpacity
            key={feed.idDoacao}
            activeOpacity={0.6}
            onPress={() => navigation.navigate('editAnimalDoacao', { date_Doacao: feed, user: user, dateRecom: feed.Doacao, recomendacao: true })}
          >
            <Cover source={{ uri: Server.API_PRINC + feed.Animal.Galeria[0].url }} />
          </TouchableOpacity>
          {/* ))} */}
        </View>
      </>
    );
  }

  function renderItemRecomendacaoColaborativa({ item: feed }) {
    return (
      <View style={{ padding: 10 }}>
        <TouchableOpacity
          key={feed.idDoacao}
          activeOpacity={0.6}
          onPress={() => navigation.navigate('editAnimalDoacao', { date_Doacao: feed, user: user, dateRecom: feed.Doacao,  recomendacao: true })}

        >
          <Cover source={{ uri: Server.API_PRINC + feed.Animal.Galeria[0].url }} />
        </TouchableOpacity>
      </View>
    );
  }

  function renderItemDoacao({ item: feed }) {
    return (
      <>
        <View style={styles.boxwhite}>

          <View style={styles.postHeader}>
            <View style={styles.userInfo}>
            </View>

            <View style={styles.postOptions}>

            </View>
          </View>
          <Header>
            <Avatar style={{ borderColor: '#ff9517' }} source={{ uri: Server.API_PRINC + feed.Animal.Galeria[0].url }} />
            <Name>{feed.Animal.nome}</Name>
          </Header>

          <View>
            <Image
              style={styles.picture_url}
              source={{ uri: Server.API_PRINC + feed.Animal.Galeria[0].url }}
            />
          </View>

          <View style={styles.footer}>
            <View style={styles.actions}>
              <View>
                <Grid>
                  <Col style={{ width: "70%" }}>
                    <TouchableOpacity style={styles.action}>
                      <Text style={{ fontSize: 12 }}>{moment(feed.dataRegistro).locale('pt-br').startOf('hour ').fromNow()}</Text>
                    </TouchableOpacity>
                  </Col>

                  <Col style={{ width: "20%" }}>
                    <TouchableOpacity style={styles.action}
                      onPress={() => navigation.navigate('editAnimalDoacao', {
                        date_Doacao: feed,
                        user: user
                      })}>
                      <Text style={{ fontSize: 12 }}>Ver mais</Text>
                    </TouchableOpacity>
                  </Col>
                  <Col style={{ width: "10%" }}>

                    <TouchableOpacity>
                      <View style={{ alignSelf: 'flex-end', flexDirection: 'row-reverse', marginBottom: 30 }}>
                        <MaterialIcons
                          name="call-made"
                          //color={colors.text}
                          size={20}
                        />
                      </View>
                    </TouchableOpacity>
                  </Col>
                </Grid>
              </View>
            </View>
          </View>
        </View>
      </>
    );
  }

  function renderItemAchado({ item: feed }) {
    return (
      <View style={styles.boxwhite}>
        {loadingAchado ?
          <View >
            <View style={styles.postHeader}>
              <View style={styles.userInfo}>
              </View>

              <View style={styles.postOptions}>
                <TouchableOpacity>
                </TouchableOpacity>
              </View>
            </View>
            <Header>
              <Avatar style={{ borderColor: '#ff9517' }} source={{ uri: Server.API_PRINC + feed.url }} />
              <Name>{moment(feed.dataRegistro).format('llll')}</Name>
            </Header>

            <View>
              <Image
                style={styles.picture_url}
                source={{ uri: Server.API_PRINC + feed.url }}
              />
            </View>

            <View style={styles.footer}>
              <View style={styles.actions}>
                <View>
                  <Grid>
                    <Col style={{ width: "70%" }}>
                      <TouchableOpacity style={styles.action}>
                        <Text style={{ fontSize: 12 }}>{moment(feed.dataRegistro).locale('pt-br').startOf('hour ').fromNow()}</Text>
                      </TouchableOpacity>
                    </Col>

                    <Col style={{ width: "20%" }}>
                      <TouchableOpacity style={styles.action}
                        onPress={() => navigation.navigate('editAnimalAchado', {
                          date_Achado: feed,
                          user: user
                        })}>
                        <Text style={{ fontSize: 12 }}>Ver mais</Text>
                      </TouchableOpacity>
                    </Col>
                    <Col style={{ width: "10%" }}>

                      <TouchableOpacity>
                        <View style={{ alignSelf: 'flex-end', flexDirection: 'row-reverse', marginBottom: 30 }}>
                          <MaterialIcons
                            name="call-made"
                            size={20}
                          />
                        </View>
                      </TouchableOpacity>
                    </Col>
                  </Grid>
                </View>
              </View>
            </View>
          </View>
          : ''}
      </View>
    );
  }

  function renderItemPerdido({ item: feed }) {
    return (
      <>
        {loadingPerdido ?
          <View style={styles.boxwhite}>
            <View >
              <View style={styles.postHeader}>
                <View style={styles.userInfo}>
                </View>

                <View style={styles.postOptions}>
                  <TouchableOpacity>
                    {/* <Image source={options} /> */}
                  </TouchableOpacity>
                </View>
              </View>
              <Header>
                <Avatar style={{ borderColor: '#ff9517' }} source={{ uri: Server.API_PRINC + feed.Animal.Galeria[0].url }} />
                <Name style={{ fontWeight: 'bold', fontSize: 14 }}>{feed.Animal.nome}</Name>
              </Header>

              <View>
                <Image
                  style={styles.picture_url}
                  source={{ uri: Server.API_PRINC + feed.Animal.Galeria[0].url }}
                />
              </View>

              <View style={styles.footer}>
                <View style={styles.actions}>
                  <View>
                    <Grid>
                      <Col style={{ width: "70%" }}>
                        <TouchableOpacity style={styles.action}>
                          <Text style={{ fontSize: 12 }}>{moment(feed.dataRegistro).locale('pt-br').startOf('hour ').fromNow()}</Text>
                        </TouchableOpacity>
                      </Col>

                      <Col style={{ width: "20%" }}>
                        <TouchableOpacity style={styles.action}
                          onPress={() => navigation.navigate('editAnimalPerdido', {
                            date_Perdido: feed,
                            user: user
                          })}>
                          <Text style={{ fontSize: 12 }}>Ver mais</Text>
                        </TouchableOpacity>
                      </Col>
                      <Col style={{ width: "10%" }}>

                        <TouchableOpacity>
                          <View style={{ alignSelf: 'flex-end', flexDirection: 'row-reverse', marginBottom: 30 }}>
                            <MaterialIcons
                              name="call-made"
                              //color={colors.text}
                              size={20}
                            />
                          </View>
                        </TouchableOpacity>
                      </Col>
                    </Grid>
                  </View>
                </View>
              </View>
            </View>
          </View> : <Spinner color='#ff9517' />}
      </>
    );
  }

  return (
    <>

      <SafeAreaView style={{ flex: 1, backgroundColor: '#323a4e' }}>
        <CustomHeader title="Home" isHome={true} navigation={navigation} />

        <Tabs locked={true} style={{ backgroundColor: '#323a4e' }}
          tabBarBackgroundColor={'#323a4e'}
          tabBarUnderlineStyle={{ backgroundColor: "white" }}
        >
          <Tab heading={
            <TabHeading
              style={{
                backgroundColor: '#323a4e'
              }}
            >
              <Text style={{ color: "white" }}>
                Perdidos
            </Text>
            </TabHeading>
          }>

            {feedPerdido.length > 0 ?
              <ScrollView
                refreshControl={
                  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
              >
                <Content padder style={{ backgroundColor: '#f0f0f0' }}>
                  <FlatList
                    horizontal={false}
                    data={feedPerdido}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItemPerdido}
                  />
                </Content>
              </ScrollView>
              : !loadingPerdido ? <Spinner color='#ff9517' />
                : <Text style={{ textAlign: 'center', padding: 10 }}>Nenhum registro encontrado!</Text>}

          </Tab>

          <Tab heading={
            <TabHeading
              style={{
                backgroundColor: '#323a4e'
              }}
            >
              <Text style={{ color: "white" }}>Achados </Text>
            </TabHeading>
          }>
            {feedAchado.length > 0 ?
              <ScrollView
                refreshControl={
                  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
              >
                <Content padder style={{ backgroundColor: '#f0f0f0' }}>
                  <FlatList
                    data={feedAchado}
                    horizontal={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItemAchado}
                  />

                </Content>
              </ScrollView>
              : !loadingAchado ? <Spinner color='#ff9517' />
                : <Text style={{ textAlign: 'center', padding: 10 }}>Nenhum registro encontrado!</Text>}
          </Tab>

          <Tab heading={
            <TabHeading
              style={{
                backgroundColor: '#323a4e'
              }}
            >
              <Text style={{ color: "white" }}>
                Doações
            </Text>
            </TabHeading>
          }>

            {feedDoacao.length > 0 ?

              <ScrollView
                refreshControl={
                  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
              >
                <Content padder style={{ backgroundColor: '#f0f0f0' }}>


                  <Renderif test={feedConteudo != ''}>

                    <Text style={{ fontWeight: 'bold', padding: 5 }}>Recomendados para você</Text>

                    <FlatList
                      horizontal={true}
                      data={feedConteudo}
                      keyExtractor={(feedConteudo, index) => index.toString()}
                      renderItem={renderItemRecomendacaoCounteudo}
                    />

                  </Renderif>

                  <Renderif test={feedColaborativo != ''}>

                    <Text style={{ fontWeight: 'bold', padding: 5 }}>Outras pessoas gostaram</Text>

                    <FlatList
                      horizontal={true}
                      data={feedColaborativo}
                      keyExtractor={(feedColaborativo, index) => index.toString()}
                      renderItem={renderItemRecomendacaoColaborativa}
                    />

                  </Renderif>
                  <Text style={{ fontWeight: 'bold', padding: 10, fontSize: 18 }}>Doações</Text>

                  <FlatList
                    data={feedDoacao}
                    horizontal={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItemDoacao}
                  />

                </Content>
              </ScrollView>
              : !loadingDoado ? <Spinner color='#ff9517' />
                : <Text style={{ textAlign: 'center', padding: 10 }}>Nenhum registro encontrado!</Text>}

          </Tab>
        </Tabs>
      </SafeAreaView>
    </>
  );
}

export default HomeAPScreen;

const styles = StyleSheet.create({

  boxwhite: {
    backgroundColor: "white",
    flex: 1,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10
  },

  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  postOptions: {},
  userInfo: {},
  author: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold'
  },
  place: {
    fontSize: 12,
    color: '#666'
  },
  picture_url: {
    width: '100%',
    height: 400
  },
  footer: {
    paddingHorizontal: 15
  },
  actions: {
    paddingVertical: 15
  },
  action: {
    marginRight: 8
  },
  leftActions: {
    flexDirection: 'row'
  },

});

