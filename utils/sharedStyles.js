import { StyleSheet } from 'react-native';
import { black, lightGray, primary, gray } from './colors';

const sharedStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: lightGray,
        padding: 10
    },
    input: {
        height: 45,
        backgroundColor: 'white',
        borderColor: black,
        borderWidth: 1,
        borderRadius: 2,
        padding: 10,
        marginBottom: 10
    },
    label: {
        marginBottom: 5
    },
    deckItemTitle: {
        fontSize: 18,
        fontWeight: "500",
        marginBottom: 10
    },
    deckItemCardCount: {
        color: gray
    },
    btn: {
        padding: 15,
        borderRadius: 2,
        marginBottom: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    primaryBtn: {
        backgroundColor: primary
    },
    btnText: {
        fontSize: 16,
        color: 'white'
    },
    borderBtn: {
        borderWidth: 1,
        borderColor: primary
    },
    borderBtnText: {
        fontSize: 16,
        color: primary
    }
});

export default sharedStyles;
