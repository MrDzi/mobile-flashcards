import { StyleSheet } from 'react-native';
import { black, lightGray, primary } from './colors';

export default const sharedStyles = StyleSheet.create({
    input: {
        height: 40,
        backgroundColor: 'white',
        borderColor: black,
        borderWidth: 1
    },
    deckItemTitle: {
        fontSize: 20,
        fontWeight: 500,
        marginBottom: 20
    },
    deckItemCardCount: {
        color: gray
    },
    btn: {
        padding: [10, 30],
        borderRadius: 5
    },
    primaryBtn: {
        color: 'white',
        backgroundColor: primary
    },
    borderBtn: {
        color: primary,
        borderWidth: 1,
        borderColor: primary
    }
});