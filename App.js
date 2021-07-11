import React from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux';
import reducer from './reducers'
import Decks from './components/Decks'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <StatusBar style="auto" />
        <View style={styles.container}>
          <Decks />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
