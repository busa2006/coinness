import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS  } from 'immutable';
import { pender } from 'redux-pender';
import * as WebAPI from 'lib/web-api';

// 액션 타입
const GET_INITIAL_CATEGORY = 'category/GET_INITIAL_CATEGORY';

// 액션 생성자
export const getInitialCategory = createAction(GET_INITIAL_CATEGORY, WebAPI.getInitialCategory);

const initialState = Map({
    data: List()
});

export default handleActions({
     // 초기 메모 로딩
     ...pender({
        type: GET_INITIAL_CATEGORY,
        onSuccess: (state, action) => state.set('data', fromJS(action.payload.data))
    }),
}, initialState);