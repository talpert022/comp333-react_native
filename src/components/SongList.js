import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';

function SongList() {

  const [songList, setSongList] = useState([]);
  const [editItem, setEditItem] = useState("");
  const [deleteItem, setDeleteItem] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [rateMode, setRateMode] = useState(false);
  const [newSong, setNewSong] = useState("");
  const [newArtist, setNewArtist] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://localhost:8000/api/songs/')
      .then((response) => response.json())
      .then((json) => setSongList(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }, [editMode, deleteMode, rateMode]);

  async function handleEdit () {
    await fetch(`https://localhost:8000/api/songs/${editItem.song}`, { method: 'DELETE' })
      .then()
      .catch((err) => console.error(err))

    await fetch(`http://localhost:8000/api/songs/`), {
      method: 'POST',
      body: JSON.stringify({
        song: `${newSong}`,
        artist: `${newArtist}`
      })
      .then()
      .catch((err) => console.error(err))
    }

    setEditMode(false)
  };

  async function handleDelete () {
    await fetch(`https://localhost:8000/api/songs/${deleteItem.song}`, { method: 'DELETE' })
      .then()
      .catch((err) => console.error(err))

    setDeleteMode(false)
  };

  const handleSongChange = event => {
    setNewSong(event.target.value)
  };

  const handleArtistChange = event  => {
    setNewArtist(event.target.value)
  };

  const itemsList = songList.map(item => (
    <FlatList>
      data={songList}
      renderItem={({ item }) => (
        <Text>{item.song + 'by ' + item.artist}</Text>
      )}
    </FlatList>
    )
  );


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Song List Goes Here</Text>
    </View>
  );
}

export default SongList;