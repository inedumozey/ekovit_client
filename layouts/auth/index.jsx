import React from 'react';
import styled from 'styled-components'

export default function Auth({ children }) {
    return (
        <>
            <Header>Header</Header>
            <Main>{children}</Main>
            <Footer>Footer</Footer>
        </>
    )
}


const Header = styled.div`
    width: 100%;
    height: 50px;
`
const Main = styled.div`
    width: 100%;
    min-height: calc(100vh - 50px - 50px);
`
const Footer = styled.div`
    width: 100%;
    min-height: 50px;
`