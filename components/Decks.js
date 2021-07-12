import React from 'react';
import { connect } from 'react-redux'
import { StyleSheet, Text, View } from 'react-native';
import { getDecks } from '../utils/api'
import { receiveDecks } from '../actions/index'
import AppLoading from 'expo-app-loading'
import { white } from '../colors'

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
  render() {
    if (!this.state.ready) {
      return <AppLoading />;
    }

    return (
      <View>
        { Object.entries(this.props.decks).map(([key, value]) => (
            <View key={key} style={styles.item}>
              <Text style={styles.titleText}>{key}</Text>
              <Text style={styles.numCardsText}>{value.questions.length} cards</Text>
            </View>
          ))
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    padding: 20,
    margin: 20,
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
    decks
  };
}

export default connect(mapStateToProps)(Decks)
