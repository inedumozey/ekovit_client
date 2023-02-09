import { useContext } from 'react'
import { ContextData } from '../../contextApi/ContextApi';
import styled from 'styled-components'
import Link from 'next/link';

export default function Logo() {
    const { contact } = useContext(ContextData)

    return (
        <LogoStyle>
            <Link href="/" >
                {/* <img src={'/favicon.ico'} alt="" /> */}
                <h2>{contact.name?.toUpperCase()}</h2>
            </Link>
        </LogoStyle>

    )
}


const LogoStyle = styled.div`
    a {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: ${({ theme }) => theme.title};
        text-decoration: none;
    }
`