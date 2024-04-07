import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import employeeReducer from './employeeReducer';

const rootReducer = combineReducers({
    employee: employeeReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
