import React, { useEffect } from 'react'
import Cookies from 'js-cookie';
import { useRouter } from "next/router";
import Login_ from '../../components/admin/Login';

export default function Login() {
    const router = useRouter()
    useEffect(() => {
        if (Cookies.get('admintoken')) {
            router.push('/admin')
        }
    })
    return <Login_ />
}
