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
  Linking
} from 'react-native';

// Import Image Progress
import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';

type Props = {
  navigation: Object
};

type State = {
        data: Array<Object>,
        url: string,
        leagueName: string,
        refreshing: boolean,
};

export default class Series extends Component<Props,State> {
static navigationOptions = ({ navigation } : {navigation : Object}) => ({
    gesturesEnabled:false,
    // Styles for page headers
    headerStyle: {backgroundColor: '#2c2d2e'},
    headerTitleStyle: {color: '#fe9400'},
    title:'Series'
  });

// Initialize
  constructor(props: {navigation: Object}){
    super(props);
    const { navigation } = this.props;
    const data = navigation.getParam('data', 'NO-ID');
    this.state = {
      data: data.series,
      url: data.url,
      leagueName: data.name,
      refreshing: false
    }
  }
// Swipe Down
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
    }, 1000);
   }
  }
// Url if available
  renderUrl(url: string){
    if(url === null || url ===""){
      return(<View></View>);
    }else{
      return(
        <TouchableOpacity onPress={()=>{Linking.openURL(url).catch(err => console.error('An error occurred', err));}}>
          <Text style={styles.urlText}>Go to Site</Text>
        </TouchableOpacity>
      )
    }
  }

// Header
   renderHeader(){
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.headerStyle}>
        <Text style={styles.seriesTitle}>{this.state.leagueName}</Text>
        {this.renderUrl(this.state.url)}
      </View>
        
    )
  }

  _keyExtractor(item, index) {
    return index+'';
  } 

// Divider per item
  renderSeparator(){
    return (<View></View>);
  }

// List Item
  renderItem(data: Object){
    const { navigate } = this.props.navigation;
    let { item, index } = data;

    return (
      <View style={styles.perItemSeries}>
        {this.renderSeason(item.season)}
        {this.renderYear(item.year)}
        {this.renderSeriesDate('Begins at ',item.begin_at)}
        {this.renderSeriesDate('Ends at ',item.end_at)}     
      </View>
    ) 
  }

// Season
  renderSeason(seasonNumber: string){
    if(seasonNumber === null || seasonNumber === ""){
      return(<View></View>);
    }else{
      return(
          <Text style={styles.seasonText}>Season {seasonNumber}</Text>
        )
    }
  }

// Year (Season)
  renderYear(yearNumber: string){
    if(yearNumber === null || yearNumber === ""){
      return(<View></View>)
    }else{
      return(
        <Text style={styles.textCenter}>Year {yearNumber}</Text>
      )
    }
  }

// Series Date (Begin & End)
  renderSeriesDate(caption: string, seriesDate: string){
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    if(seriesDate == null || seriesDate === ""){
      return(<View></View>);
    }else{
      return(
        <Text style={styles.textCenter}>{caption}{months[parseInt(new Date(seriesDate).toISOString().substring(5,7))-1]}{' '+new Date(seriesDate).toISOString().substring(8,10)}</Text>
      )
    }
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
    width: '100%',
    height: '100%',
    backgroundColor: '#2c2d2e'
  },
  perItemSeries: {
    borderBottomWidth: 1,
    borderColor: '#ffffff',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: 10,
    color: '#ffffff'
  },
  seriesTitle: {
    textAlign: 'center',
    fontWeight:'800',
    fontSize: 20,
    textTransform: 'uppercase',
    color: '#ffffff'
  },
  textCenter: {
    textAlign: 'center',
    color: '#ffffff'
  },
  headerStyle: {
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderColor: '#ffffff',
    alignItems: 'center',
    padding: 15
  },
  seasonText: {
    textAlign: 'center',
    fontWeight:'800',
    textTransform: 'uppercase',
    color: '#ffffff',
    fontSize: 15,
  },
  urlText:{
    color: '#fe9400',
    marginTop: 10,
    fontSize: 12,
    textTransform: 'uppercase'
  }
});
