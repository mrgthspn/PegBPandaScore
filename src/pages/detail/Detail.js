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
  View,
  FlatList,
  RefreshControl,
  LayoutAnimation,
} from 'react-native';

import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';

type Props = {
  navigation: Object
};

type State = {
        data: Array<Object>,
        refreshing: boolean,
};


export default class Detail extends Component<Props,State> {
// Pass 'navigation' param to get 'Game name'
static navigationOptions = ({ navigation } : {navigation : Object}) => ({
    gesturesEnabled:false,
    headerStyle: {backgroundColor: '#2c2d2e'},
    headerTitleStyle: {color: '#fe9400'},
    title: navigation.getParam('data').name + ' Leagues',
  });

  constructor(props: {navigation: Object}){
    super(props);
    const { navigation } = this.props;
    const data = navigation.getParam('data', 'NO-ID');
    this.state = {
      data:data.leagues,
      refreshing:false
    } 
   }

    _onRefresh() { 
    if(this.state.refreshing!=true){
    this.setState({refreshing: true}); 
     setTimeout(async () => {  
        try {
              this.setState({refreshing: false})
            }
        
        catch (error) {
          this.setState({refreshing: false}); 
      }
    },1000);
   }
  }

   renderHeader() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.borderStyle}></View>
    )
  }

  _keyExtractor(item, index) {
    return index+'';
  } 

  renderSeparator() {
    return (<View></View>);
  }


  renderItem(data: Object) {
    const { navigate } = this.props.navigation;
    let { item, index } = data;

    return (
      <View style={styles.borderStyle}>
      <TouchableOpacity style={styles.centerTouchable} onPress={()=>{navigate('Series',{data:item})}}>
      <View style={styles.leaguesContent}>
        <Text style={styles.centerText}>{item.name}</Text>
      </View>
      <View style={{flex:1}}>
        <Image style={{height:50,width:70}} resizeMode={'contain'} source={{uri:item.image_url}}/>
      </View>
      </TouchableOpacity>
      </View>
    ) 
  }

// UI  
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
      <FlatList
       keyExtractor={this._keyExtractor}
       refreshControl={ <RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh.bind(this)}  /> }
       style={{backgroundColor:'transparent',flex:1}}
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
  centerTouchable: {
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 3
  },
  leaguesContent: {
    flex: 3,
    justifyContent: 'center'
  },
  centerText: {
    textAlign: 'center',
    color: '#ffffff'
  },
  borderStyle: {
    borderBottomWidth: 1,
    borderColor: '#ffffff'
  } 
});
