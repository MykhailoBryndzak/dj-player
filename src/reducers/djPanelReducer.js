import { PLAY_SONG } from '../actions/djPanelActions'

let initialState = {
    playing: false
}

export default function(state = initialState, action) {
    switch (action.type) {
        case PLAY_SONG:
            return { ...state, loading: true }

        default:
            return state
    }
}