import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { navigate } from 'react-navigation';
import { connect } from 'react-redux';
import sharedStyles from '../utils/sharedStyles';
import { gray } from '../utils/colors';

class DeckDetails extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.title}`
    });
    render() {
        const { title, cardsCount } = this.props.navigation.state.params;
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Text style={sharedStyles.deckItemTitle}>{title}</Text>
                <Text style={[sharedStyles.deckItemCardCount, {marginBottom: 40}]}>{cardsCount} card(s)</Text>
                <TouchableOpacity
                    onPress={() => navigate('AddCard', { title })}
                    style={[sharedStyles.btn, sharedStyles.borderBtn]}>
                    <Text>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigate('Quiz', { title })}
                    style={[sharedStyles.btn, sharedStyles.primaryBtn]}>
                    <Text>Start Quiz</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    deckItemTitle: {
        // fontSize: 20,
        fontWeight: "500",
        marginBottom: 20
    },
    deckItemCardCount: {
        // color: gray
    }
});

export default connect()(DeckDetails);
