import React, { useEffect, useState } from 'react';
import { ScrollView, FlatList, Text, View, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import Slider from '@react-native-community/slider';
import { set } from 'react-native-reanimated';

const SongList = () => {

  const [songList, setSongList] = useState([]);
  const [ratingList, setRatingList] = useState([]);
  const [editItem, setEditItem] = useState("");
  const [deleteItem, setDeleteItem] = useState("");
  const [rateItem, setRateItem] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [rateMode, setRateMode] = useState(false);
  const [newSong, setNewSong] = useState("");
  const [newArtist, setNewArtist] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [user, setUser] = useState("");

  useEffect(() => {
    fetch('http://localhost:8000/api/songs/')
      .then((response) => response.json())
      .then((json) => setSongList(json))
      .then(() =>

    fetch('http://localhost:8000/api/ratings/'))
      .then((response1) => response1.json())
      .then((json1) => setRatingList(json1))
      .catch((error) => console.error(error))

  }, [editMode, deleteMode, rateMode]);

  const handleEdit = () => {
    let toSubmit = {song: newSong, artist: newArtist}
    fetch(`http://localhost:8000/api/songs/${editItem.song}/`, { method: 'DELETE' })
    .then(() => 
    fetch(`http://localhost:8000/api/songs/`, { method: 'POST',
      body: JSON.stringify(toSubmit),
      headers: {"Content-type": "application/json"}
    }))
    .catch((error) => console.error(error))
    .finally(() => setEditMode(false))
  }

  const handleDelete = () => {
    fetch(`http://localhost:8000/api/songs/${deleteItem.song}/`, { method: 'DELETE' })
    .then()
    .catch((error) => console.error(error))
    .finally(() => setDeleteMode(false))
  }

  const handleRate = () => {
    let toSubmit = {username: user, song: rateItem.song, rating: parseInt(newRating)}
    let songDeleted = rateItem
    let deletedRatings = ratingList.filter(obj => obj.song === songDeleted.song && obj.username != user)
    deletedRatings.push(toSubmit)
    fetch(`http://localhost:8000/api/songs/${songDeleted.song}/`, { method: 'DELETE' })
    .then(() => 

    fetch(`http://localhost:8000/api/songs/`, { method: 'POST',
    body: JSON.stringify(songDeleted),
    headers: {"Content-type": "application/json"}
    }))
    .then(() => {

      for(let i=0; i<deletedRatings.length; i++){
        fetch(`http://localhost:8000/api/ratings/`, { method: 'POST',
          body: JSON.stringify(deletedRatings[i]),
          headers: {"Content-type": "application/json"}
        })
      }
    })
    .catch((error) => console.error(error))
    .finally(() => setRateMode(false))
  }

  let editForm;
  let deleteForm;
  let rateForm;

  if(editMode) {
    editForm = (
      <View>
        <Text>Editing {editItem.song}, by: {editItem.artist}</Text>
        <TextInput onChangeText={setNewSong} value={newSong} placeholder="New Song Name"/>
        <TextInput onChangeText={setNewArtist} value={newArtist} placeholder="New Artist Name"/>
        <TouchableOpacity onPress={handleEdit} style={{backgroundColor: "gray", height:35}}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }else{
    editForm = (
      <View />
    )
  }

  if(deleteMode) {
    deleteForm = (
      <View>
        <Text>Are you sure you want to delete {deleteItem.song}, by: {deleteItem.artist}?</Text>
        <TouchableOpacity onPress={handleDelete} style={{backgroundColor: "crimson", height:35}}>
          <Text>Delete</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setDeleteMode(false)} style={{backgroundColor: "gray", height:35}}>
          <Text>Cancel</Text>
        </TouchableOpacity>
      </View>
    )
  }else{
    deleteForm = (
      <View />
    )
  }

  if(rateMode) {
    rateForm = (
      <View>
        <Text>Rating {rateItem.song}, by: {rateItem.artist}</Text>
        <TextInput onChangeText={setUser} value={user} placeholder="Enter Your Username" />
        <Text>{newRating}</Text>
        <Slider
          style={{width: 200, height: 40}}
          minimumValue={0}
          maximumValue={10}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          step={1}
          onValueChange={sliderValue => setNewRating(sliderValue)}
        />
        <TouchableOpacity onPress={handleRate} style={{backgroundColor: "gray", height:35}}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }else{
    rateForm = (
      <View />
    )
  }

  const getAvg = item => {
    let song = item.song;
    let temp = ratingList.filter(obj => obj.song === song);
    if(temp.length === 0){
      return 0
    }
    let total = 0;
    for(var i = 0; i < temp.length; i++) {
      total += temp[i].rating
    };
    return Math.round(total/temp.length);
  };

  const numRatings = item => {
    let song = item.song;
    let temp = ratingList.filter(obj => obj.song === song);
    return temp.length;
  }

  const renderItem = ({ item }) => (
      <View>
        <Text>{item.song} by: {item.artist}, Average Rating: {getAvg(item)}, over {numRatings(item)} ratings</Text>
        <View>
          <TouchableOpacity 
            onPress={() => { setEditItem(item), setEditMode(true), setDeleteMode(false), setRateMode(false) }} 
            style={{backgroundColor: "gray", height:35}}>
            <Text>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => { setDeleteItem(item), setEditMode(false), setDeleteMode(true), setRateMode(false) }} 
            style={{backgroundColor: "crimson", height:35}}>
            <Text>Delete</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => { setRateItem(item), setEditMode(false), setDeleteMode(false), setRateMode(true) }} 
            style={{backgroundColor: "lightblue", height:35}}>
            <Text>Rate</Text>
          </TouchableOpacity>
        </View>
      </View>
  )

  return (
    <ScrollView>
      <SafeAreaView>
        <FlatList
          data={ songList }
          renderItem={ renderItem }
          keyExtractor={ item => item.song }
        />
        <View>
          {editForm}
          {deleteForm}
          {rateForm}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

export default SongList;