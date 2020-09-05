import React from 'react';
import styles from '../screens/settings/styles';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from './Icon';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Textarea } from "native-base";
import Renderif from "../componets/RenderIf";

const ProfileItemAchado = ({
  age,
  info5,
  info6,
  info7,
  location,
  matches,
  name,
  navigation,
  iduser,
  iduserPerdido

}) => {
  return (
    <View style={styles.containerProfileItem}>
      <View style={styles.matchesProfileItem}>
        <Text style={styles.matchesTextProfileItem}>
          <FontAwesome name="info-circle" />   {matches}
        </Text>
      </View>
   
        <TouchableOpacity
          onPress={() => navigation.navigate('updateAchado', {
            date_Achado: info7
          })}>
          <Text style={styles.name}>{name}  {'  '}    
            <Renderif test={iduser == iduserPerdido }>
                <FontAwesome name="edit" />
            </Renderif> 
          </Text>
        </TouchableOpacity> 
      <Text style={styles.descriptionProfileItem}>
        {age} - {location}
      </Text>

      <View style={styles.info}>
        <Text style={styles.iconProfile}>
          <FontAwesome name="hashtag" />
        </Text>
        <View style={styles.info,{width:'90%'}}>
          <Text style={styles.infoContent}>{info5}</Text>
        </View>
      </View>

      <View style={styles.info}>
        <Text style={styles.iconProfile}>
          <FontAwesome name="hashtag" />
        </Text>
        <View style={styles.info,{width:'90%'}}>
          <Text style={styles.infoContent}>{info6}</Text>
        </View>
      </View>



    </View>


  );
};

export default ProfileItemAchado;