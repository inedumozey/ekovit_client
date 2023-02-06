import React, { useContext } from 'react'
import styled from 'styled-components';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import NavLinks from '../../utils/NavLinks';
import Log from '../../utils/Log';
import Logo from '../../utils/Logo';

export default function Header({ isExpanded, setExpanded, headerHeight, toggleState, toggle }) {
    return (
        <HeaderStyle isExpanded={isExpanded} headerHeight={headerHeight} >
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

            <div className="logo">
                <Logo />
            </div>

            <NavLinks toggleState={toggleState} />

            <Log toggleState={toggleState} toggle={toggle} />

        </HeaderStyle>
    )
}

const HeaderStyle = styled.div`
    width: 100%;
    height: ${({ headerHeight }) => headerHeight};
    font-weight: 600;
    position: fixed;
    background: inherit;
    position: fixed;
    display: flex;
    transition: 1s;
    justify-content: space-between;
    aligin-items: center;
    left: 0;
    top: 0;
    right: 0;
    text-align: center;
    box-shadow: -1px -1px 7px 4px rgb(0 0 0 / 82%);
    z-index: 1000;

    padding: 10px ${({ theme }) => theme.lg_padding};
    @media (max-width: ${({ theme }) => theme.md_screen}){
        padding: 10px ${({ theme }) => theme.md_padding};
    }
    @media (max-width: ${({ theme }) => theme.sm_screen}){
        padding: 10px ${({ theme }) => theme.sm_padding};
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
            color: ${({ theme }) => theme.title};
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