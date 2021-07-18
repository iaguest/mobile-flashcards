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
        <View style={styles.itemContainer}>
          <Text style={styles.titleText}>{item.title}</Text>
          <Text style={styles.numCardsText}>{item.questions.length} cards</Text>
        </View>
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

export default connect(mapStateToProps)(Decks);
