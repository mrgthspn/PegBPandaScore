import React from 'react';
import {
	AppRegistry,
	Text,
	View,
	Platform,
} from 'react-native';

import {StackNavigator, TabNavigator, DrawerNavigator} from 'react-navigation';
import Start from './pages/start/Start';
import Detail from './pages/detail/Detail';
import Series from './pages/series/Series';

console.disableYellowBox = true;
const MainNavigation = StackNavigator({
	Start:{screen: Start},
	Detail:{screen: Detail},
	Series:{screen: Series}
})

const PegBExam = StackNavigator({
	//Load:{screen: LoadScreen},
	MainNavigation:{screen: MainNavigation},

},{mode:'modal',headerMode:'none'});


AppRegistry.registerComponent('PegBExam', () => PegBExam);