import React from 'react';
import styles from '../screens/settings/styles';
import { Text, View } from 'react-native';
import Icon from './Icon';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Textarea } from "native-base";

const ProfileItemDoacao = ({
  age,
  info1,
  info2,
  info3,
  info4,
  info5,
  info6,
  location,
  matches,
  name
}) => {
  return (
    <View style={styles.containerProfileItem}>
      <View style={styles.matchesProfileItem}>
        <Text style={styles.matchesTextProfileItem}>
          <FontAwesome name="info-circle" />   {matches}
        </Text>
      </View>

      <Text style={styles.name}>{name}</Text>

      <Text style={styles.descriptionProfileItem}>
        {age} - {location}
      </Text>

      <View style={styles.info}>
        <Text style={styles.iconProfile}>
          <FontAwesome name="hashtag" />
        </Text>
        <Text style={styles.infoContent}>{info1}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.iconProfile}>
          <FontAwesome name="hashtag" />
        </Text>
        <Text style={styles.infoContent}>{info2}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.iconProfile}>
          <FontAwesome name="hashtag" />
        </Text>
        <Text style={styles.infoContent}>{info3}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.iconProfile}>
          <FontAwesome name="hashtag" />
        </Text>
        <Text style={styles.infoContent}>{info4}</Text>
      </View>
    </View>


  );
};

export default ProfileItemDoacao;