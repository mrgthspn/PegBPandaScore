/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  FlatList,
  RefreshControl,
  LayoutAnimation,
} from 'react-native';

type Props = {
  navigation: Object
};

type State = {
        data: Array<Object>,
        refreshing: boolean,
};

export default class Start extends Component<Props, State> {
// Page Header - React Navigation
static navigationOptions = {
    title:'PandaScore',
    gesturesEnabled:false,
    headerStyle: {backgroundColor: '#2c2d2e'},
    headerTitleStyle: {color: '#fe9400'}
  };
// Initialize states
  constructor(props: {navigation: Object}){
    super(props);
    // variable used for changing states (UI)
    this.state = {
      data: [],
      refreshing:false
    }
  // Call function 'Load' from 'this' class 
    this.load();
  }

// Fetch Items
  load(){
    // Hardcoded access token (requirements did not specify log in)
    fetch("https://api.pandascore.co/videogames.json?token=B14c6gEoux54U97K3obd4wFQ2v8Vu7maLs39mOW1TVkb0IPp5MU",{
      method: 'GET',
      headers: {'Accept':'application/json', 'Content-Type': 'application/json', 'X-DreamFactory-Application-Name': 'mg-dbc-app'},
    })
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({data:responseData});
      this.setState({refreshing:false}); 
    })
  }

// Swipe Down Reload (Fetch)
  _onRefresh() { 
    if(this.state.refreshing!=true){
    this.setState({refreshing:true}); 
     setTimeout(async () => {  
        try {
              this.load();
            }
        catch (error) {
          this.setState({refreshing:false}); 
      }
    },1000);
   }
  }

// Header
   renderHeader() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.borderStyle}></View>
    )
  }

  _keyExtractor(item, index) {
    return index+'';
  } 

// Divider
  renderSeparator() {
    return (<View></View>);
  }

// Games
  renderItem(data: Object) {
    const {navigate} = this.props.navigation;
    let {item, index} = data;

    return (
      <View style={styles.borderStyle}>
      <TouchableOpacity style={styles.centerTouchable} onPress={()=>{navigate('Detail',{data:item})}}>
      <Text style={styles.centerContent}>{item.name}</Text>
      </TouchableOpacity>
      </View>
    ) 
  }

// User Interface
// FlatList - List of games
  render() {
    return (
      <View style={styles.container}>
      <FlatList
       keyExtractor={this._keyExtractor}
       refreshControl={ <RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh.bind(this)}  /> }
       style={{backgroundColor: 'transparent', flex: 1}}
       data={this.state.data}
       extraData={this.state.refreshing}
       renderItem={this.renderItem.bind(this)}
       ItemSeparatorComponent={this.renderSeparator.bind(this)}
       ListHeaderComponent={this.renderHeader()}
       />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width:'100%',
    height:'100%',
    backgroundColor: '#2c2d2e',
  },
  centerContent: {
    textAlign: 'center',
    color: '#ffffff',
    justifyContent: 'center',
  },
  centerTouchable: {
    height: 100,
    justifyContent: 'center'
  },
  borderStyle: {
    borderBottomWidth: 1,
    borderColor: '#ffffff'
  }
});
