import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, View, FlatList, Button } from 'react-native';
import { SearchBar } from 'react-native-elements';

function SearchSong() {

  const local = 'http://localhost:8000/api/'

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [searchBySongs, setSearchBySongs] = useState(true)
  const [searchBarText, setSearchBarText] = useState("Search Songs...")

  useEffect(() => {
    fetch(local + 'songs/')
      .then((response) => response.json())
      .then((responseJson) => {
        setFilteredDataSource(responseJson);
        setMasterDataSource(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      var newData;
      if (searchBySongs) {// Search by song
         newData = masterDataSource.filter(function (item) {
            const itemData = item.song
            ? item.song.toUpperCase()
            : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
      } else {
         newData = masterDataSource.filter(function (item) {
            const itemData = item.artist
            ? item.artist.toUpperCase()
            : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
      }
      setFilteredDataSource(newData);
      setSearch(text)
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text)
    }
  };

  const handleSearchChange = (selectSong) => {
    setSearchBySongs(selectSong)
    if (selectSong) {
        setSearchBarText("Search Songs...")
    } else {
        setSearchBarText("Search Artists...")
    }
    searchFilterFunction('')
  };

  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <Text style={styles.itemStyle} onPress={() => getItem(item)}>
        {"Song: "}
        {item.song}
        {'    Artist: '}
        {item.artist}
      </Text>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const getItem = (item) => {
    // Function for click on an item
    alert('Song: ' + item.song + ' Artist: ' + item.artist);
  };

  // TODO: show button is selected, spacing at the top for Android, correct spacing for search horizontal stack
return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <SearchBar
          round
          searchIcon={{ size: 24 }}
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction('')}
          placeholder={searchBarText}
          value={search}
        />
        <View style={styles.searchByButtons}>
          <Button title="Search By Song"
              onPress={() => handleSearchChange(true)}
          />
          <Button color='#ff0000' title="Search By Artist"
              onPress={() => handleSearchChange(false)}
          />
        </View>
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  itemStyle: {
    padding: 10,
  },
  searchByButtons: {
    backgroundColor: 'white',
    flexDirection: "row",
    padding: 10,
    justifyContent: 'space-around'
  }
});

export default SearchSong;
