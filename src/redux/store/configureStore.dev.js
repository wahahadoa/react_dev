import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import createSagaMiddleware, { END } from 'redux-saga'
import { routerReducer } from 'react-router-redux'
import reducers from '../reducers'
import storage from 'redux-persist/es/storage'
import { persistStore, persistCombineReducers } from 'redux-persist'

const config = {
  key: 'root',
  storage,
  debug: true
}

const reducer = persistCombineReducers(config, {
  ...reducers,
  router: routerReducer
})

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(
        sagaMiddleware,
        createLogger()
      )
    )
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }
  store.runSaga = sagaMiddleware.run
  store.close = () => store.dispatch(END)
  
  const persistor = persistStore(store)
  return { persistor, store }
}