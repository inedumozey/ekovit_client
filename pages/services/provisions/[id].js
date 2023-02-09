import React from 'react'
import { useRouter } from 'next/router'

export default function Id() {
    const router = useRouter()
    return (
        <div>Provision Id: {router.query.id}</div>
    )
}
