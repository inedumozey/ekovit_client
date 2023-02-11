import React, { useEffect, useState, useRef, useContext } from 'react';
import styled, { keyframes } from 'styled-components'
import { ContextData } from '../../../contextApi/ContextApi';
import apiClass from '../../../utils/data/api';
import FetchError from '../../../utils/components/FetchError';
import Search from '../../../utils/components/Search';
import filter from "@mozeyinedu/filter";
import { ThreeDots } from 'react-loader-spinner'

const api = new apiClass()

const users = [
    {
        email: 'hdgdg',
        role: 'ADMIN',
        isSupperAdmin: true
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
    {
        email: 'hdgdg',
        role: 'user',
        isSupperAdmin: false
    },
]

export default function Users() {
    const { admin, num } = useContext(ContextData);
    const [ready, setReady] = useState(false)
    const [observing, setObserving] = useState(false)
    const [inp, setInp] = useState('')
    const [count, setCount] = useState(num);
    const pageEnd = useRef()


    const {
        fetchingUsers,
        setFetchingUsers,
        fetchingUsersSuccess,
        setFetchingUsersSuccess,
        // users,
        setUsers,
    } = admin;

    const [filteredData, setFilter] = useState(users);

    useEffect(() => {

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setTimeout(() => {
                    setCount(prevState => prevState + num)
                }, 1000)
            }
        }, {
            threshold: .5
        })

        observer.observe(pageEnd.current)

    }, [])

    useEffect(() => {
        if (count <= users.length || ready || !fetchingUsers) {
            setObserving(true)
        }
    }, [count, fetchingUsers, ready])

    useEffect(() => {
        api.fetchUsers(setFetchingUsers, setFetchingUsersSuccess, setUsers, true)
    }, [])

    useEffect(() => {

        setTimeout(() => {
            setReady(true)
        }, 500)
    })

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
                !ready || fetchingUsers ? <div style={{ textAlign: 'center', padding: '20px' }}>Loading...</div> :
                    !fetchingUsersSuccess ? <FetchError /> :
                        <div className='container'>
                            <div className="header">
                                <div className='header-content'>
                                    <div>
                                        <div>Total Users: {users.length}</div>
                                        <div>
                                            Admins: {(users.filter(user => user.role?.toLowerCase() === 'admin')).length}
                                        </div>
                                        <div>
                                            Supper Admins: {(users.filter(user => user.isSupperAdmin)).length} {`(${(users.filter(user => user.isSupperAdmin))[0].email})`}
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
                                            <Card key={i}>
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
                                        )
                                    })
                                }
                            </div>

                        </div>
            }

            <div ref={pageEnd} style={{
                height: '30px',
                width: '100%',
                display: 'flex',
                justifyContent: 'center'
            }}
            >
                {
                    observing ?
                        <ThreeDots
                            height="30"
                            width="50"
                            radius="9"
                            color="#0988ed"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            wrapperClassName=""
                            visible={true}
                        /> : ''
                }
            </div> : ''

        </Wrapper>
    )
}


const Wrapper = styled.div`
    min-height: ;
    position: relative;

    .container {

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
const animate = keyframes`
    from { transform: scale(.5) }
`

const Card = styled.div`
    width: 100%;
    max-width: 700px;
    border: 1px solid #ccc;
    padding: 10px;
    margin: auto;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    animation-name: ${animate};
    animation-duration: .3s;
    animation-iteration-count: linear;

    &:hover {
        opacity: .6;
        cursor: pointer;
    }
`
