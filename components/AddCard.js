import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { addNewDeck } from '../actions'

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
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    value={this.state.question}
                />
                <Text>Answer</Text>
                <TextInput
                    onChangeText={(text) => this.onAnswerInputChange(text)}
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    value={this.state.answer}
                />
                <Button title="Add New Card" onPress={this.saveNewCard} />
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
