import React from 'react';
import styled from 'styled-components'

export default function Auth({ children }) {
    return (
        <>
            <Header>Header</Header>
            <Main>{children}</Main>
        </>
    )
}


const Header = styled.div`
    width: 100%;
    height: 50px;
`
const Main = styled.div`
    width: 100%;
    min-height: calc(100vh - 50px);
    background: ${({ theme }) => theme.bg_image_auth};
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center;
`