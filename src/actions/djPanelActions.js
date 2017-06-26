export const RESET_PANEL = 'RESET_PANEL'
export const PLAY_SONG = 'PLAY_SONG'
export const PAUSE_SONG = 'PAUSE_SONG'
export const STOP_SONG = 'STOP_SONG'
export const SET_SONG = 'SET_SONG'
export const SET_SPEED = 'SET_SPEED'
export const SET_POSITION = 'SET_POSITION'
export const SET_VOLUME = 'SET_VOLUME'
export const SET_VOLUME_COMMON = 'SET_VOLUME_COMMON'

export function resetDjPanel() {
    return {
        type: RESET_PANEL
    }
}

export function playSong(player) {
    return {
        type: PLAY_SONG,
        payload: {
            player
        }
    }
}

export function pauseSong(player) {
    return {
        type: PAUSE_SONG,
        payload: {
            player
        }
    }
}

export function stopSong(player) {
    return {
        type: STOP_SONG,
        payload: {
            player
        }
    }
}

export function setSong(player, index) {
    return {
        type: SET_SONG,
        payload: {
            player,
            index
        }
    }
}

export function setSpeed(player, speed) {
    return {
        type: SET_SPEED,
        payload: {
            player,
            speed
        }
    }
}

export function setPosition(player, position) {
    return {
        type: SET_POSITION,
        payload: {
            player,
            position
        }
    }
}

export function setVolume(player, volume) {
    return {
        type: SET_VOLUME,
        payload: {
            player,
            volume
        }
    }
}

export function setVolumeCommon(volume) {
    return {
        type: SET_VOLUME_COMMON,
        payload: {
            volume
        }
    }
}