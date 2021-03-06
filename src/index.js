import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux'
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';


import {createStore,compose,applyMiddleware,combineReducers} from 'redux'
import burgerBuilder from './Store/reducers/burgerBuilder'
import order from './Store/reducers/order'
import authReducer from './Store/reducers/auth'
// import {logoutSaga} from './Store/sagas/auth';
// import {watchAuth} from './Store/sagas/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store=createStore(burgerBuilder,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()    
// )

const rootReducer=combineReducers({
    burgerBuilder:burgerBuilder,
    order:order,
    auth:authReducer
})  

const sagaMiddleware=createSagaMiddleware();


const store=createStore(rootReducer,
    composeEnhancers(applyMiddleware(thunk,sagaMiddleware))
)

// sagaMiddleware.run(watchAuth);

const app=(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
    
)

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
