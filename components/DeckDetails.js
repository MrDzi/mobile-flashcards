import React, { Component } from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import { navigate } from 'react-navigation';
import { connect } from 'react-redux';

class DeckDetails extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.title}`
    });
    render() {
        console.log(this.props);
        const { title } = this.props.navigation.state.params;
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Text>{title}</Text>
                <Text
                    onPress={() => navigate('AddCard', { title })}
                    style={{padding: 30, textAlign: 'center'}}>
                    Add Card
                </Text>
                <Text
                    onPress={() => navigate('Quiz', { title })}
                    style={{padding: 30, textAlign: 'center'}}>
                    Start Quiz
                </Text>
            </View>
        )
    }
}

export default connect()(DeckDetails);
