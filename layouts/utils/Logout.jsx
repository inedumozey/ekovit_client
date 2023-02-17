import { useContext } from 'react'
import { ContextData } from '../../contextApi/ContextApi';
import styled from 'styled-components'
import { useRouter } from 'next/router';
import apiClass from '../../utils/data/api';
const api = new apiClass()

export default function Logout({ toggleState }) {

    const router = useRouter();
    const { access } = useContext(ContextData)

    return (

        <div>
            {
                access.isLoggedin ?
                    <div onClick={() => api.logout(router)} style={{ color: 'red', cursor: 'pointer' }}>LOGOUT</div> : ""
            }
        </div>
    )
}

