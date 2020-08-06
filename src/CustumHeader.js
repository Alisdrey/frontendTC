import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native';

export class CustomHeader extends Component {
    render() {
        return (
            <View style={{ flexDirection: 'row', height: 50 }}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    {
                        this.props.isHome ?
                            <TouchableOpacity
                                onPress={() => this.props.navigation.openDrawer()}>
                                <Image style={{ width: 30, height: 30, marginLeft: 5 }}
                                    source={require('./source/menu-aberto.png')}
                                    resizeMode='contain' />
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
                    <Text style={{ textAlign: 'center' }}>{this.props.title}</Text>
                </View>
                <View style={{ flex: 1 }}></View>
            </View>
        )
    }
}