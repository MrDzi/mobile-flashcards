import { RECEIVE_DECKS, RECEIVE_DECK } from '../actions';

export default function deck(state = [], action) {
    const { decks, newDeck } = action;
    switch (action.type) {
        case RECEIVE_DECKS:
            return {
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
