import React from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux';
import reducer from './reducers'
import AddDeck from './components/AddDeck';
import Decks from './components/Decks'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TabBarIOS, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <StatusBar style="auto" />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
