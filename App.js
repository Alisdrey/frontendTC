import * as React from 'react';
import { Text, View, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import CustomHeader from './src/CustumHeader';
import CustomDrawerContent from './src/CustomDrawerContent';
import HomeScreen from './src/screens/home/HomeScreen';
import HomeScreenDetail from './src/screens/home/HomeScreenDetail';
import SettingsScreen from './src/screens/home/SettingsScreen';
import SettingsScreenDetail from './src/screens/home/SettingsScreenDetail';

import NotificationsScreen from './src/componets/drawer/NotificationsScreen';

const Tab = createBottomTabNavigator();

const navOptionHandler = () => ({
  headerShown: false
})

const StackHome = createStackNavigator();


function HomeStack() {
  return (
    <StackHome.Navigator>
      <StackHome.Screen name="HomeScreen" component={HomeScreen} options={navOptionHandler} />
      <StackHome.Screen name="HomeDetail" component={HomeScreenDetail} options={navOptionHandler} />
    </StackHome.Navigator>
  )
}

const StackSetting = createStackNavigator();


function SettingStack() {
  return (
    <StackSetting.Navigator initialRouteName="Setting">
      <StackSetting.Screen name="Setting" component={SettingsScreen} options={navOptionHandler} />
      <StackSetting.Screen name="SettingDetail" component={SettingsScreenDetail} options={navOptionHandler} />
    </StackSetting.Navigator>
  )
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? require('./src/source/home-white.png')
              : require('./src/source/home-black.png')
          } else if (route.name === 'Settings') {
            iconName = focused
              ? require('./src/source/setting-white.png')
              : require('./src/source/setting-black.png');
          }

          // You can return any component that you like here!
          return <Image source={iconName} style={{ width: 20, height: 20 }}
            resizeMode={'contain'} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'red',
        inactiveTintColor: 'black',
      }}

    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Settings" component={SettingStack} />
    </Tab.Navigator>
  )
}

const Drawer = createDrawerNavigator();

function DrawerNavigator({navigation}){
  return(
    <Drawer.Navigator initialRouteName="MenuTab" 
    drawerContent={() => <CustomDrawerContent  navigation={navigation}/>}>
      <Drawer.Screen name="MenuTab" component={TabNavigator} />
      <Drawer.Screen name="Notifications" component={NotificationsScreen} />
    </Drawer.Navigator>
  )

}


const StackApp = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <StackApp.Navigator initialRouteName="Setting" >
        <StackApp.Screen name="Setting" component={DrawerNavigator} options={navOptionHandler} />
      </StackApp.Navigator>
    </NavigationContainer>
  );
}