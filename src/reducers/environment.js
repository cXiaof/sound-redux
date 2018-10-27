const initialState = {
    height: 0,
    width: 0
}

const environment = (state = initialState, action) => {
    switch (action.type) {
        case 'WINDOW_RESIZE':
            return {
                ...state,
                height: action.height,
                width: action.width
            }

        default:
            return state
    }
}

export default environment
