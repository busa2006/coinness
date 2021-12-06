import styled from 'styled-components';
import oc from 'open-color';
import React from 'react';
import PropTypes from 'prop-types';
import { IoIosSave} from 'react-icons/io';
const Wrapper = styled.div`
    text-align: right;
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

const SaveButton = ({onClick}) => (
    <Wrapper>   
        <Button onClick={onClick}>
            <IoIosSave/>
        </Button>
    </Wrapper>
);

SaveButton.propTypes = {
    onClick: PropTypes.func
}

export default SaveButton;