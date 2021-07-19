import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
  Text
} from 'react-native'

class AddCard extends Component {
  render() {
    const { id } = this.props;
    return (
      <Text>{`Deck id is ${id}`}</Text>
    );
  }
}

function mapStateToProps(decks, { route }) {
  const { id } = route.params;
  return {
    id
  }
}

export default connect(mapStateToProps)(AddCard);
