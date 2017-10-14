import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { navigate } from 'react-navigation';
import { connect } from 'react-redux';
import sharedStyles from './utils/sharedStyles';

class DeckDetails extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.title}`
    });
    render() {
        const { title, cardsCount } = this.props.navigation.state.params;
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Text styles={sharedStyles.deckItemTitle}>{title}</Text>
                <Text styles={[sharedStyles.deckItemCardCount, {marginBottom: 40}]}>{cardsCount} card(s)</Text>
                <TouchableOpacity
                    onPress={() => navigate('AddCard', { title })}
                    style={[sharedStyles.btn, sharedStyles.borderBtn]}>
                    <Text>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigate('Quiz', { title })}
                    style={[sharedStyles.btn, sharedStyles.primaryBtn]}>
                    Start Quiz
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    deckItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 5
    },
    deckItemTitle: {
        fontSize: 20,
        fontWeight: 500,
        marginBottom: 20
    },
    deckItemCardCount: {
        color: gray
    }
});

export default connect()(DeckDetails);
