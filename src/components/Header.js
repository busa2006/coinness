import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { transitions } from 'lib/style-utils';
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
    background: ${oc.indigo[6]};
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


const Header = ({header}) => (
    <Wrapper>
        {header}
    </Wrapper>
);

export default Header;