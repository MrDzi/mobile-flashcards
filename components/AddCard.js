import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { addNewDeck } from '../actions'
import sharedStyles from './utils/sharedStyles';

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
    }
    render() {
        return (
            <View>
                <Text>Question</Text>
                <TextInput
                    onChangeText={(text) => this.onQuestionInputChange(text)}
                    style={sharedStyles.input}
                    value={this.state.question}
                />
                <Text>Answer</Text>
                <TextInput
                    onChangeText={(text) => this.onAnswerInputChange(text)}
                    style={sharedStyles.input}
                    value={this.state.answer}
                />
                <TouchableOpacity
                        title="Add New Card"
                        onPress={this.saveNewCard}
                        style={[sharedStyles.btn, sharedStyles.primaryBtn]}>
                </TouchableOpacity>
        )
    }
}

function mapStateToProps({ decks }) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(AddCard);
