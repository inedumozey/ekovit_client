import React, { useContext } from 'react'
import styled from 'styled-components'
import { ContextData } from '../../contextApi/ContextApi'
const currentYear = 2021

export default function Copyright({ name }) {
    const { contact } = useContext(ContextData)
    return (
        <Wrapper>
            &copy; {(new Date()).getFullYear() > currentYear ? `${currentYear} - ${(new Date()).getFullYear()}` : (new Date()).getFullYear()} &nbsp; <span style={{ color: 'var(--gold)' }}>{name} </span>.  &nbsp; All Right Reserved
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 ${({ theme }) => theme.lg_padding};
    @media (max-width: ${({ theme }) => theme.md_screen}){
        padding: 0 ${({ theme }) => theme.md_padding};
    }
    @media (max-width: ${({ theme }) => theme.sm_screen}){
        padding: 0 ${({ theme }) => theme.sm_padding};
    }
`