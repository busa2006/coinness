import React, { Component } from 'react';
import MemoViewer from 'components/MemoViewer';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as uiActions from 'modules/ui';
import * as memoActions from 'modules/memo';


class MemoViewerContainer extends Component {

    constructor (props) {
        super(props);
        this.state = {
          dropdownOpen: false
        }
    }

    toggle = (e) => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
    }

    handleChange = (e) => {
        const { UIActions } = this.props;
        const { name, value } = e.target;

        UIActions.changeViewerInput({
            name, value
        });
    }

    handleCategoryChange = (e) => {
        const { UIActions } = this.props;
        const { id } = e.target;
        UIActions.changeViewerInput({
            name:"category",value:id 
        });
    }

    handleEditChange = (newValue) => {
        const { UIActions } = this.props;
        UIActions.changeViewerInput({
            name:"code",value:newValue
        });
    }

    

    handleUpdate = () => {
        const { MemoActions, UIActions, memo } = this.props;
        const { id, title, body, code, category } = memo.toJS();
        MemoActions.updateMemo({
            id,
            memo: { title, body, code, category }
        });
        UIActions.closeViewer();
    }

    handleDelete = () => {
        const { MemoActions, UIActions, memo } = this.props;
        const { id } = memo.toJS();
        MemoActions.deleteMemo(id);
        UIActions.closeViewer();
    }
   

    render() {
        const { visible, memo, UIActions,categories } = this.props;
        const { title, body, code, category } = memo.toJS();
        const { handleChange, handleUpdate, handleDelete,handleEditChange,toggle,handleCategoryChange } =this;
        
        return (
            <MemoViewer
                visible={visible}
                title={title}
                body={body}
                code={code}
                category={category}
                onChange={handleChange}
                onClose={UIActions.closeViewer}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
                handleEditChange={handleEditChange}
                handleCategoryChange={handleCategoryChange}
                dropdownOpen={this.state.dropdownOpen}
                toggle={toggle}
                categories={categories}
                categoryName = {categories.find(e => e.id == category)}
            />
        );
    }
}

export default connect(
    (state) => ({
        visible: state.ui.getIn(['memo', 'open']),
        memo: state.ui.getIn(['memo', 'info']),
        categories: state.category.get('data').toJS()
    }),
    (dispatch) => ({
        UIActions: bindActionCreators(uiActions, dispatch),
        MemoActions: bindActionCreators(memoActions, dispatch)
    })
)(MemoViewerContainer);