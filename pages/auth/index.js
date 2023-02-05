import React, { useEffect } from 'react'
import { useRouter } from "next/router";

export default function Signup() {
    const router = useRouter()
    useEffect(() => {
        router.push('/auth/signin')
    }, [])

    return <>Redirecting...</>
}