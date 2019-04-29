import { SESSION_STREAM_PLAYLIST } from '../constants/PlaylistConstants'

const initialState = {
    currentTime: 0,
    duration: 0,
    isPlaying: false,
    muted: false,
    repeat: false,
    shuffle: false,
    volume: 1,
    playingIndex: null,
    playlist: null
}

const player = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_NEW_STREAM_SONGS':
            return {
                ...state,
                playingIndex:
                    state.playlist === SESSION_STREAM_PLAYLIST &&
                    state.playingIndex !== null
                        ? state.playingIndex + action.newStreamSongs.length
                        : state.playingIndex
            }

        case 'ON_LOAD_START':
            return {
                ...state,
                currentTime: 0,
                duration: 0
            }

        case 'ON_LOADED_METADATA':
            return {
                ...state,
                duration: action.duration
            }

        case 'ON_PAUSE':
            return {
                ...state,
                isPlaying: false
            }

        case 'ON_PLAY':
            return {
                ...state,
                isPlaying: true
            }

        case 'ON_TIME_UPDATE':
            return {
                ...state,
                currentTime: action.currentTime
            }

        case 'ON_VOLUME_CHANGE':
            return {
                ...state,
                muted: action.muted,
                volume: action.volume
            }

        case 'PLAY_SONG':
            return {
                ...state,
                playingIndex: action.playingIndex,
                playlist: action.playlist
            }

        case 'TOGGLE_REPEAT':
            return { ...state, repeat: !state.repeat }

        case 'TOGGLE_SHUFFLE':
            return { ...state, shuffle: !state.shuffle }

        case 'LOGOUT':
            return { ...initialState }

        default:
            return state
    }
}

export default player
