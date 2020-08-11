import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native';
import {CustomHeader} from '../../index';

export default class HomeScreen extends Component {
    render(){
        return (
            <SafeAreaView style={{ flex: 1 }}>
              <CustomHeader title="Home" isHome={true} navigation={this.props.navigation} />
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Home!</Text>
                <TouchableOpacity
                  style={{ marginTop: 20 }}
                  onPress={() => this.props.navigation.navigate('Splash')}
                >
                  <Text>Go home detail</Text>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
        );
    }
}