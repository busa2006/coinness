import React, { Component } from 'react';
import styled from 'styled-components';
import { WhiteBox } from 'components/WriteMemo';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as uiActions from 'modules/ui';
import * as memoActions from 'modules/memo';
import enhanceWithClickOutside from 'react-click-outside';

const TitleInput = styled.input`
    width: 100%;
    border: none;
    outline: none;
    font-weight: 300;
    font-size: 1.1rem;
    resize: none;
`;

class SearchInput extends Component {


    handleChange = (e) => {
        const { UIActions } = this.props;
        const { name, value } = e.target;

        UIActions.changeSearchInput({name, value});
    }

    onKeyPress = (e) => {
        if(e.key == 'Enter'){
            const { MemoActions, title, id } = this.props;
            if(id == '1'){
                MemoActions.getSearchMemo(title,id);    
            }else{
                MemoActions.getSearchMemoByCategory(title,id);
            }
            
        }
    }

    render() {

        const { handleChange, onKeyPress } = this;
        // const { title } = this.props;

        return (
            <WhiteBox>
                <TitleInput 
                    name="title"
                    onChange={handleChange}
                    placeholder="검색"
                    onKeyPress={onKeyPress}
                    //innerRef={ref=>this.title = ref}
                    //value={title}
                />
            </WhiteBox>
        );
    }
}

export default connect(
    (state) => ({
        title: state.ui.getIn(['search', 'title']),
        memos: state.memo.get('data'),
        id : state.ui.getIn(['header', 'id']),
    }),
    (dispatch) => ({
        UIActions: bindActionCreators(uiActions, dispatch),
        MemoActions: bindActionCreators(memoActions, dispatch)
    })
)(enhanceWithClickOutside(SearchInput));