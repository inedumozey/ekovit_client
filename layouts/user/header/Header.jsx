import React, { useContext } from 'react'
import styled from 'styled-components';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';


export default function Header({ isExpanded, setExpanded, headerHeight }) {
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
            Header
        </HeaderStyle>
    )
}

const HeaderStyle = styled.div`
    width: 100%;
    height: ${({ headerHeight }) => headerHeight};
    font-weight: 600;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    border-bottom: 4px solid ${({ theme }) => theme.title};
    text-align: center;
    box-shadow: 0 0 5px rgb(18 23 39 / 50%);
    z-index: 3;

    .toggle {
        width: 35px;
        height: 80%;
        box-shadow: 0 0 5px rgb(18 23 39 / 50%), -0 -0 5px rgb(18 23 39 / 50%);
        background: ${({ theme }) => theme.title};
        color: #fff;
        user-select: none;
        border-radius: 50%;
        font-size: .9rem;
        position: absolute;
        left: -20px;
        top: 50%;
        transform: translateY(-50%);
        justify-content: flex-end;
        align-items: center;
        cursor: pointer;
        
        .icon {
            color: #ccc;
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