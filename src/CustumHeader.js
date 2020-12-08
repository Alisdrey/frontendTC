import React, { Component } from 'react';
import { Text, StatusBar, View, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native';

export class CustomHeader extends Component {
    render() {
        return (
            <View style={{ flexDirection: 'row', height: 50, backgroundColor: '#323a4e' }}>
                <StatusBar backgroundColor='#323a4e' barStyle="light-content" />

                <View style={{ bottom: -10, width:150 }}>
                    {
                        this.props.isHome ?
                            <TouchableOpacity
                            style={{ width: '100%' }}
                                onPress={() => this.props.navigation.openDrawer()}>
                                <Image style={{ width: 30, height: 26, marginLeft: 30, bottom: 1 }}
                                    source={require('./source/menu6.png')}
                                />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={{ flexDirection: 'row', alignContent: 'center' }}
                                onPress={() => this.props.navigation.goBack()}>
                                <Image style={{ width: 25, height: 25, marginLeft: 5 }}
                                    source={require('./source/arrow.png')}
                                    resizeMode='contain' />
                            </TouchableOpacity>
                    }
                </View>
                
                <View style={{ justifyContent: 'center' }}>
                    <Image style={{ width: 300, height: 15, left: -100 }}
                        source={require('./source/header-logo.png')}
                        resizeMode='contain' />

                </View>
            </View>
        )
    }
}