import { useContext, useEffect, useState } from 'react'
import { ContextData } from '../../contextApi/ContextApi';
import styled from 'styled-components'
import { useRouter } from 'next/router';
import Link from 'next/link';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LightDarkBtn from '../../utils/components/LightDarkBtn';
import { useSnap } from '@mozeyinedu/hooks-lab'

export default function Log({ toggleState, toggle }) {

    const { snap } = useSnap(.5)
    const router = useRouter();
    const { access } = useContext(ContextData)

    return (

        <LogStyle className="user">
            {
                access.isLoggedin ?
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div onClick={() => api.logout(router)} className='logout'>Logout</div>
                        <Link href='/profile' {...snap()} className='profile'>
                            <PersonOutlineIcon
                                style={{}}
                                className='icon' />
                        </Link>
                    </div> :
                    <Link href='/auth' className='login'>Login</Link>
            }
            <LightDarkBtn toggleState={toggleState} toggle={toggle} />
        </LogStyle>
    )
}


const LogStyle = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: .9rem;

    .logout {
        color: red;
        cursor: pointer;
    }
    .login {
        color: ${({ theme }) => theme.title};
        padding: 10px 5px;
        cursor: pointer;
    }

    .profile {
        padding: 10px;
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
`