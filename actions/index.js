import {
  getDecks,
  saveDeckTitle,
  removeDeck,
  addCardToDeck
} from '../utils/api'

export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const DELETE_DECK = 'DELETE_DECK';
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

function deleteDeck(id) {
  return {
    type: DELETE_DECK,
    id
  }
}

export function handleDeleteDeck(id) {
  return async (dispatch) => {
    dispatch(deleteDeck(id));
    removeDeck(id);
  };
}

function addCard(id, card) {
  return {
    type: ADD_CARD,
    id,
    card
  }
}

export function handleAddCard(id, card) {
  return async (dispatch) => {
    dispatch(addCard(id, card));
    addCardToDeck(id, card);
  }
}