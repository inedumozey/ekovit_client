import { useContext } from 'react';
import { useRouter } from 'next/router'
import linkColor from './linkColor';
import { ContextData } from '../../contextApi/ContextApi';
import styled from 'styled-components'
import Link from 'next/link';

export default function MobileLinks({ toggleState, toggle, bottomLinkHeight }) {
    const router = useRouter();
    const { mobileLinks } = useContext(ContextData)

    return (
        <BottomNav bottomLinkHeight={bottomLinkHeight}>
            <div className="box">
                {
                    mobileLinks.main.map((link, i) => {
                        return <Link title={link.name}
                            className='mobile-link'
                            key={i}
                            href={link.url}
                        >
                            <div
                                className='mobile-link-icon'
                                style={linkColor(router, link, toggleState, 'mobile')}>
                                {
                                    <link.icon />
                                }
                            </div>
                            <div
                                className='mobile-link-name'
                                style={linkColor(router, link, toggleState, "mobile")}>
                                {
                                    link.name?.toUpperCase()
                                }
                            </div>
                        </Link>
                    })
                }
            </div>
        </BottomNav>
    )
}


const BottomNav = styled.div`
    width: 100%;
    box-shadow: -1px -1px 7px 4px rgb(0 0 0 / 82%);
    height: ${({ bottomLinkHeight }) => bottomLinkHeight};
    z-index: 10000;
    padding: 0 5px;
    background: ${({ theme }) => theme.bg};
    bottom: 0;
    left: 0;
    right: 0;
    position: fixed;
    user-select: none;
    --webkit-user-select: none;

    .box {
        display: flex;
        margin: auto;
        width: 100%;
        max-width: 500px;
        justify-content: space-between;
        align-items: center;
        height: 100%;
    }

    .mobile-link {
        display: flex;
        justify-content: center;
        width: 50px;
        align-items: center;
        margin: 0 2px;
        flex-direction: column;
        text-decoration: none;

        .mobile-link-icon {
            display: flex;
            border-radius: 50%;
            align-items: center;
        }

        .mobile-link-name {
            font-size: .55rem;
        }

    }
    .link-icon {
        border-radius : 50%;
        height: 30px;
        width: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .link{
        margin-top: 0px;
        font-size: .6rem;
    }

    .bottom-link {
        color: var(--major-color-purest);
    }
`