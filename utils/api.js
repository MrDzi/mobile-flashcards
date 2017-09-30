import { AsyncStorage } from 'react-native';

export function fetchDecks() {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then(results => JSON.parse(results))
}

export function submitDeck(deckTitle) {
    return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
        [deckTitle]: {
            title: deckTitle,
            questions: []
        }
    }))
}
