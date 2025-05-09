import React, { use } from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import TrackPlayer, { State, usePlaybackState } from 'react-native-track-player'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { playbackService } from '../../musicPlayerService'

const ControlCenter = () => {

    const playBackState = usePlaybackState()
    // next button
    const skipToNext = async () => {
        await TrackPlayer.skipToNext()
    }
    // Previous button
    const skipToPrevious = async () => {
        await TrackPlayer.skipToPrevious()
    }

    const togglePlayBack = async (playback: State) => {
        const currentTrack = await TrackPlayer.getActiveTrackIndex()
        if (currentTrack !== null) {
            if (playback === State.Paused || playback === State.Ready) {
                await TrackPlayer.play()
            } else {
                await TrackPlayer.pause()
            }
        }
    }
    return (
        <View style={styles.container}>
            <Pressable onPress={skipToPrevious}>
                <Icon name="skip-previous" style={styles.icon} size={40} />
            </Pressable>
            <Pressable onPress={() => playBackState.state && togglePlayBack(playBackState.state)}>
                <Icon name={playBackState.state === State.Playing ? 'pause' : 'play-arrow'}
                 style={styles.icon}
                 size={75} />
            </Pressable>
            <Pressable onPress={skipToNext}>
                <Icon name="skip-next" style={styles.icon} size={40} />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 56,

        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        color: '#FFFFFF',
        marginHorizontal: 24,
        padding: 12,
        borderRadius: 50,
    },
    playButton: {
        marginHorizontal: 24,
    },
});
export default ControlCenter