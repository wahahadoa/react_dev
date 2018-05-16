import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware, { END } from 'redux-saga'
import reducers from '../reducers'
import { routerReducer } from 'react-router-redux'
import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage'

const config = {
  key: 'root',
  storage
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
    applyMiddleware(sagaMiddleware)
  )

  store.runSaga = sagaMiddleware.run
  store.close = () => store.dispatch(END)

  const persistor = persistStore(store)
  return { persistor, store }
}