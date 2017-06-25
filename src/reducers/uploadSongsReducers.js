import { LOAD_SONGS } from '../actions/uploadSongsActions'

let initialState = {
    loading: false
}

export default function (state = initialState, action) {

    switch (action.type) {
        case LOAD_SONGS:
            return { ...state, loading: true }

        default:
            return state
    }

}
