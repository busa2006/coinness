import axios from 'axios';

//memo
export const createMemo = ({title, body, code, category,nowTime}) => axios.post('/memo', {title,body,code, category,nowTime});
export const getInitialMemo = () => axios.get('/memo/?_sort=id&_order=DESC&_limit=20'); // 역순으로 최근 작성된 포스트 20개를 불러온다.
export const getRecentMemo = (cursor) => axios.get(`/memo/?id_gte=${cursor+1}&_sort=id&_order=DESC&`); // cursor 기준 최근 작성된 메모를 불러온다.
export const updateMemo = ({id, memo: { title, body, code, category }}) => axios.put(`/memo/${id}`, {title, body, code, category}); // 메모를 업데이트한다
export const deleteMemo = (id) => axios.delete(`/memo/${id}`); // 메모를 제거한다
export const getPreviousMemo = (endCursor) => axios.get(`/memo/?_sort=id&_order=DESC&_limit=20&id_lte=${endCursor-1}`); // endCursor 기준 이전 작성된 메모를 불러온다
export const getSearchMemo = (title) => axios.get(`/memo/?_sort=id&_order=DESC&_limit=20&q=${title}`); 
export const getSearchMemoByCategory = (title,category) => axios.get(`/memo/?_sort=id&_order=DESC&_limit=20&q=${title}&category=${category}`);

//category
export const getInitialCategory = () => axios.get('/category?_sort=id'); 