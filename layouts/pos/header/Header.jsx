import React, { useContext } from 'react'
import styled from 'styled-components';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import NavLinks from '../../utils/NavLinks';
import UserLog from '../../utils/UserLog';
import { useRouter } from 'next/router'
import Logo from '../../../utils/components/MasterLogo';
import LightDarkBtn from '../../../utils/components/LightDarkBtn';
import ResolveClass from '../../../utils/resolveClass';
import Link from 'next/link'
import Search from '../../../utils/components/Search';
import Logout from '../../utils/Logout';
const resolve = new ResolveClass()

export default function Header({ isExpanded, setExpanded, headerHeight, toggleState, toggle }) {
    const router = useRouter()

    return (
        <HeaderStyle isExpanded={isExpanded} headerHeight={headerHeight} toggleState={toggleState} >
            <div className="top">
                <div
                    onClick={() => setExpanded(!isExpanded)}
                    className="toggle lg-screen">
                    <span className='shrink'>
                        <ArrowLeftIcon className='icon' />
                    </span>
                    <span className='expand'>
                        <ArrowRightIcon className='icon' />
                    </span>
                </div>

                <div
                    onClick={() => setExpanded(!isExpanded)}
                    className="toggle sm-screen">
                    <span className='shrink'>
                        <ArrowRightIcon className='icon' />
                    </span>
                    <span className='expand'>
                        <ArrowLeftIcon className='icon' />
                    </span>
                </div>

                <Link href="/" className='logo'>
                    <Logo />
                </Link>

                <NavLinks toggleState={toggleState} />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ width: '120px' }}>
                        <UserLog toggleState={toggleState} toggle={toggle} />
                    </div>
                    <div className="theme-btn">
                        <LightDarkBtn toggleState={toggleState} toggle={toggle} />
                    </div>
                </div>
            </div>
            <div className="bottom">
                <div className='small-screen'>
                    <LightDarkBtn toggleState={toggleState} toggle={toggle} />
                </div>
                <div className="search-wrapper"> <Search /> </div>
            </div>
        </HeaderStyle>
    )
}

const HeaderStyle = styled.div`
    width: 100%;
    height: ${({ headerHeight }) => headerHeight};
    font-weight: 600;
    position: fixed;
    background:  ${({ theme }) => theme.bg};;
    position: fixed;
    transition: 1s;
    left: 0;
    top: 0;
    right: 0;
    box-shadow: -1px -1px 7px 4px rgb(0 0 0 / 82%);
    z-index: 1000;
    user-select: none;

    .logo {
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
    }

    .top {
        height: 60px;
        display: flex;
        justify-content: space-between;
        aligin-items: center;
        text-decoration: none;


        padding: 10px ${({ theme }) => theme.lg_padding};
        @media (max-width: ${({ theme }) => theme.md_screen}){
            padding: 10px ${({ theme }) => theme.md_padding};
        }
        @media (max-width: ${({ theme }) => theme.sm_screen}){
            padding: 10px ${({ theme }) => theme.sm_padding};
        }

    }
    .bottom {
        height: calc(100% - 60px);
        padding: 0px 10px;
        font-weight: bold;
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;

        padding: 5px ${({ theme }) => theme.lg_padding};
        @media (max-width: ${({ theme }) => theme.md_screen}){
            padding: 5px ${({ theme }) => theme.md_padding};
        }
        @media (max-width: ${({ theme }) => theme.sm_screen}){
            padding: 5px ${({ theme }) => theme.sm_padding};
        };

        .search-wrapper {
            position: relative;
            height: 100%;
            width: 80%
        }

        @media (min-width: ${({ theme }) => theme.sm_screen}){
            justify-content: flex-end;
        };
    }

    .small-screen {
        padding: 0 10px;
        display: none;

        @media (max-width: ${({ theme }) => theme.sm_screen}){
            display: block
        };
    }

    .theme-btn {
        margin-left: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        @media (max-width: ${({ theme }) => theme.sm_screen}){
            display: none
        };
    }

    @media (max-width: 800px){
        .logo {
            margin: auto
        }
    }

    .toggle {
        width: 10px;
        height: 10px;
        user-select: none;
        border-radius: 50%;
        font-size: .9rem;
        position: absolute;
        left: 5px;
        top: 50%;
        transform: translateY(-50%);
        justify-content: center;
        align-items: center;
        cursor: pointer;
        
        .icon {
            color: ${({ toggleState }) => toggleState ? 'var(--link-lighttheme)' : 'var(--active-link-darktheme)'};
            font-size: 2rem;
        }

        .expand {
            display: ${({ isExpanded }) => isExpanded ? 'none' : 'block'};
        }

        .shrink {
            display: ${({ isExpanded }) => isExpanded ? 'block' : 'none'};
        }

        @media (max-width: ${({ theme }) => theme.md_screen}){

            .expand {
                display: ${({ isExpanded }) => isExpanded ? 'block' : 'none'};
            }

            .shrink {
                display: ${({ isExpanded }) => isExpanded ? 'none' : 'block'};
            }
        }

    }

    .sm-screen {
        display: none;
    }
    .lg-screen {
        display: flex;
    }
    @media (max-width: ${({ theme }) => theme.md_screen}){
        .lg-screen {
            display: none;
        }

        .sm-screen {
            display: flex;
        }
    }
`