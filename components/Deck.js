import React from 'react';
import { connect } from 'react-redux'
import { Text, View } from 'react-native'

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
        <Text>{deck.title}</Text>
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