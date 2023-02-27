import React from 'react';
import styled from 'styled-components'
import Link from 'next/link'
import Logo from '../../utils/components/MasterLogo';

export default function Auth({ children }) {
    return (
        <>
            <Header>
                <Link href="/" className='logo'>
                    <Logo />
                </Link>
            </Header>
            <Main>{children}</Main>
        </>
    )
}


const Header = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    height: 70px;

    padding: 10px ${({ theme }) => theme.lg_padding};
    @media (max-width: ${({ theme }) => theme.md_screen}){
        padding: 10px ${({ theme }) => theme.md_padding};
    }
    @media (max-width: ${({ theme }) => theme.sm_screen}){
        padding: 10px ${({ theme }) => theme.sm_padding};
    }

    .logo {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
    }
`
const Main = styled.div`
    width: 100%;
    min-height: calc(100vh - 50px);
    background: ${({ theme }) => theme.bg_image_auth};
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center;
`