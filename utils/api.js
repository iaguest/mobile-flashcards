import { AsyncStorage } from "react-native"
import { makeNewDeck } from '../utils/deckHelper'

export const DECKS_STORAGE_KEY = 'Mobile-Flashcards:decks'

const _defaultDecks = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}

function defaultDecks() {
  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(_defaultDecks));
  return _defaultDecks;   
}

// return all of the decks along with their titles, questions, and answers.
export async function getDecks() {
  const decks = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
  return decks === null ? defaultDecks() : JSON.parse(decks); 
}

// take in a single id argument and return the deck associated with that id.
export async function getDeck(id) {
  const decks = await getDecks();
  return decks[id];
}

// take in a single id argument and delete the deck associated with that id.
export async function removeDeck(id) {
  const decks = await getDecks();
  decks[id] = undefined;
  delete decks[id];
  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
}

// take in a single title argument and add it to the decks.
export async function saveDeckTitle(title) {
  const newEntry = makeNewDeck(title);
  return await AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(newEntry));
}

// take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.
export async function addCardToDeck(title, card) {
  let deck = await getDeck(title);
  deck.questions.push(card);
  return await AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [title]: deck,
  }))
}
