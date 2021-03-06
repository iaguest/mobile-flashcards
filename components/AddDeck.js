import React, {Component} from 'react';
import { handleAddDeck } from '../actions'
import { makeNewDeck } from '../utils/deckHelper'
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View } from 'react-native'
import { connect } from 'react-redux';
import { black, white } from '../colors'

class AddDeck extends Component {
  state = {
    titleInput: '',
  }
  onTitleChange = (titleInput) => {
    this.setState((prevState) => ({
      titleInput,
    }));
  }
  onCreateDeck = () => {
    const id = this.state.titleInput;
    this.props.dispatch(handleAddDeck(makeNewDeck(id)));
    this.setState((prevState) => ({
      titleInput: '',
    }));
    this.props.navigation.navigate('Deck', { id });
  }
  isCreateButtonEnabled = () => {
    return (
      this.state.titleInput &&
      !(this.props.titles.includes(this.state.titleInput))
    );
  }
  render() {
    const { titleInput } = this.state;
    const isButtonEnabled = this.isCreateButtonEnabled();
    return (
      <View style={styles.container}>
          <Text style={styles.titleText}>What is the title of your new deck?</Text>
          <TextInput
            value={titleInput}
            style={styles.textInput}
            placeholder="Deck Title"
            onChangeText={this.onTitleChange}
            />
        <TouchableOpacity
          onPress={this.onCreateDeck}
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
    justifyContent: 'space-between',
    padding: 20,
  },
  titleText: {
    fontSize: 25,
    textAlign: 'center',
  },
  textInput: {
    borderWidth: 1,
    margin: 20,
    padding: 8,
    fontSize: 20,
  },
  button: {
    backgroundColor: black,
    padding: 10,
    marginLeft: 50,
    marginRight: 50, 
    marginBottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: white,
  }
})

function mapStateToProps(decks) {
  return {
    titles: Object.values(decks).map((deck) => deck.title)
  }
}

export default connect(mapStateToProps)(AddDeck);
