import React, { Component } from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';

export default class DeckDetails extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.title}`
    });
    render() {
        return (
            <Text>Deck Details</Text>
        )
    }
}
