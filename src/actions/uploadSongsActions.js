export const LOAD_SONGS = 'LOAD_SONGS';

export function loadSong(player) {
    return {
        type: LOAD_SONGS,
        payload: {
            player
        }
    }
}