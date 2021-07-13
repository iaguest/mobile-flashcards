import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux';

class AddDeck extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>What is the title of your new deck?</Text>
      </View>

    );
  }
}

// TODO: Consolidate styles here with Decks
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    margin: 20,
    alignItems: 'center'
  },
  titleText: {
    fontSize: 25
  },
})

export default connect()(AddDeck);
