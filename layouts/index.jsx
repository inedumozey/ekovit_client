import React, { } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Auth from './auth'
import Pos from './user'
import Landing from './landing'



export default function Layout({ children, toggleState, toggle }) {
    const router = useRouter()

    return (
        <Body>
            {
                (function () {
                    if (router.pathname.includes('/pos')) {
                        return <Pos children={children} toggleState={toggleState} toggle={toggle} />
                    }
                    else if (router.pathname.includes('/auth')) {
                        return <Auth children={children} toggleState={toggleState} toggle={toggle} />
                    }
                    else {
                        return <Landing children={children} toggleState={toggleState} toggle={toggle} />
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