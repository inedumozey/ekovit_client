import React, { } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Auth from './auth'
import Pos from './user'
import Landing from './landing'



export default function Layout({ children }) {
    const router = useRouter()

    return (
        <Body>
            {
                (function () {
                    if (router.pathname.includes('/pos')) {
                        return <Pos children={children} />
                    }
                    else if (router.pathname.includes('/auth')) {
                        return <Auth children={children} />
                    }
                    else {
                        return <Landing children={children} />
                    }
                }())
            }

        </Body>
    )


}


const Body = styled.div`
    background: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.pri};
`