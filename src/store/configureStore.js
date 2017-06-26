import {createStore} from 'redux'
import rootReducer from '../reducers'

export default function configureStore(initialState) {
    let store = createStore(rootReducer, initialState)

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            let nextRootReducer = require('../reducers')
            store.replaceReducer(nextRootReducer)
        })
    }

    return store
}
