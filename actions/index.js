import { submitDeck, fetchDecks, submitCard } from '../utils/api';

export const RECEIVE_DECK = 'RECEIVE_DECK';
export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const RECEIVE_CARD = 'RECEIVE_CARD';

export const getDecks = () => dispatch => {
    return fetchDecks()
        .then(decks => dispatch(receiveDecks(decks)));
}

const receiveDecks = decks => ({
    type: RECEIVE_DECKS,
    decks
});

export const addNewDeck = newDeck => dispatch => {
    return submitDeck(newDeck)
        .then(() => dispatch(receiveNewDeck(newDeck)));
};

const receiveNewDeck = newDeck => ({
    type: RECEIVE_DECK,
    newDeck
});
