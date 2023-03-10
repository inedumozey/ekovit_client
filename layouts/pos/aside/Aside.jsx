import React, { useContext } from 'react'
import styled from 'styled-components'
import SideBarLayout from '../../utils/SideBarLayout'
import SideLink from '../../utils/SideLink'
import { ContextData } from '../../../contextApi/ContextApi'

export default function Aside({ headerHeight, toggleState, toggle, expandedAside, shrinkedAside, isExpanded, setExpanded }) {
    const { links } = useContext(ContextData)

    return (
        <AsideStyle
            headerHeight={headerHeight}
            expandedAside={expandedAside}
            shrinkedAside={shrinkedAside}
            isExpanded={isExpanded}
        >
            <div onClick={() => setExpanded(!isExpanded)} className="handle"></div>
            <SideBarLayout isExpanded={isExpanded} toggleState={toggleState} toggle={toggle}>
                <SideLink toggleState={toggleState} isExpanded={isExpanded} links={links} />
            </SideBarLayout>
        </AsideStyle>
    )
}


const AsideStyle = styled.div`
    position: fixed;
    top: ${({ headerHeight }) => headerHeight};
    transition: ${({ theme }) => theme.transition};
    width: ${({ shrinkedAside }) => shrinkedAside};
    width: ${({ isExpanded, expandedAside, shrinkedAside }) => isExpanded ? expandedAside : shrinkedAside};
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 0 5px rgb(18 23 39 / 50%);
    left: 0;
    z-index: 2;
    height: ${({ headerHeight }) => `calc(100vh - ${headerHeight})`};

    background: ${({ theme }) => theme.bg_image_aside};
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;

    @media (max-width: ${({ theme }) => theme.md_screen}){
        width: ${({ isExpanded, expandedAside, shrinkedAside }) => isExpanded ? expandedAside : shrinkedAside};
        left: ${({ isExpanded }) => isExpanded ? `0` : '-100%'};
    }

    .handle{
        width: 5px;
        height: 100%;
        position: absolute;
        top:0;
        bottom: 0;
        box-shadow:  -3px 0px 3px 0px rgb(0 0 0 / 42%);
        right: 0;

        &:hover {
            cursor: e-resize
        }
    }
`