import React, { useState } from 'react';
import { SafeAreaView, TextInput, StyleSheet, Button, Text, Alert, View } from 'react-native';
import axios from "axios";


const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});


export default function CreateSong() {
    var [song, setSong] = React.useState({
      song: ''
    });

    var [artist, setArtist] = React.useState({
      artist: ''
    });

    var [username, setUsername] = React.useState({
      username: ''
    });

    var [rating, setRating] = React.useState({
      rating: 5
    });

    var state = {
      song, 
      artist,
      username,
      rating
    }

    const handleSubmit = event => {
      {/*
      var ratingData = {username: state.username, song: state.song, rating: state.rating};
      console.log("RATINGS = ", ratingData);

      fetch(`http://localhost:8000/api/ratings/`, { method: 'POST',
        body: JSON.stringify(ratingData),
        headers: {"Content-type": "application/json"}
      })
      .catch((error) => console.error(error))
      */}


      var songData = JSON.stringify({song: state.song, artist: state.artist});
      console.log("SONG = ", songData);

      fetch(`http://localhost:8000/api/songs/`, { method: 'POST',
        body: JSON.stringify(songData),
        headers: {"Content-type": "application/json"}
      })
      .catch((error) => console.error(error))


      {/*
      axios.post('http://localhost:8000/api/ratings/', ratingData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      .catch((error) => console.log(error))

      var songData = JSON.stringify({song: state.song, artist: state.artist});
      axios.post('http://localhost:8000/api/songs/', songData);
      */}
      
    }
    

    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Rate a song!</Text>
        <TextInput
          style={styles.input}
          onChangeText={setSong}
          placeholder="Song"
        />
        <TextInput
          style={styles.input}
          onChangeText={setArtist}
          placeholder="Artist"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={setUsername}
          placeholder="Username"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={setRating}
          placeholder="Rating"
          keyboardType="numeric"
        />
        <Button
          title="Press me"
          onPress={handleSubmit}
        />
      </SafeAreaView>
    );
  }
