import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { getDecks } from '../actions';

class DecksList extends Component {
    componentWillMount() {
        getDecks();
    }
    render() {
        return (
            <FlatList
                data={this.props.decks}
                renderItem={({item}) =>
                    <Text>{item.title}</Text>
                }
            />
        )
    }
}

function mapStateToProps({ decks }) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(DecksList);
