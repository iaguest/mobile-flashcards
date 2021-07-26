import React from 'react';
import { connect } from 'react-redux'
import {
  FlatList,
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
  onPressDeck = (item) => {
    this.props.navigation.navigate('Deck', { id: item.title });
  }
  renderItem = ({item}) => (
      <TouchableOpacity onPress={() => this.onPressDeck(item)}>
        <DeckInfo name={item.title} numCards={item.questions.length} />
      </TouchableOpacity>
  );
  render() {
    if (!this.state.ready) {
      return <AppLoading />;
    }

    return (
      <View>
        <FlatList
          data={this.props.items}
          renderItem={ this.renderItem }
          keyExtractor={item => item.title} />
      </View>
    );
  }
}

function mapStateToProps(decks) {
  return {
    items: Object.values(decks)
  };
}

export default connect(mapStateToProps)(Decks);
