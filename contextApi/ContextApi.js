import { useState, createContext, useEffect } from 'react';
import Layout from '../layouts';
import Cookies from 'js-cookie';
import { useRouter } from "next/router";

const ContextData = createContext()

function ContextApi({ children }) {
    const router = useRouter()

    // redirect
    useEffect(() => {

        if (router.pathname.includes('/pos')) {
            if (!Cookies.get('refreshtoken')) {
                router.push('/auth')
            }
        }
        else if (router.pathname == '/auth' || router.pathname == '/auth/signup') {
            if (Cookies.get('refreshtoken')) {
                router.push('/pos')
            }
        }
        // else if (router.pathname.includes('/admin')) {
        //     if (!Cookies.get('admintoken')) {
        //         router.push('/pos')
        //     }
        // }

    }, [])



    const state = {
        // ...staticData
    }

    return (
        <ContextData.Provider value={state}>
            <Layout>
                {children}
            </Layout>
        </ContextData.Provider>
    )
}

export { ContextApi, ContextData }