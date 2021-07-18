import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './Decks';

export function DeckInfo({ name, numCards }) {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.titleText}>{name}</Text>
      <Text style={styles.numCardsText}>{numCards} cards</Text>
    </View>
  );
}
