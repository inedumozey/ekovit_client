import { useContext, useEffect, useState } from 'react'
import { ContextData } from '../../contextApi/ContextApi';
import styled from 'styled-components'
import Modal from '../../utils/components/Modal';
import { useRouter } from 'next/router';
import apiClass from '../../utils/data/api';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LightDarkBtn from '../../utils/components/LightDarkBtn';
import { useSnap } from '@mozeyinedu/hooks-lab'


const api = new apiClass()

export default function Landing({ children, toggleState, toggle }) {
    const { snap } = useSnap(.5)
    const router = useRouter()

    const { access } = useContext(ContextData)
    const [openSideDrawal, setOpenSideDeawal] = useState(false)


    return (
        <Wrapper>
            <Header>
                <div className='toggle' onClick={() => setOpenSideDeawal(!openSideDrawal)}><MenuIcon className='icon' /></div>
                <Link className='logo' href="/" >
                    {/* <img src={'/favicon.ico'} alt="" /> */}
                    <h1>EKOVIT</h1>
                </Link>
                <div className="user">
                    {
                        access.isLoggedin ?
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <div onClick={() => api.logout(router)} className='logout'>Logout</div>
                                <Link href='/profile' {...snap()} className='profile'><PersonOutlineIcon className='icon' /></Link>
                            </div> :
                            <Link href='/auth' className='login'>Login</Link>
                    }
                    <LightDarkBtn toggleState={toggleState} toggle={toggle} />
                </div>

            </Header>
            <Main>{children}</Main>
            <Footer></Footer>
            <Modal
                drawal={true}
                show={openSideDrawal}
                setShow={setOpenSideDeawal}
            >
                <SideBar>side bar</SideBar>
            </Modal>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100vw;
    min-height: 100vh;
    position: relative;
    overflow-x: hidden;

    img {
        width: 100%;
        height: 100%;
    }
`

const SideBar = styled.div`
    width: 40vw;
    height: 100vh;
    background: ${({ theme }) => theme.bg};
    box-shadow: 1px 1px 7px 4px rgb(0 0 0 / 82%);
`

const Header = styled.div`
    width: 100%;
    height: 63px;
    font-weight: 600;
    position: fixed;
    display: flex;
    transition: 1s;
    justify-content: space-between;
    aligin-items: center;
    z-index: 1000;
    background: ${({ theme }) => theme.bg};
    left: 0;
    top: 0;
    right: 0;
    box-shadow: -1px -1px 7px 4px rgb(0 0 0 / 82%);

    padding: 10px ${({ theme }) => theme.lg_padding};
    @media (max-width: ${({ theme }) => theme.md_screen}){
        padding: 10px ${({ theme }) => theme.md_padding};
    }
    @media (max-width: ${({ theme }) => theme.sm_screen}){
        padding: 10px ${({ theme }) => theme.sm_padding};
    }
    .toggle {
        height: 100%;
        min-width: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        @media (min-width: 800px){
            display: none
        }
    }

    .icon {
        color: ${({ theme }) => theme.title};
    }

    .logo {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        font-family: cursive;
        color: ${({ theme }) => theme.title};
        text-decoration: none;
    }

    .user {
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
    }
`
const Main = styled.div`
    width: 100%;
    min-height: calc(100vh - 63px);
    // background: ${({ theme }) => theme.bg_image};
    background-size: 80%;
    background-repeat: no-repeat;
    background-position: center;
    padding-top: 63px;
`
const Footer = styled.div`
    width: 100%;
    min-height: 63px;
`