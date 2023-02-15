import Header from './header/Header';
import Aside from './aside/Aside';
import { mobileAndTabletCheck } from '../../utils/mobileAndTabletCheck';
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import MobileLinks from '../utils/MobileLinks';

const headerHeight = '93px'
const expandedAside = '200px'
const shrinkedAside = '50px'
const bottomLinkHeight = '50px'

export default function User({ children, toggleState, toggle }) {
    const [isExpanded, setExpanded] = useState(false)
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(mobileAndTabletCheck(window))
    }, [])

    const minimize = () => {
        if (isExpanded && isMobile) {
            setExpanded(false)
        }
    }

    return (
        isMobile ?
            <Wrapper>

                <div onClick={minimize}>
                    <Header
                        headerHeight={headerHeight}
                        isExpanded={isExpanded}
                        setExpanded={setExpanded}
                        toggleState={toggleState}
                        toggle={toggle}
                    />
                </div>

                <Aside
                    expandedAside={expandedAside}
                    shrinkedAside={shrinkedAside}
                    headerHeight={headerHeight}
                    isExpanded={isExpanded}
                    toggleState={toggleState}
                    toggle={toggle}
                    setExpanded={setExpanded}
                />

                <MainStyle
                    shrinkedAside={shrinkedAside}
                    headerHeight={headerHeight}
                    isExpanded={isExpanded}
                    onClick={minimize}
                >
                    <MainContent headerHeight={headerHeight}>
                        {children}
                    </MainContent>
                    <FooterStyle headerHeight={headerHeight}>Footer</FooterStyle>
                </MainStyle>
            </Wrapper> :
            <MobileWrapper>
                <MobileHeader>header</MobileHeader>
                <MobileMain> {children} </MobileMain>
                <MobileLinks toggle={toggle} toggleState={toggleState} bottomLinkHeight={bottomLinkHeight} />
            </MobileWrapper>
    )
}

const Wrapper = styled.div`
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

const MobileWrapper = styled.div`
    
`
const MobileHeader = styled.div`
    height: 93px;
`
const MobileMain = styled.div`
    min-height: calc(100vh - 93px);
    padding-bottom: 70px;
`
