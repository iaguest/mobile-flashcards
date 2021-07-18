import React from 'react';
import { connect } from 'react-redux'
import { View } from 'react-native'
import { DeckInfo } from './DeckInfo'

class Deck extends React.Component {
  setTitle = (title) => {
    this.props.navigation.setOptions({ title} );
  }
  componentDidMount(){
    this.setTitle(this.props.deck.title);
  }
  render() {
    const { deck } = this.props;
    return (
      <View>
        <DeckInfo name={deck.title} numCards={deck.questions.length}/>
      </View>
    );
  }
}

function mapStateToProps(decks, { route }) {
  const { id } = route.params;
  return {
    deck: decks[id]
  }
}

export default connect(mapStateToProps)(Deck);