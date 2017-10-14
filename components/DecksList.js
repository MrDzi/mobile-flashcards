import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { navigate } from 'react-navigation';
import { getDecks } from '../actions';
import { gray } from './utils/colors';
import sharedStyles from './utils/sharedStyles';

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
                    <View
                        style={deckItem}
                        onPress={() => navigate('DeckDetails', {
                            title: decks[item].title,
                            cardsCount: decks[item].questions.length
                        })}>
                        <Text style={sharedStyles.deckItemTitle}>
                            {decks[item].title}
                        </Text>
                        <Text style={sharedStyles.deckItemCardCount}>{decks[item].questions.length} card(s)</Text>
                    </View>
                )}
            />
        )
    }
}

const styles = StyleSheet.create({
    deckItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 5
    }
});

function mapStateToProps({ decks }) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(DecksList);
