import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router, hashHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import {getRoutes} from './routes'
import configureStore from './store/configureStore'

let store = configureStore()

let history = syncHistoryWithStore(hashHistory, store)

ReactDOM.render(
    <Provider store={store}>
        <Router history={history} routes={getRoutes(store)}/>
    </Provider>,
    document.getElementById('root')
)
