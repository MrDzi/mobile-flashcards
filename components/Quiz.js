import React, { Component } from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import { NavigationActions } from 'react-navigation';
import FlipCard from 'react-native-flip-card'
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
        view: 'question',
        flip: false
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
            flip: !this.state.flip
        });
    }
    render() {
        const { title } = this.props.navigation.state.params;
        const { questions, currentStep, quizFinished, correct, view } = this.state;
        return (
            <FlipCard flip={this.state.flip} clickable={false} perspective={1000}>
                <View>
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
                        <View>
                            <Text>Result: {correct/questions.length*100}%</Text>
                            <Text
                                style={{padding: 30, textAlign: 'center'}}
                                onPress={() => this.finishQuiz()}>
                                Go back
                            </Text>
                        </View>
                    }
                </View>
                <View>
                    <Text>{questions[currentStep-1].answer}</Text>
                    <Text
                        style={{padding: 30, textAlign: 'center'}}
                        onPress={() => this.toggleView()}>
                        Question
                    </Text>
                </View>
            </FlipCard>
        )
    }
}

function mapStateToProps({ decks }) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(Quiz);