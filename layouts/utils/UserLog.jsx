import { useContext } from 'react'
import { ContextData } from '../../contextApi/ContextApi';
import styled from 'styled-components'
import { useRouter } from 'next/router';
import Link from 'next/link';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useSnap } from '@mozeyinedu/hooks-lab'
import apiClass from '../../utils/data/api';
const api = new apiClass()

export default function UserLog({ toggleState, toggle }) {

    const { snap } = useSnap(.5)
    const router = useRouter();
    const { access } = useContext(ContextData)

    return (

        <LogStyle>
            {
                access.isLoggedin ?
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Link href='/profile' {...snap()} className='profile'>
                            <PersonOutlineIcon
                                style={{ color: router.pathname === '/profile' ? (toggleState ? 'var(--active-link-lighttheme)' : 'var(--active-link-darktheme)') : (toggleState ? 'var(--link-lighttheme)' : 'var(--link-darktheme)') }}
                                className='icon' />
                        </Link>
                        <div onClick={() => api.logout(router)} className='logout'>LOGOUT</div>
                    </div> :
                    <Link href='/auth' className='login'>LOGIN</Link>
            }
        </LogStyle>
    )
}


const LogStyle = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: .9rem;

    .logout {
        color: red;
        cursor: pointer;
        font-weight: bold;
    }
    .login {
        color: ${({ theme, }) => theme.title};
        padding: 10px 5px;
        cursor: pointer;
        text-decoration: none;
    }

    .profile {
        padding: 10px;
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }

    
    @media (max-width: 800px){
        .themeBtn {
            display: none
        }
    }
`