import React, { useEffect } from 'react'
import Cookies from 'js-cookie';
import { useRouter } from "next/router";
import Index_ from '../../components/admin';

export default function Index() {
    const router = useRouter()
    useEffect(() => {
        if (!Cookies.get('refreshtoken')) {
            router.push('/auth')
        }
        else if (Cookies.get('refreshtoken') && !Cookies.get('admintoken')) {
            router.push('/admin/login')
        }
    })
    return <Index_ />
}
