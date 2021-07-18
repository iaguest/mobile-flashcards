import React, {Component} from 'react';
import { handleAddDeck } from '../actions'
import { makeNewDeck } from '../utils/deckHelper'
import { saveDeckTitle } from '../utils/api'
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View } from 'react-native'
import { connect } from 'react-redux';
import { blue, white } from '../colors'

class AddDeck extends Component {
  state = {
    titleInput: '',
  }
  handleTitleChange = (titleInput) => {
    this.setState((prevState) => ({
      titleInput,
    }));
  }
  handleCreateDeck = () => {
    const { dispatch } = this.props;
    dispatch(handleAddDeck(makeNewDeck(this.state.titleInput)));
    this.setState((prevState) => ({
      titleInput: '',
    }));
  }
  isCreateButtonEnabled = () => {
    return this.state.titleInput;
  }
  render() {
    const { titleInput } = this.state;
    const isButtonEnabled = this.isCreateButtonEnabled();
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>What is the title of your new deck?</Text>
        <TextInput
          value={titleInput}
          style={styles.titleInput}
          onChangeText={this.handleTitleChange}
        />
        <TouchableOpacity
          onPress={this.handleCreateDeck}
          style={[styles.button, {opacity: (isButtonEnabled ? 1 : 0.5)}]}
          disabled={!isButtonEnabled}>
            <Text style={styles.buttonText}>
              Create Deck
            </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    padding: 20,
  },
  titleText: {
    fontSize: 25,
    textAlign: 'center',
  },
  titleInput: {
    borderWidth: 1,
    margin: 20,
    padding: 8,
    fontSize: 20,
  },
  button: {
    backgroundColor: blue,
    padding: 10,
    marginLeft: 50,
    marginRight: 50, 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: white,
  }
})

export default connect()(AddDeck);
