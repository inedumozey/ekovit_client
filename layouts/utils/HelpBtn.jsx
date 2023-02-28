import React from 'react'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import styled from 'styled-components';
import Link from 'next/link'

export default function HelpBtn() {
    return (
        <Wrapper>
            <HelpOutlineIcon />
            <span>Help</span>
            <KeyboardArrowDownIcon />

            <div className="content">
                <Link href="/help">Help Center</Link>
                <Link href="/help">Order Cancellation</Link>
                <div className='chat'>LIVE CHAT</div>

            </div>
        </Wrapper>
    )
}


const Wrapper = styled.div`
    display: flex;
    justify-content: space-around;
    aligin-items: center;
    cursor: pointer;
    padding: 5px;
    border-radius: 4px;
    height: 30px;
    position: relative;
    border: 1px solid ${({ theme }) => theme.border};

    .content {
        width: 130px;
        position: absolute;
        display: none;
        top: 29px;
        z-index: 100;
        right: 0;
        min-height: 150px;
        background: ${({ theme }) => theme.card};

        a {
            text-decoration: none;
            display: block;
            padding: 10px;
            color: inherit;

            &:hover {
                background: #aaa;
                color: #fff;
            }
        }

        .chat {
            padding: 10px;
            color: #fff;
            background: ${({ theme }) => theme.title};
            position: absolute;
            bottom: 0;
            width: 90%;
            margin: 10px 0;
            left: 50%;
            transform: translateX(-50%);

            &:hover {
               opacity: .7;
            }
        }
    }

    &:hover {
        .content {
            display: block;
        }
    }

    span {
        margin: 0 3px;
    }
    @media (max-width: ${({ theme }) => theme.sm_screen}){
        span {
            display: none;
        }
    };
`