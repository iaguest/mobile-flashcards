import React from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux';
import reducer from './reducers'
import AddDeck from './components/AddDeck';
import Decks from './components/Decks'
import Deck from './components/Deck'
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Constants from 'expo-constants'
import { white } from './colors'
import middleware from './middleware'

function AppStatusBar({backgroundColor, ...props}) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Home(props) {
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: {
          fontSize: 20,
        },
        style: {
          height: 90,
        }
      }} >
      <Tab.Screen
        name="Decks"
        component={Decks}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="cards" size={size} color={color}/>
          )
        }} />
      <Tab.Screen
        name="Add Deck"
        component={AddDeck}
        options={{
          tabBarIcon: ({color, size}) => (
            <AntDesign name="plus" size={size} color={color} />
          )
        }} />
    </Tab.Navigator>
  );
}

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer, middleware)}>
        <AppStatusBar backgroundColor={white} barStyle='light-content'/>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerBackTitleVisible: false}}>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{headerTitle: false}}/>
            <Stack.Screen
              name="Deck"
              component={Deck}
              options={{headerTitleAlign: 'center'}}/>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
