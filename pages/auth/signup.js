import Signup_ from '../../components/auth/Signup'
import React, { useEffect } from 'react'
import Cookies from 'js-cookie';
import { useRouter } from "next/router";

export default function Signup() {
    const router = useRouter()
    useEffect(() => {
        if (Cookies.get('refreshtoken')) {
            router.push('/pos')
        }
    }, [])
    return <Signup_ />
}
