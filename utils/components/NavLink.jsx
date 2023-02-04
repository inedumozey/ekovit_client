import React, { useState, useEffect } from 'react'
import styled from 'styled-components';

export default function NavLink({
    link,
    type,
    router,
    linkColor = "#555",
    linkBg = "transparent",
    activeLinkBg = "#0086d4",
    activeLinkColor = "#fff",
    dropdownBorderBg = "#aaa",
    hide,
    activeLinkBorder = false,
    dropdownBg = "transparent",
    scrollbarThumbBg = "#aaa",
    scrollbarTractBg = "#ccc",
}) {

    const [showdropdown, setshowdropdown] = useState(false);
    const [selectedparenturl, setselectedparenturl] = useState('')

    const handleShowDropdown = (e, parent) => {
        e.stopPropagation()
        setshowdropdown(!showdropdown)
        setselectedparenturl(parent)
    }

    useEffect(() => {
        document.body.onclick = (e) => {
            setshowdropdown(false)
        }

    }, [showdropdown])

    return (
        <NavLink_>
            {type !== "side" ?
                <Nav
                    activeLinkBg={activeLinkBg}
                    activeLinkColor={activeLinkColor}
                    linkColor={linkColor}
                    dropdownBorderBg={dropdownBorderBg}
                    activeLinkBorder={activeLinkBorder}
                    dropdownBg={dropdownBg}
                    scrollbarThumbBg={scrollbarThumbBg}
                    scrollbarTractBg={scrollbarTractBg}
                >
                    {
                        link?.map((link, i) => {
                            return (
                                <div style={{ position: 'relative' }}
                                    onClick={!link.dropdown ?
                                        () => { router.push(!link.dropdown ? link.url : ''); setshowdropdown(false) } :
                                        (e) => handleShowDropdown(e, link.match, link.dropdown[0].match)
                                    }
                                    key={i}
                                >
                                    <div
                                        className={(function () {
                                            if (router.pathname === link.url && link.url === '/') {
                                                return 'linkWrapper active-link'
                                            }
                                            if (router.pathname.includes(link.url) && link.url !== '/') {
                                                return 'linkWrapper active-link'
                                            }
                                            else {
                                                return 'linkWrapper'
                                            }
                                        }())}
                                    >
                                        <div className="linkName">{link.name?.toUpperCase()}</div>
                                    </div>

                                    {/* drop down */}
                                    {
                                        !link.dropdown ? '' :

                                            selectedparenturl === link.match && showdropdown ?
                                                <div className="dropdownBox">
                                                    <div className='dropdownContent'>
                                                        {
                                                            link.dropdown?.map((link, i) => {
                                                                return (
                                                                    <div
                                                                        style={{ display: selectedparenturl === link.match && showdropdown ? 'block' : 'none' }}
                                                                        selectedparenturl={selectedparenturl}
                                                                        link={link}
                                                                        showdropdown={showdropdown}
                                                                        onClick={() => router.push(link.url)}
                                                                        className={router.pathname === link.url ? 'dropdwon_linkWrapper active-link' : 'dropdwon_linkWrapper'}
                                                                        key={i}
                                                                    >
                                                                        <div
                                                                            className={(function () {
                                                                                if (router.pathname === link.url && link.url === '/') {
                                                                                    return 'linkWrapper active-link linkBox'
                                                                                }
                                                                                if (router.pathname.includes(link.url) && link.url !== '/') {
                                                                                    return 'linkWrapper active-link linkBox'
                                                                                }
                                                                                else {
                                                                                    return 'linkWrapper linkBox'
                                                                                }
                                                                            }())}
                                                                        >
                                                                            <div className="linkName">{link.name?.toUpperCase()}</div>
                                                                        </div>

                                                                    </div>
                                                                )

                                                            })
                                                        }
                                                    </div>
                                                </div> : ''
                                    }
                                </div>
                            )
                        })
                    }
                </Nav>
                :
                <SideNav
                    linkColor={linkColor}
                    linkBg={linkBg}
                    activeLinkBg={activeLinkBg}
                    activeLinkColor={activeLinkColor}
                    dropdownBg={dropdownBg}
                >
                    {
                        link?.map((link, i) => {
                            return (
                                <div
                                    onClick={!link.dropdown ?
                                        () => { hide ? hide(false) : ''; router.push(!link.dropdown ? link.url : '') } :
                                        (e) => handleShowDropdown(e, link.match, link.dropdown[0].match)
                                    }
                                    key={i}
                                >
                                    <div
                                        className={(function () {
                                            if (router.pathname === link.url && link.url === '/') {
                                                return 'linkWrapper active-link linkBox'
                                            }
                                            if (router.pathname.includes(link.url) && link.url !== '/') {
                                                return 'linkWrapper active-link linkBox'
                                            }
                                            else {
                                                return 'linkWrapper linkBox'
                                            }
                                        }())}
                                    >
                                        <div className="linkIcon"><link.icon /></div>
                                        <div className="linkName">{link.name?.toUpperCase()}</div>
                                    </div>

                                    {/* drop down */}
                                    {
                                        !link.dropdown ? '' :
                                            link.dropdown?.map((link, i) => {
                                                return (
                                                    <div
                                                        style={{ display: selectedparenturl === link.match && showdropdown ? 'block' : 'none' }}
                                                        selectedparenturl={selectedparenturl}
                                                        link={link}
                                                        showdropdown={showdropdown}
                                                        onClick={() => { hide ? hide(false) : ''; router.push(link.url); }}
                                                        className={router.pathname === link.url ? 'dropdwon_linkWrapper active-link' : 'dropdwon_linkWrapper'}
                                                        key={i}
                                                    >
                                                        <div
                                                            className={(function () {
                                                                if (router.pathname === link.url && link.url === '/') {
                                                                    return 'linkWrapper active-link linkBox'
                                                                }
                                                                if (router.pathname.includes(link.url) && link.url !== '/') {
                                                                    return 'linkWrapper active-link linkBox'
                                                                }
                                                                else {
                                                                    return 'linkWrapper linkBox'
                                                                }
                                                            }())}
                                                        >
                                                            <div className="linkIcon"><link.icon /></div>
                                                            <div className="linkName">{link.name?.toUpperCase()}</div>
                                                        </div>

                                                    </div>
                                                )

                                            })
                                    }
                                </div>
                            )
                        })
                    }
                </SideNav>
            }
        </NavLink_>
    )
}

