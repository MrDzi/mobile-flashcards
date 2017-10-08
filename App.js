import React, { Component } from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import thunk from 'redux-thunk';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Constants } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import DecksList from './components/DecksList';
import AddDeck from './components/AddDeck';
import DeckDetails from './components/DeckDetails';
import AddCard from './components/AddCard';
import Quiz from './components/Quiz';

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

const MainNavigation = StackNavigator({
    Home: { screen: Tabs },
    DeckDetails: { screen: DeckDetails,
        navigationOptions: {
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: 'purple'
            }
        }
    },
    AddCard: { screen: AddCard,
        navigationOptions: {
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: 'purple'
            }
        }
    },
    Quiz: { screen: Quiz,
        navigationOptions: {
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: 'purple'
            }
        }
    }
});

export default class App extends Component {
    render() {
        return (
            <Provider store={createStore(reducer, applyMiddleware(thunk))}>
                <View style={{flex: 1}}>
                    <MFStatusBar backgroundColor="purple" barStyle="light-content" />
                    <MainNavigation />
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
    }
});
