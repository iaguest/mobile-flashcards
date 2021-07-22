export function makeNewDeck(name) {
  return { [name]: { title: name, questions: [] } }
}

export function makeCard(questionValue, answerValue) {
  return { question: questionValue, answer: answerValue };
}
