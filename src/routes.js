import React from 'react'
import { Route, Redirect } from 'react-router'
import UploadSongs from './containers/UploadSongs'
import DjPanel from './containers/DjPanel'

export const getRoutes = () => {
    return (
        <Route>
            <Route
                path="/upload"
                component={UploadSongs}
            />
            <Route
                path="/dj-controller"
                component={DjPanel}
            />
            <Redirect from="*" to="/upload"/>
        </Route>
    )
}