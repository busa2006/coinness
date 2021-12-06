import { combineReducers } from 'redux';
import { penderReducer } from 'redux-pender';
import memo from './memo';
import ui from './ui';
import category from './category';

export default combineReducers({
    memo,
    ui,
    category,
    pender: penderReducer
});