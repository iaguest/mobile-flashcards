import { RECEIVE_DECKS, ADD_DECK, REMOVE_DECK, ADD_CARD } from "../actions";

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
    case REMOVE_DECK:
      let { [action.id]: _, ...updated } = state
      return {
        ...updated
      }
    case ADD_CARD:
      const { question, answer } = action.card;
      return {
        ...state,
        [ action.id]  : {
          ...state[ action.id ],
          [state[ action.id ].questions] : 
            [ ...state[ action.id ].questions, { question, answer } ]
        }
      }
    default:
      return state;
  }
}

export default decks;
