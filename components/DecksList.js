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
        const { decks } = this.props;
        return (
            <FlatList
                data={Object.keys(decks)}
                renderItem={({item}) => (
                    <View>
                        <Text
                            style={{padding: 30, textAlign: 'center'}}
                            onPress={() => navigate('DeckDetails', {
                                title: decks[item].title,
                                cardsCount: decks[item].questions.length
                            })}>
                            {decks[item].title}
                        </Text>
                        <Text>{decks[item].questions.length} card(s)</Text>
                    </View>
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
