import React from 'react'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useContext } from 'react'
import { ContextData } from '../../contextApi/ContextApi';
import styled from 'styled-components'
import { useRouter } from 'next/router';
import Link from 'next/link';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useSnap } from '@mozeyinedu/hooks-lab'

export default function HelpBtn() {
    return (
        <Wrapper>
            <PersonOutlineIcon />
            <span>Account</span>

            <div className="content">
                <Link href="/help">My Account</Link>
                <Link href="/help">My Orders</Link>
            </div>
        </Wrapper>
    )
}


const Wrapper = styled.div`
    width: 100%;
    cursor: pointer;
    padding: 5px;
    border-radius: 4px;
    height: 30px;
    display: flex;
    align-items: center;
    position: relative;
    border: 1px solid ${({ theme }) => theme.border};

    .content {
        width: 100%;
        position: absolute;
        display: none;
        top: 29px;
        z-index: 100;
        right: 0;
        left: 0;
        background: ${({ theme }) => theme.card};
        border: 1px solid ${({ theme }) => theme.border};

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