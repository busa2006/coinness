import React, {Component} from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import PropTypes from 'prop-types';
import { media } from 'lib/style-utils';
import ImmutablePropTypes from 'react-immutable-proptypes';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";

import {AiOutlineLike} from 'react-icons/ai';
// 화면 크기에 따라 일정 비율로 가로 사이즈를 설정합니다
const Sizer = styled.div`
    display: inline-block;
    width: 100%;
    padding: 0.5rem;
`;

// 정사각형을 만들어줍니다. (padding-top 은 값을 % 로 설정하였을 때 부모 엘리먼트의 width 의 비율로 적용됩니다.)
const Square = styled.div`
    padding-top: 100px;
    position: relative;
    background: white;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);

    &:hover {
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    }
`;

// 실제 내용이 들어가는 부분입니다.
const Contents = styled.div`
    position: absolute;
    top: 1rem;
    left: 1rem;
    bottom: 1rem;
    right: 1rem;
    /* 텍스트가 길어지면 새 줄 생성; 박스 밖의 것은 숨김 */
    white-space: pre-wrap;
    overflow: hidden;
`;

const Title = styled.div`
    text-align: left;
    font-size: 1.25rem;
    font-weight: 500;
    margin-bottom: 1rem;
`;

const Body = styled.div`
    font-size: 1.1rem;
    font-weight: 300;
    color: ${oc.gray[7]};
`;

const Parent = styled.div`
    display: flex;
    margin-top: 2em;
    margin-bottom: 1em;
`;



const Child004  = styled.div`
    flex: 0.4;
`;

const Child001  = styled.div`
    flex: 0.1;
`;

const Child095  = styled.div`
    flex: 9.5;
`;

const Child030  = styled.div`
    flex: 3;
`;

const Child070  = styled.div`
    flex-direction:row-revers;
`;


const ButtonLabel  = styled.span`
    font-size: 14px; 
    margin-right:30px;
    color:#8D9FAE;
`;


const Img  = styled.img`
    padding: 5px;
`;

class Memo extends Component {
    static propTypes = {
        memo: ImmutablePropTypes.mapContains({
            id: PropTypes.number,
            title: PropTypes.string,
            body: PropTypes.string
        }),
        onOpen: PropTypes.func
    }

    handleClick = () => {
        const { memo, onOpen } = this.props;
        onOpen(memo);
        document.body.style.overflow = "hidden";
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.memo !== this.props.memo;
    }

    render() {
        const { title, body, nowTime } = this.props.memo.toJS();
        const { handleClick } = this;

        return (
            <Parent  onClick={handleClick} >
                <Child004>
                    <span style={{backgroundColor:'#F3F4F8', color:'#666677', fontSize: '12px'}}>{nowTime}</span>
                </Child004>
                <Child001></Child001>
                <Child095>
                    <div style={{ fontSize: '16px',fontWeight: 'bold'}}>{title}</div>
                    <div style={{ fontSize: '14px',marginTop: '0.5em',marginBottom:'0.2em'}}>{body}</div>
                    <Parent>
                        <Child030>
                            <ButtonLabel><Img src="https://coinness.live/static/media/bull.76374027.svg"/>Bull</ButtonLabel>
                            <ButtonLabel><Img src="https://coinness.live/static/media/bear.3311c6da.svg"/>Bear</ButtonLabel>
                        </Child030>
                        <Child070>
                            <ButtonLabel><Img src="https://coinness.live/static/media/share.cc0642ef.svg"/>공유하기</ButtonLabel>
                        </Child070>
                    </Parent>
                </Child095>
            </Parent>
            // <Sizer>
            //     <Square onClick={handleClick} >
            //         <Contents>
            //             { title && <Title>{title} </Title>}
            //             <Body>{body}</Body>
            //         </Contents>
            //     </Square>
            // </Sizer>
        )
    }
}

export default Memo;