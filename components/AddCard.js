import React, {Component} from 'react';
import { connect } from 'react-redux';
import { handleAddCard } from '../actions'
import { makeCard } from '../utils/deckHelper';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { black, white } from '../colors'

class AddCard extends Component {
  state = {
    questionInput: '',
    answerInput: ''
  }
  handleQuestionChange = (questionInput) => {
    this.setState((prevState) => ({
      questionInput,
    }));
  }
  handleAnswerChange = (answerInput) => {
    this.setState((prevState) => ({
      answerInput,
    }))
  }
  onSubmit = () => {
    const { dispatch, id } = this.props;
    const { questionInput, answerInput } = this.state;
    dispatch(handleAddCard(id, makeCard(questionInput, answerInput)));
    this.setState((prevState) => ({
      questionInput: '',
      answerInput: ''
    }))
  }
  isSubmitButtonEnabled = () => {
    return (
      this.state.questionInput &&
      this.state.answerInput
    );
  }
  render() {
    const { questionInput, answerInput } = this.state;
    const isButtonEnabled = this.isSubmitButtonEnabled();
    return (
      <View style={styles.container} >
        <View style={styles.inputGroup}>
          <TextInput
            value={questionInput}
            style={styles.textInput}
            placeholder="Question"
            onChangeText={this.handleQuestionChange} />
          <TextInput
            value={answerInput}
            style={styles.textInput}
            placeholder="Answer"
            onChangeText={this.handleAnswerChange} />
        </View>
        <TouchableOpacity
          onPress={this.onSubmit}
          style={[styles.button, {opacity: (isButtonEnabled ? 1 : 0.5)}]} 
          disabled={!isButtonEnabled}>
            <Text style={styles.buttonText}>
              Submit
            </Text>
        </TouchableOpacity>      
      </View>
    );
  }
}

function mapStateToProps(decks, { route }) {
  const { id } = route.params;
  return {
    id
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    padding: 20,
  },
  inputGroup: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  textInput: {
    borderWidth: 1,
    margin: 20,
    padding: 8,
    fontSize: 20,
  },
  button: {
    backgroundColor: black,
    padding: 10,
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: white,
  }
})

export default connect(mapStateToProps)(AddCard);
