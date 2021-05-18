import React, { useState } from 'react';
import { SafeAreaView, TextInput, StyleSheet, Button, Text, Alert, View } from 'react-native';
import Slider from '@react-native-community/slider';


const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});


export default function CreateSong() {

  const local = 'http://localhost:8000/api/'

    var [song, setSong] = React.useState({
      song: ''
    });

    var [artist, setArtist] = React.useState({
      artist: ''
    });

    var [username, setUsername] = React.useState({
      username: ''
    });

    var [rating, setRating] = useState(0)

    var state = {
      song, 
      artist,
      username,
      rating
    }

    var [message, setMessage] = useState("");

    {/*
    var [message, setMessage] = React.useState({
      message: ''
    })
  */}

    const handleSubmit = () => {
      // reset message to empty
      setMessage("")
      // song post 
      var songData = {song: state.song, artist: state.artist};
      console.log("SONG = ", songData);
      var ratingData = {username: state.username, song: state.song, rating: parseInt(state.rating)};
      console.log("RATINGS = ", ratingData);

      fetch(local + `songs/`, { method: 'POST',
        body: JSON.stringify(songData),
        headers: {"Content-type": "application/json"}
      })
      .then(() => 
        fetch(local + `ratings/`, { method: 'POST',
          body: JSON.stringify(ratingData),
          headers: {"Content-type": "application/json"}
        })
        .then(async (res) => {
            if(res.status === 400) {
              setMessage("You have entered a username that does not exist in the database, please try again with a valid username")
            } else if(res.status > 199 & res.status < 300) {
              setMessage("Success!")
            }
          }
      ))
    }

    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Create a song and rate it!</Text>
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
        <Text>
          Rating
        </Text>
        <View style={{ flex: "none" }}>
          <Slider
            style={{ width: 200, height: 20 }}
            minimumValue={0}
            maximumValue={10}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
            step={1}
            onValueChange={sliderValue => setRating(sliderValue)}
          />
        </View>
        <Text>
          {rating}
        </Text>

        <Button
          title="Submit"
          onPress={handleSubmit}
        />
        <Text style={{ color: message == "Success!"? "green": "red" }}>
          {message}
        </Text>
      </SafeAreaView>
    );
  }
