import styled from 'styled-components'
import React, { useState, useEffect } from 'react';
import Header from './header/Header';
import Aside from './aside/Aside';

const headerHeight = '63px'
const expandedAside = '200px'
const shrinkedAside = '40px'

export default function User({ children }) {
    const [isExpanded, setExpanded] = useState(false)
    return (
        <Wrapper>
            <Header
                headerHeight={headerHeight}
                isExpanded={isExpanded}
                setExpanded={setExpanded}
            />


            <Aside
                expandedAside={expandedAside}
                shrinkedAside={shrinkedAside}
                headerHeight={headerHeight}
                isExpanded={isExpanded}
                setExpanded={setExpanded}
            />

            <MainStyle
                shrinkedAside={shrinkedAside}
                headerHeight={headerHeight}
                isExpanded={isExpanded}
            >
                <MainContent headerHeight={headerHeight}>
                    {"children"}
                </MainContent>
                <FooterStyle headerHeight={headerHeight}>Footer</FooterStyle>
            </MainStyle>
        </Wrapper>
    )
}


const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
`
const MainStyle = styled.div`;
    position: absolute;
    top: ${({ headerHeight }) => `calc(${headerHeight} - 2px)`};
    right: 400px;
    transition: ${({ theme }) => theme.transition};
    width:  ${({ shrinkedAside, isExpanded }) => isExpanded ? '100vw' : `calc(100vw - ${shrinkedAside})`};
    align-items: center;
    left: ${({ isExpanded }) => isExpanded ? `calc(${expandedAside})` : `calc(${shrinkedAside})`};
    min-height: ${({ headerHeight }) => `calc(100vh - ${headerHeight})`};

    @media (max-width: ${({ theme }) => theme.md_screen}){
        left: ${({ isExpanded }) => isExpanded ? `calc(${expandedAside})` : `0`};
        width: 100vw;
    }
`

const MainContent = styled.div`
    width: 100%;
    min-height: ${({ headerHeight }) => `calc(100vh - ${headerHeight} - ${headerHeight})`};
`
const FooterStyle = styled.div`
    width: 100%;
    height: ${({ headerHeight }) => headerHeight};
`