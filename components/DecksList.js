import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { navigate } from 'react-navigation';
import { getDecks } from '../actions';

class DecksList extends Component {
    componentWillMount() {
        this.props.dispatch(getDecks());
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <FlatList
                data={Object.keys(this.props.decks)}
                renderItem={({item}) => (
                    <Text
                        style={{padding: 30, textAlign: 'center'}}
                        onPress={() => navigate('DeckDetails', { title: this.props.decks[item].title })}>
                        {this.props.decks[item].title}
                    </Text>
                )}
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
