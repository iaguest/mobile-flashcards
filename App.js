import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getDecks } from './utils/api'

export default class App extends React.Component {
  state = {
    decks: null,
  }
  async componentDidMount() {
    const decks = await getDecks();
    this.setState((prevState) => ({
      decks: decks
    }));
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>{ JSON.stringify(this.state.decks) }</Text>
        <StatusBar style="auto" />
      </View>
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
