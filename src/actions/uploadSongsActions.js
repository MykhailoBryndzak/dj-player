export const LOAD_SONGS_START = 'LOAD_SONGS_START'
export const LOAD_SONGS_END = 'LOAD_SONGS_END'
export const REMOVE_SONG = 'REMOVE_SONG'

export function loadSongsStart(player) {
    return {
        type: LOAD_SONGS_START,
        payload: {
            player
        }
    }
}

export function loadSongsEnd(player, songs) {
    return {
        type: LOAD_SONGS_END,
        payload: {
            player,
            songs
        }
    }
}

export function removeSong(player, index) {
    return {
        type: REMOVE_SONG,
        payload: {
            player,
            index
        }
    }
}