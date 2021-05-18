import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CreateSong from './src/components/CreateSong';
import SearchSong from './src/components/SearchSong';
import SongList from './src/components/SongList';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Search" component={SearchSong} />
        <Tab.Screen name="Home" component={SongList} />
        <Tab.Screen name="Create" component={CreateSong} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
