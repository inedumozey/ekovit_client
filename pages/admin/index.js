import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Spinner from '../../utils/components/Spinner'

export default function Index() {
    const router = useRouter()

    useEffect(() => {
        router.push('/admin/inventory')
    }, [])

    return (
        <div style={{ padding: '20px' }}>
            <Spinner type="dots" />
        </div>
    )
}
