import { useContext } from 'react'
import { ContextData } from '../../contextApi/ContextApi';
import styled from 'styled-components'
import { useRouter } from 'next/router';
import Link from 'next/link';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useSnap } from '@mozeyinedu/hooks-lab'

export default function UserLog({ toggleState, toggle }) {

    const { snap } = useSnap(.5)
    const router = useRouter();
    const { access, user } = useContext(ContextData)

    return (

        <LogStyle>
            {
                access.isLoggedin ?
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center'
                    }}>
                        <Link
                            href='/profile'
                            {...snap()}
                            style={{
                                color: router.pathname === '/profile' ? (toggleState ? 'var(--active-link-lighttheme)' : 'var(--active-link-darktheme)') : (toggleState ? 'var(--link-lighttheme)' : 'var(--link-darktheme)'),
                                textDecoration: 'none'
                            }}
                            className='profile'>
                            <PersonOutlineIcon className='profile-icon' />

                            <span className='profile-name el'>{user.profile ? (user.profile.username ? user.profile.username : user.profile.email) : ('')}</span>
                        </Link>

                    </div> : <Link href='/auth' className='login'>LOGIN</Link>
            }
        </LogStyle>
    )
}


const LogStyle = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .login {
        color: ${({ theme, }) => theme.title};
        padding: 10px 5px;
        cursor: pointer;
        text-decoration: none;
        font-size: .75rem
    }

    .profile {
        padding: 0px 5px;
        cursor: pointer;
        display: flex;
        aligh-items: center;
        border-radius: 15px;
        border: 3px solid ${({ theme }) => theme.border};
        

        &:hover {
            border: 3px solid ${({ theme }) => theme.title};;
        }

        .profile-icon{
            height: 100%;
            padding: 10px 0;
        }

        .profile-name{
            padding: 13px 0;
            max-width: 60px;
            height: 100%;
        }
    }

    
    @media (max-width: 800px){
        .themeBtn {
            display: none
        }
    }
`