import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { navigate } from 'react-navigation';
import { connect } from 'react-redux';
import sharedStyles from '../utils/sharedStyles';
import { gray } from '../utils/colors';

class DeckDetails extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.title}`
    });
    render() {
        const { title, cardsCount } = this.props.navigation.state.params;
        const { navigate } = this.props.navigation;
        return (
            <View style={[sharedStyles.container, {justifyContent: 'flex-start'}]}>
                <View style={styles.deckDetailsInfo}>
                    <Text style={[sharedStyles.deckItemTitle, {fontSize: 32}]}>{title}</Text>
                    <Text style={[sharedStyles.deckItemCardCount, {marginBottom: 40}]}>{cardsCount} card(s)</Text>
                </View>
                <TouchableOpacity
                    onPress={() => navigate('AddCard', { title })}
                    style={[sharedStyles.btn, sharedStyles.borderBtn]}>
                    <Text style={sharedStyles.borderBtnColor}>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    disabled={cardsCount === 0}
                    onPress={() => navigate('Quiz', { title })}
                    style={[sharedStyles.btn, sharedStyles.primaryBtn, {opacity: cardsCount > 0 ? 1 : 0.5}]}>
                    <Text style={sharedStyles.btnText}>Start Quiz</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    deckDetailsInfo: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 50
    }
});

export default connect()(DeckDetails);
