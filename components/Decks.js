import React from 'react';
import { connect } from 'react-redux'
import { FlatList, StyleSheet, View } from 'react-native';
import { handleReceiveDecks } from '../actions/index'
import AppLoading from 'expo-app-loading'
import { DeckInfo } from './DeckInfo';

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
  renderItem({item}) {
    return (
      <DeckInfo
        name={item.title}
        numCards={item.questions.length}
        />);
  }
  render() {
    if (!this.state.ready) {
      return <AppLoading />;
    }

    return (
      <View>
        <FlatList
          data={this.props.deckItems}
          renderItem={this.renderItem}
          keyExtractor={item => item.title} />
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center'
  },
  titleText: {
    fontSize: 25
  },
  numCardsText: {
    fontSize: 20
  }
})

function mapStateToProps(decks) {
  return {
    deckItems: Object.values(decks)
  };
}

export default connect(mapStateToProps)(Decks)
