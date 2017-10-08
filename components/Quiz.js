import React, { Component } from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

class Quiz extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.title}`
    });
    state = {
        questions: this.props.decks[this.props.navigation.state.params.title].questions,
        currentStep: 1,
        correct: 0,
        quizFinished: false,
        view: 'question'
    }
    handleAnswer(answer) {
        if (this.state.currentStep === this.state.questions.length) {
            this.setState({
                quizFinished: true,
                correct: answer ? this.state.correct + 1 : this.state.correct
            });
        } else {
            this.setState({
                currentStep: this.state.currentStep + 1,
                correct: answer ? this.state.correct + 1 : this.state.correct
            });
        }
    }
    finishQuiz() {
        this.setState({
            currentStep: 1,
            correct: 0
        });
        this.props.navigation.dispatch(NavigationActions.back())
    }
    toggleView() {
        this.setState({
            view: this.state.view === 'question' ? 'answer' : 'question'
        });
    }
    render() {
        const { title } = this.props.navigation.state.params;
        const { questions, currentStep, quizFinished, correct, view } = this.state;
        return (
            <View>
                { view === 'question' ?
                    <View>
                        {currentStep > 1 && <Text>Result: {correct/questions.length*100}%</Text>}
                        {!quizFinished ?
                            <View>
                                <Text>{currentStep} / {questions.length}</Text>
                                <Text>{questions[currentStep-1].question}</Text>
                                <Text
                                    style={{padding: 30, textAlign: 'center'}}
                                    onPress={() => this.toggleView()}>
                                    Answer
                                </Text>
                                <Text
                                    style={{padding: 30, textAlign: 'center'}}
                                    onPress={() => this.handleAnswer(true)}>
                                    Correct
                                </Text>
                                <Text
                                    style={{padding: 30, textAlign: 'center'}}
                                    onPress={() => this.handleAnswer()}>
                                    Incorrect
                                </Text>
                            </View>
                            :
                            <Text
                                style={{padding: 30, textAlign: 'center'}}
                                onPress={() => this.finishQuiz()}>
                                Go back
                            </Text>
                        }
                    </View>
                    :
                    <View>
                        <Text>{questions[currentStep-1].answer}</Text>
                        <Text
                            style={{padding: 30, textAlign: 'center'}}
                            onPress={() => this.toggleView()}>
                            Question
                        </Text>
                    </View>
                }
            </View>
        )
    }
}

function mapStateToProps({ decks }) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(Quiz);
