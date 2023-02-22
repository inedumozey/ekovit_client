import { useContext } from 'react'
import { ContextData } from '../../contextApi/ContextApi';
import styled from 'styled-components'
import { useRouter } from 'next/router';
import Link from 'next/link';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useSnap } from '@mozeyinedu/hooks-lab'
import Spinner from '../../utils/components/Spinner';

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

                            <span className='profile-name el'>
                                {
                                    user.fetchingProfile ? <Spinner type="dots" /> :
                                        user.profile ? (user.profile.username ? user.profile.username : user.profile.email) : ('')
                                }

                            </span>
                        </Link>

                    </div> :
                    <div className='login'>
                        <Link href='/auth'>LOGIN</Link>
                    </div>
            }
        </LogStyle>
    )
}


const LogStyle = styled.div`
    height: 40px;
    width: 100px;

    .login {
        cursor: pointer;
        font-size: .75rem
        display: flex;

        a {
            color: ${({ theme, }) => theme.title};
            text-decoration: none;
            display: flex;
            width: 100%;
            height: 40px;
            justify-content: center;
            align-items: center;
        }
    }

    .profile {
        display: flex;
        width: 100%;
        height: 40px;
        border-radius: 10px;
        background: ${({ theme }) => theme.sec};
        border: 3px solid ${({ theme }) => theme.border};
        align-items: center;

        .profile-name{
            padding: 13px 0;
        }

        &:hover {
            border: 3px solid ${({ theme }) => theme.title};;
        }
    }

    @media (max-width: 800px){
        .themeBtn {
            display: none
        }
    }
`