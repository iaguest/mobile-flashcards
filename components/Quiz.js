import React from 'react';
import { connect } from 'react-redux'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { green, red, white, black, gold } from '../colors'
import { AntDesign } from '@expo/vector-icons';

class Quiz extends React.Component {
  state = {
    qIndex: 0,
    isShowingQuestion: true,
    correctCount: 0
  }
  onFlipCard = (e) => {
    this.setState((prev) =>({
      isShowingQuestion: !this.state.isShowingQuestion
    }));
  }
  onPressResult = (points) => {
    this.setState((prevState) => ({
      correctCount: prevState.correctCount + points,
      qIndex: prevState.qIndex + 1,
      isShowingQuestion: true
    }));
  }
  onPressRestart = () => {
    this.setState((prevState) => ({
      qIndex: 0,
      isShowingQuestion: true,
      correctCount: 0
    }));
  }
  onPressReturn = () => {
    const { navigation, id } = this.props;
    navigation.goBack();
  }
  scorePercent = () => {
    return (
        (this.state.correctCount / this.props.questions.length) * 100
      ).toFixed(1);
  }
  render() {
    const { questions } = this.props;
    const { qIndex, isShowingQuestion: isShowQuestion } = this.state;
    const numQuestions = questions.length;
    return ((qIndex !== numQuestions) ? (
        <View style={styles.container}>
          <Text style={{color:'black', fontSize: 15}}>
            {`${qIndex + 1}/${numQuestions}`}
          </Text>
          <Text style={styles.questionAnswerText}>
              {isShowQuestion ? questions[qIndex].question : questions[qIndex].answer}
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
              onPress={() => this.onPressResult(1)}
              style={[styles.button, {backgroundColor: green}]}>
                <Text style={styles.buttonText}>
                  Correct
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.onPressResult(0)}
              style={[styles.button, {backgroundColor: red}]}>
                <Text style={styles.buttonText}>
                  Incorrect
                </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View
          style={[styles.container,
          {justifyContent: 'center'}]}>
          <Text style={styles.scoreText}>
            You scored {this.scorePercent()}%!
          </Text>
          { (this.state.correctCount === numQuestions) && (
              <AntDesign style={styles.icon} name="star" size={50} color={gold} />
            )
          }
          <View style={{marginTop:50}}>
              <TouchableOpacity
                onPress={this.onPressRestart}
                style={[styles.button, {backgroundColor: black}]}>
                  <Text style={styles.buttonText}>
                    Restart
                  </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.onPressReturn}
                style={[styles.button, {backgroundColor: white}]}>
                  <Text style={[styles.buttonText, {color:black}]}>
                    Return to Deck
                  </Text>
              </TouchableOpacity>
            </View>
        </View>
      )
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
  scoreText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: black   
  },
  flipText: {
    fontSize: 22,
    textAlign: 'center',
    color: red     
  },
  button: {
    padding: 10,
    marginLeft: 50,
    marginRight: 50, 
    marginBottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: black,
    borderWidth: 1
  },
  buttonText: {
    fontSize: 20,
    color: white,
  },
  icon: {
    textAlign:'center',
    padding: 20
  }
})

function mapStateToProps(decks, { route }) {
  const { id } = route.params;
  return {
    questions: decks[id].questions
  }
}

export default connect(mapStateToProps)(Quiz);