import { combineReducers } from 'redux';
import { RECEIVE_DECKS, RECEIVE_DECK } from '../actions';

function decks(state = [], action) {
    const { decks, newDeck } = action;
    switch (action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                ...decks
            }
        case RECEIVE_DECK:
            return {
                ...state,
                newDeck
            }
        default:
            return state;
    }
}

export default combineReducers({
    decks
});
