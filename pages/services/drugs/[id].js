import React from 'react'
import { useRouter } from 'next/router'

export default function Id() {
    const router = useRouter()
    return (
        <div>Drug Id: {router.query.id}</div>
    )
}
