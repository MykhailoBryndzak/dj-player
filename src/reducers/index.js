import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import panel from './djPanelReducer'
import songs from './uploadSongsReducers'

export default combineReducers({
    routing: routerReducer,
    panel,
    songs
})
