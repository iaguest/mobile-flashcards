import React from 'react';
import { connect } from 'react-redux'
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { handleReceiveDecks } from '../actions/index'
import AppLoading from 'expo-app-loading'
import { DeckInfo } from './DeckInfo'

class Decks extends React.Component {
  state = {
    ready: false
  }
  async componentDidMount() {
    this.props.dispatch(handleReceiveDecks());
    this.setState((prevState)=>({
      ready: true
    }));
  }
  renderItem({item}, navigation) {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Deck', { id: item.title })}>
        <DeckInfo name={item.title} numCards={item.questions.length} />
      </TouchableOpacity>
    );
  }
  render() {
    if (!this.state.ready) {
      return <AppLoading />;
    }

    return (
      <View>
        <FlatList
          data={this.props.deckItems}
          renderItem={ (e) => this.renderItem(e, this.props.navigation) }
          keyExtractor={item => item.title} />
      </View>
    );
  }
}

function mapStateToProps(decks) {
  return {
    deckItems: Object.values(decks)
  };
}

export default connect(mapStateToProps)(Decks);
