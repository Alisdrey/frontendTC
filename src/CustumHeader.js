import React, { Component } from 'react';
import { Text, StatusBar, View, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native';

export class CustomHeader extends Component {
    render() {
        return (
            <View style={{ flexDirection: 'row', height: 50, backgroundColor: '#323a4e' }}>
                <StatusBar backgroundColor='#323a4e' barStyle="light-content" />

                <View style={{ flex: 1, justifyContent: 'center' }}>
                    {
                        this.props.isHome ?
                            <TouchableOpacity
                                onPress={() => this.props.navigation.openDrawer()}>
                                <Image style={{ width: 25, height: 26, marginLeft: 20, bottom: 1 }}
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
                    <Image style={{ width: 300, height: 15, marginLeft: 5 }}
                        source={require('./source/header-logo.png')}
                        resizeMode='contain' />

                </View>
                <View style={{ flex: 1 }}></View>
            </View>
        )
    }
}