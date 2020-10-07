import React from 'react';
import styles from '../screens/settings/styles';
import { Text, View, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Renderif from "../componets/RenderIf";


const ProfileItem = ({
  age,
  info1,
  info2,
  info3,
  info4,
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
      <View style={styles.matchesProfileItemPerdido}>
        <Text style={styles.matchesTextProfileItem}>
          <FontAwesome name="info-circle" />   {matches}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('updatePerdido', {
          date_Perdido: info7
        })}><Text style={styles.name}>{name}   <Renderif test={iduser == iduserPerdido}>
          <FontAwesome name="edit" />
        </Renderif> </Text>
      </TouchableOpacity>

      <Text style={styles.descriptionProfileItem}>
        {age} - {location}
      </Text>

      {info1 && <View style={styles.info}>
        <Text style={styles.iconProfile}>
          <FontAwesome name="hashtag" />
        </Text>
        <Text style={styles.infoContent}>{info1}</Text>
      </View>}

      {info2 && <View style={styles.info}>
        <Text style={styles.iconProfile}>
          <FontAwesome name="hashtag" />
        </Text>
        <Text style={styles.infoContent}>{info2}</Text>
      </View>}

      {info3 && <View style={styles.info}>
        <Text style={styles.iconProfile}>
          <FontAwesome name="hashtag" />
        </Text>
        <Text style={styles.infoContent}>{info3}</Text>
      </View>}

      {info4 && <View style={styles.info}>
        <Text style={styles.iconProfile}>
          <FontAwesome name="hashtag" />
        </Text>
        <Text style={styles.infoContent}>{info4}</Text>
      </View>}


      {info5 && <View style={styles.info}>
        <Text style={styles.iconProfile}>
          <FontAwesome name="hashtag" />
        </Text>
        <View style={styles.info, { width: '90%' }}>
          <Text style={styles.infoContent}>{info5}</Text>
        </View>
      </View>}

      {info6 && <View style={styles.info}>
        <Text style={styles.iconProfile}>
          {/* <FontAwesome name="hashtag" /> */}
        </Text>
        <Text style={styles.infoContent}>{info6}</Text>
      </View>}



    </View>


  );
};

export default ProfileItem;