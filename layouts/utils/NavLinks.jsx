import { useContext } from 'react'
import { ContextData } from '../../contextApi/ContextApi';
import styled from 'styled-components'
import { useRouter } from 'next/router';
import Link from 'next/link';


export default function NavLinks({ toggleState }) {
    const router = useRouter()

    const { links } = useContext(ContextData);

    return (
        <Nav className="nav">
            {
                links?.map((link, i) => {
                    return link.show ?
                        <Link
                            className='link'
                            key={i}
                            href={link.url}
                            style={{ color: router.pathname === link.url ? (toggleState ? '#795548' : '#fff') : '' }}
                        >
                            {
                                link.name?.toUpperCase()
                            }
                        </Link> : ''
                })
            }
        </Nav>
    )
}


const Nav = styled.div`
    transition: 1s;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .link {
        color: ${({ theme }) => theme.title};
        text-decoration: none;
        padding: 10px 4px;

        &:hover {
            opacity: .8;
        }
    }

    @media (max-width: 800px){
        display: none
    }
`