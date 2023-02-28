import React from 'react'
import { useContext } from 'react'
import { ContextData } from '../../contextApi/ContextApi';
import styled from 'styled-components'
import { useRouter } from 'next/router';
import Link from 'next/link';
import CategoryIcon from '@mui/icons-material/Category';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Logout from './Logout';

export default function HelpBtn() {
    const router = useRouter()
    const { access } = useContext(ContextData)

    return (
        <Wrapper>
            {
                access.isLoggedin ?
                    <>
                        <PersonOutlineIcon
                            style={{ color: router.pathname === '/my-orders' || router.pathname === '/profile' ? '#c30' : 'inherit' }}
                        />
                        <span
                            style={{ color: router.pathname === '/my-orders' || router.pathname === '/profile' ? '#c30' : 'inherit' }}
                        >Account</span>
                        <div className="content">
                            <Link
                                title="My Account"
                                href="/profile"
                                style={{ color: router.pathname === '/profile' ? '#c30' : 'inherit' }}
                            >
                                <PersonOutlineIcon style={{ marginRight: '2px' }} /> My Account
                            </Link>
                            <Link
                                title="My Ordere"
                                href="/my-orders"
                                style={{ color: router.pathname === '/my-orders' ? '#c30' : 'inherit' }}
                            >
                                <CategoryIcon style={{ marginRight: '2px' }} /> My Orders
                            </Link>

                            <div className='chat logout'><Logout /></div>
                        </div>
                    </> :
                    <div className='login'>
                        <Link className="auth" href='/auth'>LOGIN</Link>
                    </div>
            }

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
    justify-content: center;
    position: relative;
    border: 1px solid ${({ theme }) => theme.border};

    .auth {
        text-decoration: none;
        color: ${({ theme }) => theme.title};
    }

    .content {
        width: 100%;
        position: absolute;
        display: none;
        flex-direction: column;
        align-items: center;
        top: 29px;
        z-index: 100;
        right: 0;
        left: 0;
        height: 150px;
        background: ${({ theme }) => theme.card};
        border: 1px solid ${({ theme }) => theme.border};

        a {
            text-decoration: none;
            width: 100%;
            display: flex;
            padding: 10px 5px;

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

        .logout {
            background: ${({ theme }) => theme.title};
            position: absolute;
            bottom: 0;
            width: 90%;
            margin: 10px 0;
            left: 50%;
            transform: translateX(-50%);
            color: #fff;
            background: #c30;
            padding: 0;

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