import { AsyncStorage } from 'react-native';
import { DECK_STORAGE_KEY } from './helpers'

export function fetchDecks() {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then(results => {
            return JSON.parse(results);
        });
}

export function deleteDecks() {
    return AsyncStorage.removeItem(DECK_STORAGE_KEY)
        .then(results => {
            return JSON.parse(results);
        });
}

export function submitDeck(deck) {
    return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
        [deck.title]: deck
    }))
}
