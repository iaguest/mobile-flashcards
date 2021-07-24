import React from 'react';
import { connect } from 'react-redux'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { green, red, white } from '../colors'

class Quiz extends React.Component {
  state = {
    qIndex: 0,
    isShowingQuestion: true
  }
  onFlipCard = (e) => {
    this.setState((prev) =>({
      isShowingQuestion: !this.state.isShowingQuestion
    }));
  }
  render() {
    const { questions } = this.props;
    const { qIndex, isShowingQuestion: isShowQuestion } = this.state;
    const { question, answer } = questions[qIndex];
    return (
      <View style={styles.container}>
        <Text>{`${qIndex + 1}/${questions.length}`}</Text>
        <Text
          style={styles.questionAnswerText}>
            {isShowQuestion ? question : answer}
        </Text>
        <TouchableOpacity>
          <Text
            onPress={this.onFlipCard}
            style={styles.flipText}>
              {isShowQuestion ? 'Answer' : 'Question'}
          </Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: green}]}>
              <Text style={styles.buttonText}>
                Correct
              </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: red}]}>
              <Text style={styles.buttonText}>
                Incorrect
              </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  questionAnswerText: {
    fontSize: 30,
    textAlign: 'center',   
  },
  flipText: {
    fontSize: 22,
    textAlign: 'center',      
  },
  button: {
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

function mapStateToProps(decks, { route }) {
  const { id } = route.params;
  return {
    questions: decks[id].questions
  }
}

export default connect(mapStateToProps)(Quiz);