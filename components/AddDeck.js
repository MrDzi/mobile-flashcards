import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard } from 'react-native';
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
        Keyboard.dismiss();
        this.props.navigation.navigate('DecksList');
    }
    render() {
        return (
            <View style={sharedStyles.container}>
                <Text style={sharedStyles.label}>What is the title of your new deck?</Text>
                <TextInput
                    onChangeText={(text) => this.onInputChange(text)}
                    onBlur={() => Keyboard.dismiss()}
                    style={sharedStyles.input}
                    value={this.state.title}
                />
                <TouchableOpacity
                    onPress={this.saveNewDeck}
                    style={[sharedStyles.btn, sharedStyles.primaryBtn]}>
                    <Text style={sharedStyles.btnText}>Add new deck</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default connect()(AddDeck);
