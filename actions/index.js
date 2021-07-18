import { getDecks, saveDeckTitle } from '../utils/api'

export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const REMOVE_DECK = 'REMOVE_DECK';
export const ADD_CARD = 'ADD_CARD';

function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  }
}

export function handleReceiveDecks() {
  return async (dispatch) => {
    const decks = await getDecks();
    dispatch(receiveDecks(decks));
  };
}

function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck
  }
}

export function handleAddDeck(deck) {
  return async (dispatch) => {
    dispatch(addDeck(deck));
    saveDeckTitle(Object.values(deck)[0].title);
  };
}

export function removeDeck(id) {
  return {
    type: REMOVE_DECK,
    id
  }
}

export function addCard(id, card) {
  return {
    type: ADD_CARD,
    id,
    card
  }
}