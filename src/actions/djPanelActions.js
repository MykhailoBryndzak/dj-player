export const PLAY_SONG = 'PLAY_SONG'

export function playSong(player) {
    return {
        type: PLAY_SONG,
        payload: {
            player
        }
    }
}