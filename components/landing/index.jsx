import React from 'react'

export default function Landing() {
    return (
        <div>
            index
            <br />
            {process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}
            <br />
            {process.env.NEXT_PUBLIC_BACKEND_BASE_URL}
        </div>
    )
}
