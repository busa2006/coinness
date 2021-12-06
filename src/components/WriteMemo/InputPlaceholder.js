import React from 'react';
import styled from 'styled-components';
import {IoMdAddCircleOutline} from 'react-icons/io';
const Wrapper = styled.div`
    font-weight: 300;
    font-size: 16px;
    text-align:center;
`;

const InputPlaceholder = () => (
    <Wrapper>
        <IoMdAddCircleOutline size={20}/>
    </Wrapper>
);

export default InputPlaceholder;