const NavLink_ = styled.div`
    width: 100%;
    height: 100%;
`
const SideNav = styled.div`
    .linkName {
        margin: 0 5px;
        cursor: default;
    }

    .linkWrapper {
        display: block;
        padding: 6px;
        margin-bottom: 3px;
        user-select: none;
    }

    .linkBox {
        display: flex;
        align-items: center;
        color: ${({ linkColor }) => linkColor};
        list-style: none;
        font-weight: bold;
        padding: 6px;

        &:hover {
            opacity: .7;
        }
    }
    .dropdwon_linkWrapper {
        display: block;
        width: calc(100% - 15px);
        cursor: default;
        user-select: none;
        background: ${({ dropdownBg }) => dropdownBg};
        
        left: 20px;
        list-style: none;
        color: ${({ linkColor }) => linkColor};
        font-weight: bold;
        margin-bottom: 3px;
        margin-left: 15px;

        &:hover {
            opacity: .7;
        }
    }

    .active-link {
        background: ${({ activeLinkBg }) => activeLinkBg};
        color: ${({ activeLinkColor }) => activeLinkColor};
    }
`
const Nav = styled.div`
    position: relative;
    display: flex;

    .linkName {
        cursor: default;
    }

    .linkWrapper {
        padding: 10px;
        color: ${({ linkColor }) => linkColor};
        font-weight: bold;
        position:relative;
        cursor: default;
        user-select: none;

        &:hover {
            opacity: .6;
        }
    }

    .dropdownBox {
        max-height: 300px;
        position: absolute;
        min-width: 200px;
        border: 2px solid ${({ dropdownBorderBg }) => dropdownBorderBg};;
        right: 0;
        background: ${({ dropdownBg }) => dropdownBg};
        z-index: 1000;
        top: 40px;
        padding: 5px;

        &:before {
            content: '';
            position: absolute;
            top: -20px;
            z-index: 10;
            right: -3px;
            border-right: 10px solid transparent;
            border-left: 10px solid transparent;
            border-top: 10px solid transparent;
            border-bottom: 10px solid ${({ dropdownBorderBg }) => dropdownBorderBg};
        }
    }
    .dropdownContent {
        max-height: 290px;
        min-width: 148px;
        overflow-y: auto;
        user-select: none;

        &::-webkit-scrollbar-thumb {
            background-color: ${({ scrollbarThumbBg }) => scrollbarThumbBg};
            border-radius: 50px;
          }
          &::-webkit-scrollbar-track {
            background-color: ${({ scrollbarTractBg }) => scrollbarTractBg};
          }
          &::-webkit-scrollbar-corner {
            background-color: #00415D30;
          }
          &::-webkit-scrollbar {
            width: .7rem;
            height: .7rem;
          }
          & {
            -ms-overflow-style: auto;
            scrollbar-color:#00415D30;
            scrollbar-width: thin;
          }
        
    }

    .active-link {
        border: ${({ activeLinkBg, activeLinkBorder }) => activeLinkBorder ? `1px solid ${activeLinkBg}` : ''};
        // border: 1px solid ${({ activeLinkBg, activeLinkBorder }) => activeLinkBg};
        color: ${({ activeLinkColor }) => activeLinkColor};
    }
`
