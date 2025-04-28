import React, { useState,useEffect } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {setupPlayer,addTrack} from "../musicPlayerService"

function App(): React.JSX.Element {
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  async function setup(){
    let isSetup = await setupPlayer();
    if(isSetup){
      await addTrack();
    }
    setIsPlayerReady(isSetup);
  }
  useEffect(() => {
    setup();
  }, [])

  if(!isPlayerReady){
    return (
      <SafeAreaView>
        <ActivityIndicator/>
      </SafeAreaView>
    )
  }
  
  return (
    <View>
      <Text>
        Hello, this is a test for the Spotify Music app.
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default App;
