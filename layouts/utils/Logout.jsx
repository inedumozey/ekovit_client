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

        <LogStyle>
            {
                access.isLoggedin ?
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div onClick={() => api.logout(router)} className='logout'>LOGOUT</div>
                    </div> : ""
            }
        </LogStyle>
    )
}


const LogStyle = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .logout {
        color: red;
        cursor: pointer;
        font-weight: bold;
        font-size: .75rem
    }
`