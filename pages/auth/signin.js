
import React, { useEffect } from 'react'
import Cookies from 'js-cookie';
import Signin_ from '../../components/auth/Signin'
import { useRouter } from "next/router";

export default function Signin() {
    const router = useRouter()
    useEffect(() => {
        if (Cookies.get('refreshtoken')) {
            router.push('/')
        }
    }, [])
    return <Signin_ />
}
