import React, { useEffect, useState, useRef, useContext } from 'react';
import styled from 'styled-components'
import { ContextData } from '../../../contextApi/ContextApi';
import apiClass from '../../../utils/data/api';
import FetchError from '../../../utils/components/FetchError';
import Search from '../../../utils/components/Search';
import filter from "@mozeyinedu/filter";
import { useSnap } from '@mozeyinedu/hooks-lab';
import Spinner from '../../../utils/components/Spinner';
import { ViewMore } from '../../../styles/globalStyles';

const api = new apiClass()


export default function Users() {
    const { snap } = useSnap(.5)
    const { admin, num } = useContext(ContextData);
    const [ready, setReady] = useState(false)
    const [observing, setObserving] = useState(false)
    const [inp, setInp] = useState('')
    const [count, setCount] = useState(num);
    const [opening, setOpening] = useState(false);
    const ref = useRef(null)


    const {
        fetchingUsers,
        setFetchingUsers,
        fetchingUsersSuccess,
        setFetchingUsersSuccess,
        users,
        setUsers,
    } = admin;

    const [filteredData, setFilter] = useState(users);

    console.log(filteredData)

    useEffect(() => {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    setObserving(false)
                }
                else {
                    setObserving(true)
                    observer.unobserve(entry.target)
                }
            })
        }, {
            threshold: 1,
            rootMargin: "20px"
        })

        // ref.current.forEach(imgBox => {
        //     observer.observe(imgBox)
        // })
    })

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

    const handleViewMore = () => {
        setOpening(true)

        setTimeout(() => {
            setOpening(false)
            setCount(prevState => prevState + num)
        }, 1000)
    }

    return (
        <Wrapper>
            {
                !ready || fetchingUsers ? 'Loading...' :
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
                                                    }> {data.Role} {data.isSupperAdmin ? `SUPPER ADMIN` : data.role}
                                                    </span>
                                                </div>
                                            </Card>
                                        )
                                    })
                                }
                            </div>

                            {
                                count >= filteredData.length ? '' :

                                    <ViewMore>
                                        <div onClick={handleViewMore} className="more" {...snap()}>
                                            {opening ? <div className='center'> <Spinner size="sm" /></div> : 'View more...'}
                                        </div>
                                    </ViewMore>
                            }
                        </div>
            }
        </Wrapper>
    )
}


const Wrapper = styled.div`
    height: 100%;

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

    &:hover {
        opacity: .6;
        cursor: pointer;
    }

    .left {
        // border: 1px solid red;
    }
    .right {
        min-width: 50px;
        // border: 1px solid red;
    }
`


