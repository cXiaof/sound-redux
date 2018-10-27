const initialState = {
    followings: {},
    id: null,
    likes: {},
    oauthToken: null,
    newStreamSongs: []
}

const session = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_NEW_STREAM_SONGS_SUCCESS':
            return {
                ...state,
                newStreamSongs: [...state.newStreamSongs, ...action.songs]
            }

        case 'FETCH_SESSION_FOLLOWINGS_SUCCESS':
            return {
                ...state,
                followings: action.followings
            }

        case 'FETCH_SESSION_LIKES_SUCCESS':
            return {
                ...state,
                likes: action.likes
            }

        case 'FETCH_SESSION_USER_SUCCESS':
            return {
                ...state,
                id: action.id
            }

        case 'LOAD_NEW_STREAM_SONGS':
            return {
                ...state,
                newStreamSongs: []
            }

        case 'LOGIN_SUCCESS':
            return {
                ...state,
                oauthToken: action.oauthToken
            }

        case 'TOGGLE_FOLLOW':
            return {
                ...state,
                followings: {
                    ...state.followings,
                    [action.id]: action.follow ? 1 : 0
                }
            }

        case 'TOGGLE_LIKE':
            return {
                ...state,
                likes: {
                    ...state.likes,
                    [action.id]: action.liked ? 1 : 0
                }
            }

        case 'LOGOUT':
            return { ...initialState }

        default:
            return state
    }
}

export default session
