import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { navigate } from 'react-navigation';
import { getDecks } from '../actions';
import { gray, lightGray } from '../utils/colors';
import sharedStyles from '../utils/sharedStyles';

class DecksList extends Component {
    componentWillMount() {
        this.props.dispatch(getDecks());
    }
    render() {
        const { navigate } = this.props.navigation;
        const { decks } = this.props;
        return (
            <View style={sharedStyles.container}>
                <FlatList
                    data={Object.keys(decks)}
                    keyExtractor={(item, index) => item.title}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            style={styles.deckItem}
                            onPress={() => navigate('DeckDetails', {
                                title: decks[item].title
                            })}>
                            <Text
                                style={sharedStyles.deckItemTitle}>
                                {decks[item].title}
                            </Text>
                            <Text               style={sharedStyles.deckItemCardCount}>{decks[item].questions.length} card(s)</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    deckItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 15,
        marginBottom: 5,
        borderRadius: 2
    }
});

function mapStateToProps({ decks }) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(DecksList);
