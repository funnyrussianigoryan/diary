import {render} from 'react-dom'
import React from 'react'
import Header from './components/Header/Header.js'
import Toggle from './components/Toggle/Toggle.js'
import Calendar from './components/Calendar/Calendar.js'
import CalendarDayTodoList from './components/Calendar/CalendarDayTodoList.js'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import reducers from './components/Reducer/reduce.js'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'


const persistConfig = {
    key: 'root',
    storage,
}
      
const persistedReducer = persistReducer(persistConfig, reducers);

let store = createStore(persistedReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
let persistor = persistStore(store)

const Main = () => {
    return(
        <>
            <CalendarDayTodoList />
            <Header />
            <Toggle />
            <Calendar />
        </>
    )
}

render( <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Main />
            </PersistGate>
        </Provider>, 
    document.getElementById('root'));

