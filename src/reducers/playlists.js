import {
    HISTORY_PLAYLIST,
    PLAYLIST_PLAYLIST_TYPE,
    SESSION_PLAYLIST_TYPE,
    SESSION_STREAM_PLAYLIST
} from '../constants/PlaylistConstants'

const initialState = {
    isFetching: false,
    items: [],
    futureUrl: null,
    nextUrl: null
}

function playlist(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_NEW_STREAM_SONGS_SUCCESS':
            return {
                ...state,
                futureUrl: action.futureUrl
            }

        case 'FETCH_SONGS_REQUEST':
            return {
                ...state,
                isFetching: true
            }

        case 'FETCH_SONGS_SUCCESS':
            return {
                ...state,
                futureUrl: action.futureUrl,
                isFetching: false,
                items: [...new Set([...state.items, ...action.items])],
                nextUrl: action.nextUrl
            }

        case 'LOAD_NEW_STREAM_SONGS':
            return {
                ...state,
                items: [...action.newStreamSongs, ...state.items]
            }

        case 'PLAY_SONG': {
            if (action.playlist !== HISTORY_PLAYLIST) {
                return {
                    ...state,
                    items: [action.id, ...state.items.filter((id) => id !== action.id)]
                }
            }

            return state
        }

        default:
            return state
    }
}

export default function playlists(state = {}, action) {
    switch (action.type) {
        case 'FETCH_NEW_STREAM_SONGS_SUCCESS':
        case 'LOAD_NEW_STREAM_SONGS':
            return {
                ...state,
                [SESSION_STREAM_PLAYLIST]: playlist(state[SESSION_STREAM_PLAYLIST], action)
            }

        case 'FETCH_SONGS_REQUEST':
        case 'FETCH_SONGS_SUCCESS':
            return {
                ...state,
                [action.playlist]: playlist(state[action.playlist], action)
            }

        case 'PLAY_SONG':
            return {
                ...state,
                [HISTORY_PLAYLIST]: playlist(state[HISTORY_PLAYLIST], {
                    ...action,
                    id: state[action.playlist].items[action.playingIndex]
                })
            }

        case 'LOGOUT':
            return Object.keys(state)
                .filter((key) => {
                    const type = key.split('|')[0]
                    return type !== SESSION_PLAYLIST_TYPE && type !== PLAYLIST_PLAYLIST_TYPE
                })
                .reduce(
                    (obj, key) => ({
                        ...obj,
                        [key]: state[key]
                    }),
                    {}
                )

        default:
            return state
    }
}
