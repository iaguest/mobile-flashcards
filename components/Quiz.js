import React from 'react';
import { connect } from 'react-redux'
import {
  Text,
  View
} from 'react-native'

class Quiz extends React.Component {
  render() {
    return (
      <Text>
        Hello world!
      </Text>
    );
  }
}

function mapStateToProps(decks, { route }) {
  const { id } = route.params;
  return {
    questions: decks[id].questions
  }
}

export default connect(mapStateToProps)(Quiz);