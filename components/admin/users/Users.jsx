import React, { useEffect, useState, useRef, useContext } from 'react';
import styled from 'styled-components'
import { ContextData } from '../../../contextApi/ContextApi';
import apiClass from '../../../utils/data/api';
import FetchError from '../../../utils/components/FetchError';
import filter from "@mozeyinedu/filter";
import Spinner from '../../../utils/components/Spinner';
import { useRouter } from 'next/router';
import { Animate } from '../../../styles/globalStyles';
import Image from 'next/image'

const api = new apiClass()

export default function Users() {
    const router = useRouter()
    const { admin, num, access, search, user } = useContext(ContextData);
    const [ready, setReady] = useState(false)
    const [observing, setObserving] = useState(false)
    const [count, setCount] = useState(num);
    const [isScrolling, setIsScrolling] = useState(false)
    const pageEnd = useRef()
    const { hasAccess } = access
    const { searchedData } = search

    const {
        fetchingUsers,
        setFetchingUsers,
        fetchingUsersSuccess,
        setFetchingUsersSuccess,
        users,
        setUsers,
    } = admin;

    const {
        fetchingProfile,
        setFetchingProfile,
        fetchingProfileSuccess,
        setFetchingProfileSuccess,
        profile,
        setProfile,
    } = user

    const [filteredData, setFilter] = useState(users);

    useEffect(() => {
        if (count < users.length && observing) {
            const observer = new IntersectionObserver((entries) => {
                console.log(entries[0])
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
    }, [observing, count, isScrolling])

    useEffect(() => {
        setObserving(true)

        window.onscroll = (e) => {
            setIsScrolling(true)
        }
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
        if (!hasAccess) {
            api.refreshToken()
            setTimeout(() => {
                api.fetchProfile(setFetchingProfile, setFetchingProfileSuccess, setProfile, true)
            }, 1000)
        }
        else {
            api.fetchProfile(setFetchingProfile, setFetchingProfileSuccess, setProfile, true)
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
            input: searchedData
        })

        setFilter(newData)

    }, [searchedData, users])

    return (
        <Wrapper>

            {
                !ready || fetchingUsers || fetchingProfile ? <div><Spinner type='dots' /></div> :
                    !fetchingUsersSuccess || !fetchingProfileSuccess ? <FetchError style={{ padding: '10px 0' }} /> :
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
                                </div>

                            </div>
                            <div className="main">
                                {
                                    filteredData?.slice(0, count).map((data, i) => {
                                        return (
                                            <Animate key={i}>
                                                {
                                                    data._id === profile._id ?
                                                        <CardActive>
                                                            <div className="left">
                                                                <div className="img">
                                                                    <Image src={"/images/profile.png"} width="400" height="200" alt="" />
                                                                </div>

                                                            </div>
                                                            <div className="mid">
                                                                <div className="emai el">Email: {data.email}</div>
                                                                {
                                                                    data.username ? <div className="username el">Username: {data.username}</div> : ''
                                                                }

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
                                                                }> {data.isSupperAdmin ? `SUPPER ADMIN` : data.role}
                                                                </span>
                                                            </div>
                                                        </CardActive> :

                                                        <Card onClick={() => router.push(`/admin/users/${data._id}`)}>
                                                            <div className="left">
                                                                <div className="img">
                                                                    <Image src={"/images/profile.png"} width="400" height="200" alt="" />
                                                                </div>

                                                            </div>
                                                            <div className="mid">
                                                                <div className="emai el">Email: {data.email}</div>
                                                                {
                                                                    data.username ? <div className="username el">Username: {data.username}</div> : ''
                                                                }

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
                                                                }> {data.isSupperAdmin ? `SUPPER ADMIN` : data.role}
                                                                </span>
                                                            </div>
                                                        </Card>
                                                }
                                            </Animate>
                                        )
                                    })
                                }
                            </div>

                        </div>
            }

            {
                observing && ready && !fetchingUsers && !fetchingProfile && fetchingUsersSuccess && fetchingProfileSuccess && count < users.length ?
                    <div style={{ height: '50px' }} ref={pageEnd}>
                        <Spinner type="dots" />
                    </div> : ''
            }
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
    padding: 15px 10px;
    margin: auto;
    height: 
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: ${({ theme }) => theme.card};
    cursor: pointer;

    .right {
        font-size: .7rem;
        width: 90px;
        text-align: right;
        font-weight: bold;
    }

    .left {
        width: 50px;

        .img {
            width: 100%;
            height: 50px;
    
            img {
                object-fit: contain;
                width: 100%;
                height: 100%;
            } 
        }
    }

    .mid {
        width: calc(100% - 40px - 40px);
        padding: 0 5px;
    }

    &:hover {
        opacity: .6;
    }
`
const CardActive = styled.div`
    width: 100%;
    max-width: 700px;
    background: ${({ theme }) => theme.card};
    padding: 15px 10px;
    margin: auto;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    opacity: .4;
    cursor: default;

    .right {
        font-size: .7rem;
        width: 90px;
        text-align: right;
        font-weight: bold;
    }

    .left {
        width: 50px;

        .img {
            width: 100%;
            height: 50px;
    
            img {
                object-fit: contain;
                width: 100%;
                height: 100%;
            } 
        }
    }

    .mid {
        width: calc(100% - 40px - 40px);
        padding: 0 5px;
    }
`