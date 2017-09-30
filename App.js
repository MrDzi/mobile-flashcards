import React, { Component } from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import thunk from 'redux-thunk';
import { TabNavigator } from 'react-navigation';
import { Constants } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import DecksList from './components/DecksList';
import AddDeck from './components/AddDeck';

const MFStatusBar = ({backgroundColor, ...props}) => (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
)

const Tabs = TabNavigator({
    DecksList: {
        screen: DecksList,
        navigationOptions: {
            tabBarLabel: 'Decks List',
            tabBarIcon: ({ tintColor }) => <Ionicons name='ios-list' size={34} color={tintColor} />
        }
    },
    AddDeck: {
        screen: AddDeck,
        navigationOptions: {
            tabBarLabel: 'Add New Deck',
            tabBarIcon: ({ tintColor }) => <Ionicons name='ios-add-circle-outline' size={26} color={tintColor} />
        }
    }
});

export default class App extends Component {
    render() {
        return (
            <Provider store={createStore(reducer, applyMiddleware(thunk))}>
                <View style={{flex: 1}}>
                    <MFStatusBar backgroundColor="purple" barStyle="light-content" />
                    <Tabs style={styles.container} />
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
