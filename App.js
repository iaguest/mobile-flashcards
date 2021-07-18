import React from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux';
import reducer from './reducers'
import AddDeck from './components/AddDeck';
import Decks from './components/Decks'
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
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

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer, middleware)}>
        <AppStatusBar backgroundColor={white} barStyle='light-content'/>
        <NavigationContainer>
          <Tab.Navigator
            tabBarOptions={{
              labelStyle: {
                fontSize: 20,
              },
              style: {
                height: 90,
              }
            }}
          >
            <Tab.Screen
              name="Decks"
              component={Decks}
              options={{
                tabBarIcon: ({color, size}) => (
                  <MaterialCommunityIcons name="cards" size={size} color={color}/>
                )
              }}
            />
            <Tab.Screen
              name="Add Deck"
              component={AddDeck}
              options={{
                tabBarIcon: ({color, size}) => (
                  <AntDesign name="plus" size={size} color={color} />
                )
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
