import React from 'react';
import {Dimensions} from 'react-native';

import {Image, View, TouchableOpacity, TextInput, StyleSheet, Text, Alert, Animated,Button, Keyboard,Linking, Platform} from 'react-native';
import{NavigationActions} from 'react-navigation';

Screen = Dimensions.get('window');
export default class Header extends React.Component {
 
  constructor(props){
    super(props);
    this.state = {
        toggleHiddenBar: false,
    }
  }

	render(){
		let {containerStyle, nav, title} = this.props;
    const backAction = NavigationActions.back({
        key: null
      })
		return(
      <View style={containerStyle}>
      <Image style={styles.headerBG} source={require('../../assets/img/Head.png')} resizeMode={'stretch'}/>
      <TouchableOpacity onPress={()=>{nav.dispatch(backAction)}}>
      <Image style={styles.arrowPosition} source={require('../../assets/img/ic_back.png')} />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      </View>
	)}

}

const styles = StyleSheet.create({
  headerBG:{
    position: 'absolute',
    width: Screen.width,
  },
  arrowPosition:{
    marginTop: '30%',
    marginLeft: '25%',
  },
  title:{
    fontFamily: 'ProximaNovaSoft-Regular',
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '300', 
  },
  titleContainer:{
    width: Screen.width,
    position: 'absolute',
    alignItems: 'center',
    marginTop: '30%',
  }
});