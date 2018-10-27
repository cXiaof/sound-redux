import { getPlaylist, getRepeat, getShuffle } from '../selectors/CommonSelectors'
import { getNextIndex, getPrevIndex, getShuffleIndex } from '../selectors/PlayerSelectors'

export const onLoadedMetadata = (duration) => ({
    type: 'ON_LOADED_METADATA',
    duration
})

export const onLoadStart = () => ({
    type: 'ON_LOAD_START'
})

export const onPause = () => ({
    type: 'ON_PAUSE'
})

export const onPlay = () => ({
    type: 'ON_PLAY'
})

export const onTimeUpdate = (currentTime) => ({
    type: 'ON_TIME_UPDATE',
    currentTime
})

export const onVolumeChange = (muted, volume) => ({
    type: 'ON_VOLUME_CHANGE',
    muted,
    volume
})

export const playSong = (playlist, playingIndex) => ({
    type: 'PLAY_SONG',
    playlist,
    playingIndex
})

export const playPrevSong = () => (dispatch, getState) => {
    const state = getState()
    const playlist = getPlaylist(state)
    const prevIndex = getPrevIndex(state)

    if (prevIndex !== null) {
        dispatch(playSong(playlist, prevIndex))
    }
}

export const playNextSong = (fromButtonPress = false) => (dispatch, getState) => {
    const state = getState()
    const nextIndex = getNextIndex(state)
    const playlist = getPlaylist(state)
    const repeat = getRepeat(state)
    const shuffle = getShuffle(state)

    if (shuffle) {
        const shuffleIndex = getShuffleIndex(state)
        dispatch(playSong(playlist, shuffleIndex))
    } else if (nextIndex !== 0 || repeat || fromButtonPress) {
        dispatch(playSong(playlist, nextIndex))
    }
}

export const playNextSongFromButton = () => (dispatch) => dispatch(playNextSong(true))

export const toggleRepeat = () => ({ type: 'TOGGLE_REPEAT' })

export const toggleShuffle = () => ({ type: 'TOGGLE_SHUFFLE' })
