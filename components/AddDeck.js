import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { addNewDeck } from '../actions';
import sharedStyles from '../utils/sharedStyles';

class AddDeck extends Component {
    state = {
        title: ''
    }
    onInputChange(text) {
        this.setState({
            title: text
        })
    }
    saveNewDeck = () => {
        this.props.dispatch(addNewDeck({
            title: this.state.title,
            questions: []
        }));
        this.setState({
            title: ''
        });
    }
    render() {
        return (
            <View>
                <Text>What is the title of your new deck?</Text>
                <TextInput
                    onChangeText={(text) => this.onInputChange(text)}
                    style={sharedStyles.input}
                    value={this.state.title}
                />
                <TouchableOpacity
                    onPress={this.saveNewDeck}
                    style={[sharedStyles.btn, sharedStyles.primaryBtn]}>
                    <Text>Add new deck</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default connect()(AddDeck);
