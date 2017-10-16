import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { addNewDeck } from '../actions';
import sharedStyles from '../utils/sharedStyles';

class AddCard extends Component {
    state = {
        question: '',
        answer: ''
    }
    onQuestionInputChange(question) {
        this.setState({
            question
        })
    }
    onAnswerInputChange(answer) {
        this.setState({
            answer
        })
    }
    saveNewCard = () => {
        const { question, answer } = this.state;
        const { title } = this.props.navigation.state.params;
        const deck = this.props.decks[title];
        const updatedDeck = {
            ...deck,
            questions: [...deck.questions, { question, answer }]
        }
        this.props.dispatch(addNewDeck(updatedDeck));
        this.setState({
            question: '',
            answer: ''
        });
        Keyboard.dismiss();
        this.props.navigation.dispatch(NavigationActions.back());
    }
    render() {
        return (
            <View style={sharedStyles.container}>
                <Text style={sharedStyles.label}>Question</Text>
                <TextInput
                    onChangeText={(text) => this.onQuestionInputChange(text)}
                    onBlur={() => Keyboard.dismiss()}
                    style={sharedStyles.input}
                    value={this.state.question}
                />
                <Text style={sharedStyles.label}>Answer</Text>
                <TextInput
                    onChangeText={(text) => this.onAnswerInputChange(text)}
                    onBlur={() => Keyboard.dismiss()}
                    style={sharedStyles.input}
                    value={this.state.answer}
                />
                <TouchableOpacity
                    onPress={this.saveNewCard}
                    style={[sharedStyles.btn, sharedStyles.primaryBtn]}>
                    <Text style={sharedStyles.btnText}>Add new card</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

function mapStateToProps({ decks }) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(AddCard);
