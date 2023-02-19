import { useContext } from 'react'
import { ContextData } from '../../contextApi/ContextApi';
import styled from 'styled-components'
import Link from 'next/link';
import Image from 'next/image'

export default function Logo() {
    const { contact } = useContext(ContextData)

    return (
        <LogoStyle>
            <Link href="/" >
                <Image src={"/favicon.ico"} width="400" height="200" alt="" />
            </Link>
        </LogoStyle>

    )
}


const LogoStyle = styled.span`
    a {
        // color: ${({ theme }) => theme.title};
        text-decoration: none;
        width: 70px;
        display: block;
        height: 70px;
        // margin: 0 auto 20px auto;
        border: 1px solid ${({ theme }) => theme.border};
        border-radius: 50%;

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            border-radius: 50%;
        }
    }
`