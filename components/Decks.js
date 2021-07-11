import React from 'react';
import { connect } from 'react-redux'
import { Text } from 'react-native';
import { getDecks } from '../utils/api'
import { receiveDecks } from '../actions/index'
import AppLoading from 'expo-app-loading'

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
      <Text>{JSON.stringify(this.props.decks)}</Text>
    );
  }
}

function mapStateToProps(decks) {
  return {
    decks
  };
}

export default connect(mapStateToProps)(Decks)
