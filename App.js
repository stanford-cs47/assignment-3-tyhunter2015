/*
*
* Assignment 3
* Starter Files
*
* CS47
* Oct, 2018
*/

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { Images, Colors } from './App/Themes'
import APIRequest from './App/Config/APIRequest'
import { Platform } from '@unimodules/core';

import News from './App/Components/News'
import Search from './App/Components/Search'

export default class App extends React.Component {

  state = {
    loading: true,
    articles : [],
    searchText: '',
    category: ''
  }

  componentDidMount() {
    //uncomment this to run an API query!
    this.loadArticles();
  }

  async loadArticles(searchTerm = '', category = '') {
    this.setState({articles:[], loading: true});
    var resultArticles = [];
    if (category === '') {
      resultArticles = await APIRequest.requestSearchPosts(searchTerm);
    } else {
      resultArticles = await APIRequest.requestCategoryPosts(category);
    }
    console.log(resultArticles);
    this.setState({loading: false, articles: resultArticles})
  }

  getArticleContent = () => {
    const {articles, loading} = this.state;

    let contentDisplayed = null;

    if (loading) {
      contentDisplayed = <ActivityIndicator
                            style={styles.ActivityIndicator}
                            size="large" color="black"/>;
    } else {
      contentDisplayed = <News articles={articles}/>;
    }

    return (
      <View style={{flex:1}}>
        {contentDisplayed}
      </View>
    )
  }

  onChangeText = searchText => {
    this.setState({searchText});
  }

  //not sure if needed
  renderArticle = (index, item) => (
    <News
      text={item}
      deleteTodo={() => this.deleteTodo(index)}
    />
    <Text>text</Text>
  )
//still not sure
  keyExtractor = index => {
    return index.toString();
  }

  render() {
    const {articles, loading} = this.state;

    return (
      <SafeAreaView style={styles.container}>

        <Image
            source = {require('./App/Images/nyt.png')}
            style = {{
              width: '90%',
              height: '90%',
              resizeMode: 'contain',
              height: 72,
            }}
        />

        <TextInput
            style={styles.textinput}
            onChangeText={searchText => this.onChangeText(searchText)}
            value={this.state.searchText}
        />

        {}

        <View style={styles.flatlist}>
          <FlatList
            data={this.state.articles}
            //renderItem={{articles}}
            renderItem={({ index, item }) => this.renderArticle(index, item)}
            /*renderItem={( { item } ) => 
              <ToDo text={item}/>
            }*/
            keyExtractor={(item, index) =>
              return this.getArticleContent().toString();
              this.keyExtractor(index)
            }
          />
        </View>

        {/*Though, you can style and organize these however you want! power to you 😎*/}

        {/*If you want to return custom stuff from the NYT API, checkout the APIRequest file!*/}

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textinput: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1
  },
  flatlist: {
    flex: 1,
    width: "100%"
  }
});
