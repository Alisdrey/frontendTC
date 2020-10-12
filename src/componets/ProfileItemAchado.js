import React from 'react';
import styles from '../screens/settings/styles';
import { Text, View, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Renderif from "../componets/RenderIf";

const ProfileItemAchado = ({
  age,
  info1,
  info2,
  info3,
  info4,
  location,
  matches,
  name,
  navigation,
  iduser,
  iduserAchado,
  detailachado

}) => {
  return (
    <View style={styles.containerProfileItem}>
      <View style={styles.matchesProfileItemAchado}>
        <Text style={styles.matchesTextProfileItem}>
          <FontAwesome name="info-circle" /> {matches}
        </Text>
      </View>
   
        <TouchableOpacity
          onPress={() => navigation.navigate('updateAchado', {
            date_Achado: detailachado
          })}>
          <Text style={styles.name}>{name}  {'  '}    
            <Renderif test={iduser == iduserAchado }>
                <FontAwesome name="edit" />
            </Renderif> 
          </Text>
        </TouchableOpacity> 
      <Text style={styles.descriptionProfileItem}>
        {age} - {location}
      </Text>

      {info1 && <View style={styles.info}>
        <Text style={styles.iconProfile}>
          <FontAwesome name="hashtag" />
        </Text>
        <View style={styles.info,{width:'90%'}}>
          <Text style={styles.infoContent}>{info1}</Text>
        </View>
      </View>}

      {info2 && <View style={styles.info}>
        <Text style={styles.iconProfile}>
          <FontAwesome name="hashtag" />
        </Text>
        <View style={styles.info,{width:'90%'}}>
          <Text style={styles.infoContent}>{info2}</Text>
        </View>
      </View>}

      {info3 && <View style={styles.info}>
        <Text style={styles.iconProfile}>
          <FontAwesome name="hashtag" />
        </Text>
        <View style={styles.info,{width:'90%'}}>
          <Text style={styles.infoContent}>{info3}</Text>
        </View>
      </View>}

      {info4 && <View style={styles.info}>
        <Text style={styles.iconProfile}>
          <FontAwesome name="hashtag" />
        </Text>
        <View style={styles.info,{width:'90%'}}>
          <Text style={styles.infoContent}>{info4}</Text>
        </View>
      </View>}


    </View>


  );
};

export default ProfileItemAchado;