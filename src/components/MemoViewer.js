import React, { useState } from 'react';
import { InputSet, SaveButton } from 'components/Shared';
import styled from 'styled-components';
import oc from 'open-color';
import PropTypes from 'prop-types';
import { media } from 'lib/style-utils';
import {IoIosTrash,IoMdClose} from 'react-icons/io';
import DropdownList from './DropdownList'
import 'bootstrap/dist/css/bootstrap.css'

// 화면을 불투명하게 해줍니다.
const Dimmed = styled.div`
    background: ${oc.gray[3]};
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    position: fixed;
    z-index: 10;
    opacity: 0.5;
`;

const Viewer = styled.div`
    background: white;
    position: fixed;
    height: auto;
    z-index: 15;
    width:50%;
    padding: 1rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);

    ${media.tablet`
        width: calc(100% - 2rem);
    `}
`;

const Button = styled.div`
    padding-right: 1rem;
    color: ${oc.gray[6]};
    cursor: pointer;

    &:hover {
        color: ${oc.gray[7]};
    }

    &:active {
        color: ${oc.gray[8]};
    }

    font-size: 1.5rem;
`;

const Dropdown = styled.div`
    padding-right: 0.5rem;
    color: ${oc.gray[6]};
    cursor: pointer;

    &:hover {
        color: ${oc.gray[7]};
    }

    &:active {
        color: ${oc.gray[8]};
    }

    font-size: 1.5rem;
`;

const DropdownContent = styled.div`
    display: none;
    position: absolute;
    background-color: #f1f1f1;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
`;


const MemoViewer = ({visible, title, body, code, category, categoryName, onChange, onUpdate, onDelete, onClose,handleCategoryChange, handleEditChange,dropdownOpen,toggle,categories}) => {
   

    // visible 이 아닐경우엔 아무것도 보여주지 않는다
    if(!visible) return null;
    
    return (
        <div>
            <Dimmed onClick={onClose}/>
            <Viewer>
                <InputSet title={title} body={body} code={code} onChange={onChange} onEditChange={handleEditChange}/>
                <div style={{display:'flex-inline'}}>
                    
                    <DropdownList categories={categories} 
                                  handleCategoryChange={handleCategoryChange} 
                                  dropdownOpen={dropdownOpen} 
                                  toggle={toggle}
                                  categoryName={categoryName}
                                  />

                    <div style={{display:'flex',float:'right',padding:'1rem 0.5rem 1rem 0.5rem' }}>
                        <Button onClick={onDelete}>
                            <IoIosTrash/>
                        </Button>
                        <SaveButton onClick={onUpdate} />
                        <Button onClick={onClose}>
                            <IoMdClose/>
                        </Button>
                    </div>
                </div>

            </Viewer>
        </div>
    );
};

MemoViewer.propTypes = {
    visible: PropTypes.bool,
    title: PropTypes.string,
    body: PropTypes.string,
    code: PropTypes.string,
    onChange: PropTypes.func,
    onUpdate: PropTypes.func,
    onDelete: PropTypes.func,
    handleEditChange: PropTypes.func
}

export default MemoViewer;