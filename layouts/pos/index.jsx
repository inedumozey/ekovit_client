import Header from './header/Header';
import Aside from './aside/Aside';
import { mobileAndTabletCheck } from '../../utils/mobileAndTabletCheck';
import { useEffect, useState, useContext } from 'react'
import styled from 'styled-components'
import Modal from '../../utils/components/Modal';
import MobileLinks from '../utils/MobileLinks';
import SideBarLayoutLanding from '../utils/SideBarLayoutLanding';
import SideLink from '../utils/SideLink';
import MenuIcon from '@mui/icons-material/Menu';
import UserLog from '../utils/UserLog';
import Logo from '../../utils/components/MasterLogo';
import Link from 'next/link'
import LightDarkBtn from '../../utils/components/LightDarkBtn';
import { useRouter } from 'next/router'
import ResolveClass from '../../utils/resolveClass';
import Search from '../../utils/components/Search';
import { ContextData } from '../../contextApi/ContextApi';

const resolve = new ResolveClass()

const headerHeight = '100px'
const expandedAside = '200px'
const shrinkedAside = '50px'
const bottomLinkHeight = '50px'

export default function User({ children, toggleState, toggle }) {
    const router = useRouter()
    const [isExpanded, setExpanded] = useState(false)
    const [isMobile, setIsMobile] = useState(false);
    const [openSideDrawal, setOpenSideDeawal] = useState(false);
    const { mobileLinks } = useContext(ContextData)

    useEffect(() => {
        setIsMobile(mobileAndTabletCheck(window))
    }, [])

    const minimize = () => {
        if (isExpanded && isMobile) {
            setExpanded(false)
        }
    }

    return (
        !isMobile ?
            <Wrapper>

                <div onClick={minimize}>
                    <Header
                        headerHeight={headerHeight}
                        isExpanded={isExpanded}
                        setExpanded={setExpanded}
                        toggleState={toggleState}
                        toggle={toggle}
                    />
                </div>

                <Aside
                    expandedAside={expandedAside}
                    shrinkedAside={shrinkedAside}
                    headerHeight={headerHeight}
                    isExpanded={isExpanded}
                    toggleState={toggleState}
                    toggle={toggle}
                    setExpanded={setExpanded}
                />

                <MainStyle
                    shrinkedAside={shrinkedAside}
                    headerHeight={headerHeight}
                    isExpanded={isExpanded}
                    onClick={minimize}
                >
                    <MainContent headerHeight={headerHeight}>
                        {children}
                    </MainContent>
                </MainStyle>
            </Wrapper> :
            <MobileWrapper>

                <MobileHeader toggleState={toggleState}>
                    <div className="top">
                        {
                            router.pathname.includes('/admin') ? <div className='toggle' onClick={() => setOpenSideDeawal(!openSideDrawal)}><MenuIcon className='icon' /></div> : ''
                        }
                        <Link href="/" className='logo'>
                            HELLO
                            {/* <Logo /> */}
                        </Link>

                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ width: '100px' }}>
                                <UserLog toggleState={toggleState} toggle={toggle} />
                            </div>
                            <div className="theme-btn">
                                <LightDarkBtn toggleState={toggleState} toggle={toggle} />
                            </div>
                        </div>
                    </div>
                    <div className="bottom">
                        {/* <div className="content">{resolve.path(router)}</div> */}
                        <div className="search-wrapper">
                            <Search />
                        </div>
                    </div>

                </MobileHeader>

                <MobileMain>
                    {children}
                </MobileMain>
                <MobileLinks toggle={toggle} toggleState={toggleState} bottomLinkHeight={bottomLinkHeight} />

                <Modal
                    drawal={true}
                    show={openSideDrawal}
                    setShow={setOpenSideDeawal}
                >
                    <SideBar>
                        <SideBarLayoutLanding toggleState={toggleState} toggle={toggle}>
                            <SideLink setOpenSideDeawal={setOpenSideDeawal} toggleState={toggleState} toggle={toggle} type="landing" links={mobileLinks.sub} />
                        </SideBarLayoutLanding>
                    </SideBar>
                </Modal>
            </MobileWrapper>
    )
}

const Wrapper = styled.div`
`
const MainStyle = styled.div`;
    position: absolute;
    top: ${({ headerHeight }) => `calc(${headerHeight} - 2px)`};
    right: 400px;
    transition: ${({ theme }) => theme.transition};
    width:  ${({ shrinkedAside, isExpanded }) => isExpanded ? '100vw' : `calc(100vw - ${shrinkedAside})`};
    align-items: center;
    left: ${({ isExpanded }) => isExpanded ? `calc(${expandedAside})` : `calc(${shrinkedAside})`};
    min-height: ${({ headerHeight }) => `calc(100vh - ${headerHeight})`};
    @media (max-width: ${({ theme }) => theme.md_screen}){
        left: ${({ isExpanded }) => isExpanded ? `calc(${expandedAside})` : `0`};
        width: 100vw;
    }
`

const MainContent = styled.div`
    width: 100%;
    min-height: ${({ headerHeight }) => `calc(100vh - ${headerHeight})`};
`

const MobileWrapper = styled.div``

const MobileHeader = styled.div`
    height: 93px;
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

    .logo {
        display: flex;
        justify-content: center;
        aligin-items: center;
        text-decoration: none;
    }

    .top {
        height: 63px;
        font-weight: 600;
        display: flex;
        justify-content: space-between;
        aligin-items: center;


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
        justify-content: flex-end;
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
    }
    
    .theme-btn {
        margin-left: 20px;
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
const MobileMain = styled.div`
    padding-bottom: 70px;
    min-height: 100vh;
    padding-top: ${headerHeight};
`

const SideBar = styled.div`
    width: 60vw;
    height: 100vh;
    background: ${({ theme }) => theme.bg};
    box-shadow: 1px 1px 7px 4px rgb(0 0 0 / 82%);
`