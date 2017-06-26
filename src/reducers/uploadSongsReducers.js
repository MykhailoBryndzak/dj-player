import {LOAD_SONGS_START, LOAD_SONGS_END, REMOVE_SONG} from '../actions/uploadSongsActions'

let initialState = {
    loading: false,

    left: {
        loading: false,
        data: [],
    },
    right: {
        loading: false,
        data: [],
    },
}

export default function (state = initialState, action) {
    let {type, payload} = action

    switch (type) {
        case LOAD_SONGS_START:
            return {...state, loading: true}

        case LOAD_SONGS_END:
            let data = {data: state[payload.player].data.concat(payload.songs)}
            return {...state, loading: false, [payload.player]: data}

        case REMOVE_SONG:
            state[payload.player].data.splice(payload.index, 1)
            return {...state}

        default:
            return state
    }
}
