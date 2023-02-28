import { useEffect, useState, useContext } from 'react'
import styled from 'styled-components'
import Modal from '../../utils/components/Modal';
import MenuIcon from '@mui/icons-material/Menu';
import NavLinks from '../utils/NavLinks';
import UserLog from '../utils/UserLog';
import SideBarLayoutLanding from '../utils/SideBarLayoutLanding';
import SideLink from '../utils/SideLink';
import LightDarkBtn from '../../utils/components/LightDarkBtn';
import { useRouter } from 'next/router'
import ResolveClass from '../../utils/resolveClass';
import Search from '../../utils/components/Search';
import Copyright from '../../utils/components/Copyright';
import Carts from '../../utils/components/Carts';
import HelpBtn from '../utils/HelpBtn';
import { ContextData } from '../../contextApi/ContextApi';
import Link from 'next/link'
import Logo from '../../utils/components/MasterLogo';

const resolve = new ResolveClass()

const headerHeight = '100px'
const footerHeight = '50px'

export default function Landing({ children, toggleState, toggle }) {
    const router = useRouter()
    const [openSideDrawal, setOpenSideDeawal] = useState(false);
    const { links } = useContext(ContextData)

    return (
        <Wrapper>
            <Header toggleState={toggleState}>
                <div className="top">
                    <div className='toggle' onClick={() => setOpenSideDeawal(!openSideDrawal)}><MenuIcon className='icon' /></div>
                    <Link href="/" className='logo'>
                        <Logo />
                    </Link>

                    <NavLinks toggleState={toggleState} />

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ marginRight: '5px' }}>
                            <HelpBtn />
                        </div>
                        <div className='carts'>
                            <Carts />
                        </div>
                        <div style={{ width: '100px' }}>
                            <UserLog toggleState={toggleState} toggle={toggle} />
                        </div>
                        <div className="theme-btn">
                            <LightDarkBtn toggleState={toggleState} toggle={toggle} />
                        </div>
                    </div>
                </div>
                <div className="bottom">
                    {/* <div style={{ fontSize: '.6rem' }} className="content el">{resolve.path(router)}</div> */}
                    <div className='small-screen'><Carts /></div>

                    <div className="search-wrapper"> <Search /> </div>
                </div>

            </Header>
            <Main>{children}</Main>
            <Footer>
                <Copyright />
            </Footer>
            <Modal
                drawal={true}
                show={openSideDrawal}
                setShow={setOpenSideDeawal}
            >
                <SideBar>
                    <SideBarLayoutLanding toggleState={toggleState} toggle={toggle}>
                        <SideLink setOpenSideDeawal={setOpenSideDeawal} toggleState={toggleState} toggle={toggle} type="landing" links={links} />
                    </SideBarLayoutLanding>
                </SideBar>
            </Modal>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    position: relative;

    img {
        width: 100%;
        height: 100%;
    }
`

const SideBar = styled.div`
    width: 60vw;
    height: 100vh;
    background: ${({ theme }) => theme.bg};
    box-shadow: 1px 1px 7px 4px rgb(0 0 0 / 82%);
`

const Header = styled.div`
    width: 100%;
    height: ${headerHeight};
    font-weight: 600;
    user-select: none;
    position: fixed;
    transition: 1s;
    z-index: 1000;
    background: ${({ theme }) => theme.bg};
    left: 0;
    top: 0;
    right: 0;
    box-shadow: -1px -1px 7px 4px rgb(0 0 0 / 82%);

    .top {
        height: 63px;
        font-weight: 600;
        display: flex;
        justify-content: space-between;
        aligin-items: center;

        .carts {
            padding: 0 10px;
            display: flex;
            justify-content: space-between;
            aligin-items: center;

            @media (max-width: ${({ theme }) => theme.sm_screen}){
                display: none
            };
        }

        padding: 10px ${({ theme }) => theme.lg_padding};
        @media (max-width: ${({ theme }) => theme.md_screen}){
            padding: 10px ${({ theme }) => theme.md_padding};
        }
        @media (max-width: ${({ theme }) => theme.sm_screen}){
            padding: 10px ${({ theme }) => theme.sm_padding};
        }

    }
    
    
    .bottom {
        height: calc(100% - 60px);
        padding: 0px 10px;
        font-weight: bold;
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;

        padding: 5px ${({ theme }) => theme.lg_padding};
        @media (max-width: ${({ theme }) => theme.md_screen}){
            padding: 5px ${({ theme }) => theme.md_padding};
        }
        @media (max-width: ${({ theme }) => theme.sm_screen}){
            padding: 5px ${({ theme }) => theme.sm_padding};
        };

        .search-wrapper {
            position: relative;
            height: 100%;
            width: 80%
        }

        .small-screen {
            padding: 0 10px;
            display: none;

            @media (max-width: ${({ theme }) => theme.sm_screen}){
                display: block
            };
        }

        @media (min-width: ${({ theme }) => theme.sm_screen}){
            justify-content: flex-end;
        };
    }
    
    .theme-btn {
        margin-left: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        @media (max-width: 800px){
            display: none;
        }
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
        color: ${({ toggleState }) => toggleState ? 'var(--link-lighttheme)' : 'var(--active-link-darktheme)'};
    }

    .logo {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
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

    .nav {
        transition: 1s;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        @media (max-width: 800px){
            display: none
        }

        .link {
            color: ${({ theme }) => theme.title};
            text-decoration: none;
            padding: 10px 4px;

            &:hover {
                opacity: .8;
            }
        }
    }
`
const Main = styled.div`
    width: 100%;
    min-height: calc(100vh - ${footerHeight});
    padding-top: ${headerHeight};
`
const Footer = styled.div`
    width: 100%;
    min-height: ${footerHeight};
    display: flex;
    justify-content: center;
    align-items: center;
`