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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  titleText: {
    fontSize: 25,
    textAlign: 'center'
  },
})

export default connect()(AddDeck);
