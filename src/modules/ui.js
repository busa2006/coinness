import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

const FOCUS_INPUT = 'ui/write/FOCUS_INPUT';
const BLUR_INPUT = 'ui/write/BLUR_INPUT';
const CHANGE_INPUT = 'ui/write/CHANGE_INPUT';
const RESET_INPUT = 'ui/write/RESET_INPUT';

const OPEN_VIEWER = 'OPEN_VIEWER';
const CLOSE_VIEWER = 'CLOSE_VIEWER';
const CHANGE_VIEWER_INPUT = 'CHANGE_VIEWER_INPUT';

const CHANGE_SEARCH_INPUT = 'CHANGE_SEARCH_INPUT';
const CHANGE_HEADER_CATEGORY = 'CHANGE_HEADER_CATEGORY';

const CHANGE_MEMO_CATEGORY = 'CHANGE_MEMO_CATEGORY';

export const focusInput = createAction(FOCUS_INPUT);
export const blurInput = createAction(BLUR_INPUT);
export const changeInput = createAction(CHANGE_INPUT); // { name, value }
export const resetInput = createAction(RESET_INPUT);

export const openViewer = createAction(OPEN_VIEWER); // memo

export const closeViewer = createAction(CLOSE_VIEWER); 
export const changeViewerInput = createAction(CHANGE_VIEWER_INPUT); // { name, value }

export const changeSearchInput = createAction(CHANGE_SEARCH_INPUT); 
export const changeHeaderCategory = createAction(CHANGE_HEADER_CATEGORY); 
export const changeMemoCategory = createAction(CHANGE_MEMO_CATEGORY); 

const initialState = Map({
    search:Map({
       title:'' 
    }),
    write: Map({
        focused: false,
        title: '',
        body: '',
        code: '',
        category: '',
        nowTime:''
    }),
    memo: Map({
        open: false,
        info: Map({
            id: null,
            title: null,
            body: null,
            code: null,
            category: null,
            nowTime:null
        })
    }),
    header: Map({
        id:'',
        name:''
    })
});

export default handleActions({
    [FOCUS_INPUT]: (state) => state.setIn(['write', 'focused'], true),
    [BLUR_INPUT]: (state) => state.setIn(['write', 'focused'], false),
    [CHANGE_INPUT]: (state, action) => {
        const { name, value } = action.payload;
        return state.setIn(['write', name], value);
    },
    [RESET_INPUT]: (state) => state.set('write', initialState.get('write')).setIn(['write','category'],1),
    [OPEN_VIEWER]: (state, action) => {
        document.body.style.overflow = "hidden";
        return state.setIn(['memo', 'open'], true).setIn(['memo', 'info'], action.payload)
    },
    [CLOSE_VIEWER]: (state, action) => {
        document.body.style.overflow = "unset"
        return state.setIn(['memo', 'open'], false)
    },
    [CHANGE_VIEWER_INPUT]: (state, action) => {
        const { name, value } = action.payload;
        return state.setIn(['memo', 'info', name], value)
    },
    [CHANGE_SEARCH_INPUT]: (state, action) => {
        const { name, value } = action.payload;
        return state.setIn(['search', name], value);
    },
    [CHANGE_HEADER_CATEGORY]: (state, action) => {
        return state.setIn( ['header'] , action.payload)
    },
    [CHANGE_MEMO_CATEGORY]: (state, action) => {
        const { name, value } = action.payload;
        return state.setIn( ['memo', 'info', name], value)
    }
}, initialState);