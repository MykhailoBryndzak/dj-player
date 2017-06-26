import _ from 'lodash'
import {
    RESET_PANEL, PLAY_SONG, PAUSE_SONG, STOP_SONG, SET_SONG,
    SET_SPEED, SET_POSITION, SET_VOLUME,
    SET_VOLUME_COMMON
} from '../actions/djPanelActions'

let initialState = {
    left: {
        index: 0,
        playing: false,
        speed: 1,
        position: 0,
        volume: 100,
    },
    right: {
        index: 0,
        playing: false,
        speed: 1,
        position: 0,
        volume: 100,
    },
    common: {
        volume: 100,
    }
}

export default function (state = initialState, action) {
    let {type, payload} = action
    let delta = payload ? _.cloneDeep(state[payload.player]) : null

    switch (type) {
        case RESET_PANEL:
            return  {...initialState}

        case PLAY_SONG:
            delta.playing = true;

            return Object.assign({}, state, {
                [payload.player]: delta,
            });
        case PAUSE_SONG:
            delta.playing = false;

            return Object.assign({}, state, {
                [payload.player]: delta,
            });
        case STOP_SONG:
            delta.playing = false
            delta.position = 0

            return Object.assign({}, state, {
                [payload.player]: delta,
            })
        case SET_SONG:
            delta.index = payload.index

            return Object.assign({}, state, {
                [payload.player]: delta,
            })
        case SET_SPEED:
            delta.speed = payload.speed

            return Object.assign({}, state, {
                [payload.player]: delta,
            })
        case SET_POSITION:
            delta.position = payload.position

            return Object.assign({}, state, {
                [payload.player]: delta,
            })
        case SET_VOLUME:
            delta.volume = payload.volume

            return Object.assign({}, state, {
                [payload.player]: delta,
            })
        case SET_VOLUME_COMMON:
            delta = _.cloneDeep(state.common)
            delta.volume = payload.volume

            return Object.assign({}, state, {
                common: delta,
            })
        default:
            return state
    }
}