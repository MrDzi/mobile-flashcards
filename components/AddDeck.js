import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

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
    }
    render() {
        return (
            <View>
                <Text>What is the title of your new deck?</Text>
                <TextInput
                    onChangeText={(text) => this.onInputChange(text)}
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    value={this.state.title}
                />
                <Button title="Add New Deck" onPress={this.saveNewDeck} />
            </View>
        )
    }
}

export default connect()(AddDeck);
