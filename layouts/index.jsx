import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Auth from './auth'
import Pos from './pos'
import Landing from './landing'
import Cookies from 'js-cookie';
import { ScrollBar } from '../styles/globalStyles'


export default function Layout({ children, toggleState, toggle }) {
    const router = useRouter();

    useEffect(() => {
        if (router.pathname.includes('/pos')) {
            // xxxxx3 = agent
            if (!Cookies.get('xxxxx3')) {
                router.push('/')
            }
        }
        else if (router.pathname.includes('/admin')) {
            // xxxxx2 = admin 
            if (!Cookies.get('xxxxx2')) {
                router.push('/')
            }
        }

        // document.body.style.overflowX = 'hidden'
    })

    return (
        (function () {
            if (router.pathname.includes('/pos') || router.pathname.includes('/admin')) {
                return <Pos children={children} toggleState={toggleState} toggle={toggle} />
            }
            else if (router.pathname.includes('/auth')) {
                return <Auth children={children} toggleState={toggleState} toggle={toggle} />
            }
            else {
                return <Landing children={children} toggleState={toggleState} toggle={toggle} />
            }
        }())
    )


}