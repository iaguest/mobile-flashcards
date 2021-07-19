import React from 'react';
import { connect } from 'react-redux'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { DeckInfo } from './DeckInfo'
import { blue, white } from '../colors'
import { handleDeleteDeck } from '../actions'

class Deck extends React.Component {
  setTitle = (title) => {
    this.props.navigation.setOptions({ title} );
  }
  componentDidMount(){
    this.setTitle(this.props.deck.title);
  }
  shouldComponentUpdate(nextProps) {
    return !!nextProps.deck;
  }
  deleteDeck = (id) => {
    const { dispatch, navigation } = this.props;
    dispatch(handleDeleteDeck(id));
    navigation.goBack();
  }
  render() {
    const { deck, navigation } = this.props;
    return (
      <View style={styles.container}>
        <DeckInfo name={deck.title} numCards={deck.questions.length}/>
        <TouchableOpacity
          onPress={() => navigation.navigate('Add Card', { id: deck.title })}
          style={styles.button}>
            <Text style={styles.buttonText}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}>
            <Text style={styles.buttonText}>Start Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={(e) => { this.deleteDeck(deck.title) }}>
            <Text style={styles.buttonText}>Delete Deck</Text>
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
    marginTop: 50,
    marginBottom: 90,
  },
  button: {
    backgroundColor: blue,
    padding: 10,
    marginTop: 20,
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

function mapStateToProps(decks, { route }) {
  const { id } = route.params;
  return {
    deck: decks[id]
  }
}

export default connect(mapStateToProps)(Deck);