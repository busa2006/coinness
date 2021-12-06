import React, { Component } from 'react';
import { InputPlaceholder, WhiteBox } from 'components/WriteMemo';
import { InputSet, SaveButton } from 'components/Shared';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as uiActions from 'modules/ui';
import enhanceWithClickOutside from 'react-click-outside';
import * as memoActions from 'modules/memo';
import DropdownList from 'components/DropdownList'
class WriteMemo extends Component {

    constructor (props) {
        super(props);
        this.state = {
          dropdownOpen: false
        }
    }

    toggle = (e) => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
    }

    handleFocus = () => {
        const { focused, UIActions } = this.props;

        // 포커스 된 상태가 아닐 때만 실행합니다.
        if(!focused) {
            UIActions.focusInput();
        }
    }

    handleClickOutside = () => {
        const { UIActions, focused, title, body } = this.props;

        if(focused) { // 포커스가 되어 있지 않을때만 실행한다
            if(title !== '' || body !== '') return; // 만약에 title 이나 body 가 비어있지 않다면 유지시킨다
            UIActions.blurInput();
        }
    }

     handleChange = (e) => {
        const { UIActions } = this.props;
        const { name, value } = e.target;
        UIActions.changeInput({name, value});
    }

    handleEditChange = (newValue) => {
        const { UIActions } = this.props;
        UIActions.changeInput({name:"code",value:newValue});
    }
      

    handleCreate = async () => {
        const { title, body, code, category, cursor, MemoActions, UIActions } = this.props;
        try {
            // 메모 생성 API 호출
            const today = new Date();
            const hours = ('0' + today.getHours()).slice(-2); 
            const minutes = ('0' + today.getMinutes()).slice(-2);
            const nowTime = hours + ':' + minutes;
            await MemoActions.createMemo({
                title, body, code, category, nowTime
            });
            // 신규 메모를 불러옵니다
            // cursor 가 존재하지 않는다면, 0을 cursor 로 설정합니다.
            await MemoActions.getRecentMemo(cursor ? cursor : 0);
            UIActions.resetInput();
            // TODO: 최근 메모 불러오기

        } catch(e) {
            console.log(e); // 에러 발생
        }
    }

    handleCategoryChange = (e) => {
        const { UIActions } = this.props;
        const { id } = e.target;
        UIActions.changeInput({
            name:"category",value:id 
        });
    }

    componentDidMount(){
        const { UIActions } = this.props;
        UIActions.changeInput({
            name:"category",value:'1' 
        });
    }

    render() {
        const { handleFocus, handleChange, handleCreate, handleEditChange,handleCategoryChange, toggle} = this;
        const { focused, title, body, code, categories,category } = this.props;
        const { dropdownOpen } = this.state
        return (
            focused ? /* 포커스 된 상태 */ ( 
                <WhiteBox>
                    <InputSet onChange={handleChange} onEditChange={handleEditChange} title={title} body={body} code={code} />
                    
                    <div>
                        {/* <DropdownList categories={categories} 
                                    handleCategoryChange={handleCategoryChange} 
                                    dropdownOpen={dropdownOpen} 
                                    toggle={toggle}
                                    categoryName={categories.find(e => e.id == category)}
                                    /> */}
                        <div style={{padding:'1rem 0.5rem 1rem 0.5rem' }}>
                            <SaveButton onClick={handleCreate}/>
                        </div>
                    </div>
                    
                </WhiteBox>
            ) : /* 포커스 풀린 상태 */  ( 
                <WhiteBox onClick={handleFocus}>
                    <InputPlaceholder/>
                </WhiteBox>
            )
        );
    }
}

export default connect(
    (state) => ({
        focused: state.ui.getIn(['write', 'focused']),
        title: state.ui.getIn(['write', 'title']),
        body: state.ui.getIn(['write', 'body']),
        code: state.ui.getIn(['write', 'code']),
        category: state.ui.getIn(['write', 'category']),
        nowTime: state.ui.getIn(['write', 'nowTime']),
        cursor: state.memo.getIn(['data', 0, 'id']),
        categories: state.category.get('data').toJS()
    }),
    (dispatch) => ({
        UIActions: bindActionCreators(uiActions, dispatch),
        MemoActions: bindActionCreators(memoActions, dispatch)
    })
)(enhanceWithClickOutside(WriteMemo));