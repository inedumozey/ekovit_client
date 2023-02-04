import React, { useEffect } from 'react'
import Cookies from 'js-cookie';
import { useRouter } from "next/router";

export default function Signup() {
    const router = useRouter()
    useEffect(() => {
        router.push('/auth')
    }, [])
    return <>Redirecting...</>
}
