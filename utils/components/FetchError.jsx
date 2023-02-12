import React from 'react'

export default function FetchError({ style }) {
    return (
        <div style={{ color: 'red', textAlign: 'center', ...style }}>Error occured! Please refresh</div>
    )
}
