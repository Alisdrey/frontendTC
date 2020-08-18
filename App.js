import * as React from 'react';
import { Text, View, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import CustomHeader from './src/CustumHeader';
import CustomDrawerContent from './src/CustomDrawerContent';
import HomeScreen from './src/screens/home/HomeScreen';
import HomeScreenDetail from './src/screens/home/HomeScreenDetail';
import SettingsScreen from './src/screens/home/SettingsScreen';
import SettingsScreenDetail from './src/screens/home/SettingsScreenDetail';
import SplashScreen from './src/SplashScreen';
import SignInScreen from './src/screens/auth/SignInScreen';
import SignUpScreen from './src/screens/auth/SignUpScreen';
import SignUpTwoScreen from './src/screens/auth/SignUpTwoScreen';
import SignUpTreeScreen from './src/screens/auth/SignUpTreeScreen';
import HomeAPScreen from './src/screens/home/HomeAPScreen';
import RegisterAnimalScreen from './src/screens/registerAnimals/RegisterAnimalScreen';
import RegisterPhotoAnimalScreen from './src/screens/registerAnimals/RegisterPhotoAnimalsScreen';






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
      <StackHome.Screen name="TopTabs" children={createTopTabs} />
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

const MaterialTopTabs = createMaterialTopTabNavigator();

function createTopTabs () {
  return (
    <MaterialTopTabs.Navigator>
      <MaterialTopTabs.Screen name="Home" component={HomeScreen} />
      <MaterialTopTabs.Screen name="Settings" component={SettingsScreen} />
    </MaterialTopTabs.Navigator>
  );
}

const Drawer = createDrawerNavigator();

function DrawerNavigator({navigation}){
  return(
    <Drawer.Navigator initialRouteName="HomeAP" 
    drawerContent={() => <CustomDrawerContent  navigation={navigation}/>}>
      <Drawer.Screen name="MenuTab" component={TabNavigator} />
      <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      <Drawer.Screen name="Splash" component={SplashScreen} />
      <Drawer.Screen name="SignIn" component={SignInScreen} />
      <Drawer.Screen name="SignUp" component={SignUpScreen} />
      <Drawer.Screen name="SignUpTwo" component={SignUpTwoScreen} />
      <Drawer.Screen name="SignUpTree" component={SignUpTreeScreen} />
      <Drawer.Screen name="HomeAP" component={HomeAPScreen} />
      <Drawer.Screen name="RegisterAnimal" component={RegisterAnimalScreen} />
      <Drawer.Screen name="RegisterPhotoAnimals" component={RegisterPhotoAnimalScreen} />

    </Drawer.Navigator>
    
  )

}


const StackApp = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer >
      <StackApp.Navigator initialRouteName="HomeAP" >
        <StackApp.Screen name="Home" component={DrawerNavigator} options={navOptionHandler} />
        <StackApp.Screen name="Setting" component={DrawerNavigator} options={navOptionHandler} />
      </StackApp.Navigator>
    </NavigationContainer>

  );
}