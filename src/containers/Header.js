import React, { Component } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { transitions } from 'lib/style-utils';
import * as uiActions from 'modules/ui';
import * as categoryActions from 'modules/category';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const Wrapper = styled.div`
    /* 레이아웃 */
    display: flex;
    position: fixed;
    align-items: center;
    justify-content: center;
    height: 60px;
    width: 100%;
    top: 0px;
    z-index: 5;
    cursor: pointer;

    /* 색상 */
    background: #131934;
    color: white;
    border-bottom: 1px solid ${oc.indigo[7]};
    box-shadow: 0 3px 6px rgba(0,0,0,0.10), 0 3px 6px rgba(0,0,0,0.20);

    /* 폰트 */
    font-size: 2.5rem;
    font-family: 'Baloo', cursive;
    
    &:hover {
        color: ${oc.gray[2]};
    }

    &:active {
        color: ${oc.gray[3]};
    }
`;



class Header extends Component {


    async componentDidMount() {
        const { categoryActions,UIActions } = this.props;
        await categoryActions.getInitialCategory();
        UIActions.changeHeaderCategory(this.props.data[0]);
    }

    
    render() {
        const {header,UIActions,data,id,name} = this.props;
        document.onkeydown = function(e){
            var tmp_data = data.find(element =>  'F' + element.id == e.key )
            if(tmp_data){
                UIActions.changeHeaderCategory(tmp_data);
            }
        }   
        return (
            <>
            <Wrapper>
                <img class="logo" src="https://coinness.live/static/media/logo.344b065b.svg" alt="logo"/>
            </Wrapper>
            </>
        );

    }
}

export default connect(
    (state) => ({
        data: state.category.get('data').toJS(),
        id : state.ui.getIn(['header', 'id']),
        name : state.ui.getIn(['header', 'name'])
    }),
    (dispatch) => ({
        categoryActions: bindActionCreators(categoryActions, dispatch),
        UIActions: bindActionCreators(uiActions, dispatch)
    })
)(Header);