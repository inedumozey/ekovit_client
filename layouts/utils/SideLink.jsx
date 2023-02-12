import { useContext } from 'react'
import { ContextData } from '../../contextApi/ContextApi';
import styled from 'styled-components'
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ScrollBar } from '../../styles/globalStyles';
import linkColor from './linkColor';

export default function SideLink({ toggleState, isExpanded, type, setOpenSideDeawal }) {
    const router = useRouter()

    const { links } = useContext(ContextData);

    return (
        <Nav isExpanded={isExpanded} className="nav">
            <div className="nav-wrapper">
                {
                    links?.map((link, i) => {
                        return link.show ?
                            (
                                type === "landing" ?

                                    // wider view
                                    <Link
                                        title={link.name}
                                        className='link'
                                        key={i}
                                        onClick={() => setOpenSideDeawal(false)}
                                        href={link.url}
                                        style={linkColor(router, link, toggleState)}
                                    >
                                        <link.icon style={{ marginRight: '5px' }} />
                                        {
                                            link.name?.toUpperCase()
                                        }

                                    </Link> :
                                    isExpanded ?
                                        // wider view
                                        <Link
                                            title={link.name}
                                            className='link'
                                            key={i}
                                            href={link.url}
                                            style={linkColor(router, link, toggleState)}
                                        >
                                            <link.icon style={{ marginRight: '5px' }} />
                                            {
                                                link.name?.toUpperCase()
                                            }

                                        </Link> :

                                        // minimized view
                                        <Link
                                            title={link.name}
                                            className='link-minimize'
                                            key={i}
                                            href={link.url}
                                            style={linkColor(router, link, toggleState)}
                                        >
                                            {
                                                <link.icon style={{ fontSize: '2rem' }} />
                                            }
                                        </Link>

                            ) :
                            ''
                    })
                }

            </div>

        </Nav>
    )
}


const Nav = styled.div`
    transition: 1s;
    height: 100%;
    padding: ${({ isExpanded }) => isExpanded ? '0 0 0 10px' : '0'};
    
    .nav-wrapper {
        overflow-y: auto;
        height: 100%;

    ${ScrollBar()}

    }

    .link {
        text-decoration: none;
        padding: 10px 10px;
        width: 100%;
        display: block;
        margin-top: 10px;
        display: flex;
        align-items: center;
       

        &:hover {
            opacity: .8;
        }
    }

    .link-minimize {
        text-decoration: none;
        padding: 10px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 8px;

        &:hover {
            opacity: .8;
        }
    }
`