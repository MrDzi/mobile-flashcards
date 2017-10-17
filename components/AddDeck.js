import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { addNewDeck } from '../actions';
import sharedStyles from '../utils/sharedStyles';

class AddDeck extends Component {
    state = {
        title: '',
        error: false
    }
    onInputChange(text) {
        this.setState({
            title: text,
            error: false
        })
    }
    saveNewDeck = () => {
        const existingDeck = Object.keys(this.props.decks).filter((deckTitle) => deckTitle === this.state.title);
        if (existingDeck.length) {
            this.setState({
                error: true
            });
            return;
        }
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
                {this.state.error && <Text style={{marginBottom: 10}}>That name already exist.</Text>}
                <TouchableOpacity
                    disabled={!this.state.title.length}
                    onPress={this.saveNewDeck}
                    style={[sharedStyles.btn, sharedStyles.primaryBtn, {opacity: !this.state.title ? 0.5 : 1}]}>
                    <Text style={sharedStyles.btnText}>Add new deck</Text>
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

export default connect(mapStateToProps)(AddDeck);
