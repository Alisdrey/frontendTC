import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Right,
} from 'react-native';
import {CustomHeader} from '../../index';
import { Col, Row, Grid } from "react-native-easy-grid";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Server from '../settings/Server';
import { Container, Post, Header, Avatar, Name, Description, Loading } from './styles';
import moment from "moment/min/moment-with-locales";
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


const HomeAPScreen = ({ navigation, props }) => {


  const [feed, setFeed] = useState([]);


  useEffect(() => {
    const url = Server.API_GET_DOADO
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson) {
          console.log(responseJson)

          setFeed(responseJson);

        }
      })
      .catch(err => {
        console.log(err);
      });

  }, []);

  function renderItem({ item: feed }) {
    return (
      <View style={styles.boxwhite}>
        <View >
          <View style={styles.postHeader}>
            <View style={styles.userInfo}>
              {/* <Text style={styles.author}>{post.author}</Text>
            <Text style={styles.place}>{post.place}</Text> */}
            </View>

            <View style={styles.postOptions}>
              <TouchableOpacity>
                {/* <Image source={options} /> */}
              </TouchableOpacity>
            </View>
          </View>
          <Header>
            <Avatar source={{ uri: Server.API_PRINC + feed.Animal.Galeria[0].url }} />
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

                  <Col style={{ width: "15%" }}>
                    <Text style={{ fontSize: 12 }}>Ver mais</Text>
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
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomHeader title="Home" isHome={true} navigation={navigation} />
      <FlatList
        data={feed}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </SafeAreaView>

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
    marginBottom: 15
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
    // flexDirection: 'row',
    //justifyContent: 'space-between',
    paddingVertical: 15
  },
  action: {
    marginRight: 8
  },
  leftActions: {
    flexDirection: 'row'
  },



});

