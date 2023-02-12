import React, { useEffect, useState, useRef, useContext } from 'react';
import styled from 'styled-components'
import { ContextData } from '../../../contextApi/ContextApi';
import apiClass from '../../../utils/data/api';
import FetchError from '../../../utils/components/FetchError';
import Search from '../../../utils/components/Search';
import filter from "@mozeyinedu/filter";
import Spinner from '../../../utils/components/Spinner';
import { useRouter } from 'next/router';
import { Animate } from '../../../styles/globalStyles';

const api = new apiClass()

let users = [
    {
        email: 'hdgdg',
        role: 'ADMIN',
        isSupperAdmin: true,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    }, {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    }, {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    }, {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    }, {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    }, {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    }, {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    }, {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    }, {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    }, {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    }, {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    }, {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    }, {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    }, {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
    {
        email: 'hdgdg',
        role: 'USER',
        isSupperAdmin: false,
        _id: '6bhcxur6568u57546f86ym'
    },
]

export default function Users() {
    const router = useRouter()
    const { admin, num, access } = useContext(ContextData);
    const [ready, setReady] = useState(false)
    const [observing, setObserving] = useState(false)
    const [inp, setInp] = useState('')
    const [count, setCount] = useState(num);
    const pageEnd = useRef()
    const { hasAccess } = access

    const {
        fetchingUsers,
        setFetchingUsers,
        fetchingUsersSuccess,
        setFetchingUsersSuccess,
        users,
        setUsers,
    } = admin;

    const [filteredData, setFilter] = useState(users);

    useEffect(() => {
        if (count < users.length && observing) {
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    setTimeout(() => {
                        setCount(prevState => prevState + num)
                    }, 500)
                }
            }, {
                threshold: .5
            })

            pageEnd.current ? observer.observe(pageEnd.current) : ''
        }
    }, [observing, count])

    useEffect(() => {
        setObserving(true)
    }, [])


    useEffect(() => {
        if (!hasAccess) {
            api.refreshToken()
            setTimeout(() => {
                api.fetchUsers(setFetchingUsers, setFetchingUsersSuccess, setUsers, true)
            }, 1000)
        }
        else {
            api.fetchUsers(setFetchingUsers, setFetchingUsersSuccess, setUsers, true)
        }
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setReady(true)
        }, 1000)
    }, [])

    useEffect(() => {
        const newData = filter({
            data: users,
            keys: ["username", "email", 'role'],
            input: inp
        })

        setFilter(newData)

    }, [inp, users])

    return (
        <Wrapper>

            {
                !ready || fetchingUsers ? <div><Spinner type='dots' /></div> :
                    !fetchingUsersSuccess ? <FetchError style={{ padding: '10px 0' }} /> :
                        <div className='container'>
                            <div className="header">
                                <div className='header-content'>
                                    <div>
                                        <div>Total Users: <span style={{ color: 'red' }}>{users.length}</span></div>
                                        <div>
                                            Admins: <span style={{ color: 'red' }}>{(users.filter(user => user.role?.toLowerCase() === 'admin')).length}</span>
                                        </div>
                                        <div>
                                            Supper Admins: <span style={{ color: 'red' }}>{(users.filter(user => user.isSupperAdmin)).length} </span>{`=> (${(users.filter(user => user.isSupperAdmin))[0].email})`}
                                        </div>
                                    </div>
                                    <div>
                                        <Search
                                            onSearch={(inp) => setInp(inp)}
                                            placeholder={"Search with email, username, role"}
                                        />
                                    </div>
                                </div>

                            </div>
                            <div className="main">
                                {
                                    filteredData?.slice(0, count).map((data, i) => {

                                        return (
                                            <Animate key={i}>
                                                <Card onClick={() => router.push(`/admin/users/${data._id}`)}>
                                                    <div className="left">
                                                        <div className="emai">Email: {data.email}</div>
                                                        <div className="username">Username: {data.username}</div>
                                                    </div>
                                                    <div className="right">
                                                        <span style={
                                                            (function () {

                                                                if (data.role == 'ADMIN' && !data.isSupperAdmin) {
                                                                    return { color: 'blue' }
                                                                }
                                                                else if (data.role == 'AGENT' && !data.isSupperAdmin) {
                                                                    return { color: 'purple' }
                                                                }
                                                                else if (data.role == 'ADMIN' && data.isSupperAdmin) {
                                                                    return { color: 'red' }
                                                                }
                                                                else {
                                                                    return { color: 'inherit' }
                                                                }
                                                            }())
                                                        }> {data.role} {data.isSupperAdmin ? `SUPPER ADMIN` : data.role}
                                                        </span>
                                                    </div>
                                                </Card>
                                            </Animate>
                                        )
                                    })
                                }
                            </div>

                        </div>
            }

            <div ref={pageEnd}>
                {
                    (observing || ready || !fetchingUsers) && fetchingUsersSuccess && count < users.length ? <Spinner type="dots" /> : ''
                }
            </div>

        </Wrapper>
    )
}


const Wrapper = styled.div`
    position: relative;
    line-height: 1.3rem;

    .container {
        min-height: 100%;
        .header {
            width: 100%;
            .header-content {
                position: relative;
                width: 100%;
                padding: 10px 0 30px 0;
                display: flex;
                align-items: flex-start;

                border-bottom: 1px solid #ccc;               
            }
            
            padding: 10px ${({ theme }) => theme.lg_padding};
            @media (max-width: ${({ theme }) => theme.md_screen}){
                padding: 10px ${({ theme }) => theme.md_padding};
            }
            @media (max-width: ${({ theme }) => theme.sm_screen}){
                padding: 10px ${({ theme }) => theme.sm_padding};
            }
        }

        .main {

            padding: 10px ${({ theme }) => theme.lg_padding};
            @media (max-width: ${({ theme }) => theme.md_screen}){
                padding: 10px ${({ theme }) => theme.md_padding};
            }
            @media (max-width: ${({ theme }) => theme.sm_screen}){
                padding: 10px ${({ theme }) => theme.sm_padding};
            }

        }
    }
`

const Card = styled.div`
    width: 100%;
    max-width: 700px;
    border: ${({ theme }) => `1px solid ${theme.border}`};
    padding: 10px;
    margin: auto;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:hover {
        opacity: .6;
        cursor: pointer;
    }
`
