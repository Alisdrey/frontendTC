import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native';

export default class CustomDrawerContent extends Component{
    render(props){
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'green' }}>
              <View style={{height:150, alignItems: 'center', justifyContent: 'center'}}>
                <Image source={require('./source/user.png')} style={{height: 120,width: 120, borderRadius: 60}}/>
        
              </View>
              <ScrollView style={{marginLeft: 5}}>
                <TouchableOpacity
                  style={{ marginTop: 20 }}
                  onPress={() => this.props.navigation.navigate('HomeAP')}
                >
                  <Text>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ marginTop: 20 }}
                  onPress={() => this.props.navigation.navigate('RegisterAnimal')}
                >
                  <Text>Cadastrar Animal</Text>
                </TouchableOpacity>
              </ScrollView>
            </SafeAreaView>
        
        )
    }
}