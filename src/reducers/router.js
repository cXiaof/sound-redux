import { INITIAL_ROUTE } from '../constants/RouterConstants'

const initialState = {
    route: { ...INITIAL_ROUTE }
}

const router = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_ROUTE':
            return {
                ...state,
                route: action.route
            }

        default:
            return state
    }
}

export default router
