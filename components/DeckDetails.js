import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { navigate } from 'react-navigation';
import { connect } from 'react-redux';
import sharedStyles from '../utils/sharedStyles';
import { gray } from '../utils/colors';

/*
    Deck details component - shows single deck
*/
class DeckDetails extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.title}`
    });
    render() {
        const { title } = this.props.navigation.state.params;
        const { navigate } = this.props.navigation;
        const deck = this.props.decks[title];
        return (
            <View style={[sharedStyles.container, {justifyContent: 'flex-start'}]}>
            {deck &&
                <View>
                    <View style={styles.deckDetailsInfo}>
                        <Text style={[sharedStyles.deckItemTitle, {fontSize: 32}]}>{deck.title}</Text>
                        <Text style={[sharedStyles.deckItemCardCount, {marginBottom: 40}]}>{deck.questions.length} card(s)</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => navigate('AddCard', { title: deck.title })}
                        style={[sharedStyles.btn, sharedStyles.borderBtn]}>
                        <Text style={sharedStyles.borderBtnColor}>Add Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        disabled={deck.questions.length === 0}
                        onPress={() => navigate('Quiz', { title: deck.title })}
                        style={[sharedStyles.btn, sharedStyles.primaryBtn, {opacity: deck.questions.length > 0 ? 1 : 0.5}]}>
                        <Text style={sharedStyles.btnText}>Start Quiz</Text>
                    </TouchableOpacity>
                </View>
            }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    deckDetailsInfo: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 50
    }
});

function mapStateToProps({ decks }) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(DeckDetails);
