import React from 'react'
import {Route, Redirect} from 'react-router'
import UploadSongs from './containers/UploadSongs'
import DjPanel from './containers/DjPanel'

export const getRoutes = store => {
    let songsPresent = (nextState, replace) => {
        let data = store.getState().songs

        !data.left.data.length && !data.right.data.length && replace('/upload')
    };
    return (
        <Route>
            <Route
                path="/upload"
                component={UploadSongs}
            />
            <Route
                path="/dj-controller"
                component={DjPanel}
                onEnter={songsPresent}
            />
            <Redirect from="*" to="/upload"/>
        </Route>
    )
}