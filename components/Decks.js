import React from 'react';
import { connect } from 'react-redux'
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { getDecks } from '../utils/api'
import { receiveDecks } from '../actions/index'
import AppLoading from 'expo-app-loading'
import { white } from '../colors'

function DeckItem({ name, numCards }) {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.titleText}>{name}</Text>
      <Text style={styles.numCardsText}>{numCards} cards</Text>
    </View>    
  );
}

class Decks extends React.Component {
  state = {
    ready: false
  }
  async componentDidMount() {
    const { dispatch } = this.props;
    const decks = await getDecks();
    dispatch(receiveDecks(decks));
    this.setState((prevState)=>({
      ready: true
    }));
  }
  renderItem({item}) {
    return (
      <DeckItem
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

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    padding: 0,
     margin: 10,
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
