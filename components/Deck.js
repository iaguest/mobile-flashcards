import React from 'react';
import { connect } from 'react-redux'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { DeckInfo } from './DeckInfo'
import { black, white, red } from '../colors'
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
  onPressAddCard = () => {
    const { navigation, deck } = this.props;
    navigation.navigate('Add Card', { id: deck.title });
  }
  onPressStartQuiz = () => {
    const { navigation, deck } = this.props;
    navigation.navigate('Quiz', { id: deck.title });
  }
  onPressDelete = () => {
    const { dispatch, navigation, deck } = this.props;
    dispatch(handleDeleteDeck(deck.title));
    navigation.goBack();
  }
  render() {
    const { deck, navigation } = this.props;
    return (
      <View style={styles.container}>
        <DeckInfo name={deck.title} numCards={deck.questions.length}/>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: black}]}
          onPress={this.onPressAddCard}>
            <Text style={[styles.buttonText, {color: white}]}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: white, borderColor: black, borderWidth:1}]}
          onPress={this.onPressStartQuiz}>
            <Text style={[styles.buttonText, {color: black}]}>Start Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={this.onPressDelete}>
            <Text style={[styles.buttonText, {color: red}]}>Delete Deck</Text>
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
    padding: 10,
    marginTop: 20,
    marginLeft: 50,
    marginRight: 50, 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
  }
})

function mapStateToProps(decks, { route }) {
  const { id } = route.params;
  return {
    deck: decks[id]
  }
}

export default connect(mapStateToProps)(Deck);