import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import FlipCard from 'react-native-flip-card'
import { connect } from 'react-redux';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';
import sharedStyles from '../utils/sharedStyles';
import { primary } from '../utils/colors';

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
    componentDidMount() {
        clearLocalNotification()
            .then(setLocalNotification);
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
    goBack = () => {
        this.setState({
            currentStep: 1,
            correct: 0
        });
        this.props.navigation.dispatch(NavigationActions.back());
    }
    restartQuiz = () => {
        this.setState({
            quizFinished: false,
            currentStep: 1,
            correct: 0
        });
    }
    toggleView = () => {
        this.setState({
            flip: !this.state.flip
        });
    }
    render() {
        const { title } = this.props.navigation.state.params;
        const { questions, currentStep, quizFinished, correct, view } = this.state;
        return (
            <FlipCard
                style={[sharedStyles.container, {backgroundColor: 'white', borderWidth: 0}]}
                flip={this.state.flip}
                flipHorizontal={true}
                flipVertical={false}
                clickable={false}
                perspective={1000}>
                <View>
                    {!quizFinished ?
                        <View>
                            <Text style={styles.step}>Step: {currentStep} / {questions.length}</Text>
                            <Text style={styles.question}>{questions[currentStep-1].question}</Text>
                            <Text
                                style={styles.link}
                                onPress={() => this.toggleView()}>
                                Answer
                            </Text>
                            <TouchableOpacity
                                style={[sharedStyles.btn, sharedStyles.primaryBtn]}
                                onPress={() => this.handleAnswer(true)}>
                                <Text style={sharedStyles.btnText}>Correct</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[sharedStyles.btn, sharedStyles.borderBtn]}
                                onPress={() => this.handleAnswer()}>
                                <Text style={sharedStyles.borderBtnColor}>Incorrect</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <View style={styles.resultWrap}>
                            <Text style={{textAlign: 'center'}}>Result:</Text>
                            <Text style={styles.result}>{(correct/questions.length*100).toFixed(2)}%</Text>

                            <TouchableOpacity
                                style={[sharedStyles.btn, sharedStyles.borderBtn]}
                                onPress={this.goBack}>
                                <Text style={sharedStyles.borderBtnColor}>Go back</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[sharedStyles.btn, sharedStyles.primaryBtn]}
                                onPress={this.restartQuiz}>
                                <Text style={sharedStyles.btnText}>Restart quiz</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
                <View>
                    <Text style={styles.question}>{questions[currentStep-1].answer}</Text>
                    <Text
                        style={styles.link}
                        onPress={this.toggleView}>
                        Question
                    </Text>
                </View>
            </FlipCard>
        )
    }
}

const styles = StyleSheet.create({
    link: {
        color: primary,
        padding: 20,
        textAlign: 'center'
    },
    step: {
        textAlign: 'right'
    },
    question: {
        fontSize: 24,
        fontWeight: '500',
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 35
    },
    resultWrap: {
        display: 'flex',
        justifyContent: 'center'
    },
    result: {
        fontSize: 60,
        fontWeight: '500',
        color: primary,
        textAlign: 'center',
        padding: 20
    }
});

function mapStateToProps({ decks }) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(Quiz);
