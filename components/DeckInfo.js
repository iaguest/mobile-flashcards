import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function DeckInfo({ name, numCards }) {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.titleText}>{name}</Text>
      <Text style={styles.numCardsText}>{numCards} cards</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center'
  },
  titleText: {
    fontSize: 25
  },
  numCardsText: {
    fontSize: 20
  }
})