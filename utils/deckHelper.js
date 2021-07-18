export function makeNewDeck(name) {
  return { [name]: { title: name, questions: [] } }
}
