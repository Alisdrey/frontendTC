import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native';
import {CustomHeader} from '../../index';

export default class SettingsScreenDetail extends Component {
    render(){
        return (
            <SafeAreaView style={{ flex: 1 }}>
              <CustomHeader title="Setting Detail" navigation={this.props.navigation} />
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Setting Detail</Text>
              </View>
            </SafeAreaView>
        );
    }
}