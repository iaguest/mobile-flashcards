import { RECEIVE_DECKS, ADD_DECK, DELETE_DECK, ADD_CARD } from "../actions";

function decks(state={}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      }
    case ADD_DECK:
      return {
        ...state,
        ...action.deck
      }
    case DELETE_DECK:
      let { [action.id]: _, ...updated } = state
      return {
        ...updated
      }
    case ADD_CARD:
      const id = action.id;
      return {
        ...state,
        [id]: {
          ...state[id],
          questions: [
            ...state[id].questions,
            action.card
          ]
        }
      }
    default:
      return state;
  }
}

export default decks;
