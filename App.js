import React, { Component } from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import thunk from 'redux-thunk';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Constants } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { setLocalNotification } from './utils/helpers';
import DecksList from './components/DecksList';
import AddDeck from './components/AddDeck';
import DeckDetails from './components/DeckDetails';
import AddCard from './components/AddCard';
import Quiz from './components/Quiz';
import { primary, black } from './utils/colors';

const MFStatusBar = ({backgroundColor, ...props}) => (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);

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
}, {
    navigationOptions: {
        header: null
    }
});

const navigationOptions = {
    headerTintColor: 'white',
    headerStyle: {
        backgroundColor: primary
    }
}

const MainNavigation = StackNavigator({
    Home: { screen: Tabs },
    DeckDetails: {
        screen: DeckDetails,
        navigationOptions
    },
    AddCard: {
        screen: AddCard,
        navigationOptions
    },
    Quiz: {
        screen: Quiz,
        navigationOptions
    }
});

export default class App extends Component {
    componentDidMount() {
        setLocalNotification();
    }
    render() {
        return (
            <Provider store={createStore(reducer, applyMiddleware(thunk))}>
                <View style={styles.container}>
                    <MFStatusBar backgroundColor={primary} barStyle="light-content" />
                    <MainNavigation />
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontSize: 16,
        color: black,
        backgroundColor: lightGray,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    }
});
