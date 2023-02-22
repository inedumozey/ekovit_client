import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components'
import { ContextData } from '../../../contextApi/ContextApi';
import apiClass from '../../../utils/data/api';
import FetchError from '../../../utils/components/FetchError';
import Spinner from '../../../utils/components/Spinner';
import { useRouter } from 'next/router';
import ProfileInfo from '../../landing/profile/ProfileInfo';
import { Animate } from '../../../styles/globalStyles';

const api = new apiClass()

export default function User() {
    const router = useRouter();
    const { id } = router.query

    const { admin, num, access } = useContext(ContextData);
    const [ready, setReady] = useState(false)
    const [fetch, setFetch] = useState(false)
    const [toggleAdminLoading, setToggleAdminLoading] = useState(false)
    const [toggleAgentLoading, setToggleAgentLoading] = useState(false)
    const [deletinguser, setDeletinguser] = useState(false)
    const { hasAccess } = access

    const {
        fetchingUser,
        setFetchingUser,
        setFetchingUsers,
        setUsers,
        fetchingUserSuccess,
        setFetchingUserSuccess,
        user,
        setUser,
        setFetchingUsersSuccess,
    } = admin;


    useEffect(() => {
        if (fetch) {
            if (!hasAccess) {
                api.refreshToken()
                setTimeout(() => {
                    api.fetchUser(setFetchingUser, setFetchingUserSuccess, setUser, id, true)
                }, 1000)
            }
            else {
                api.fetchUser(setFetchingUser, setFetchingUserSuccess, setUser, id, true)
            }
        }
    }, [ready])

    useEffect(() => {
        setTimeout(() => {
            setFetch(true)
        }, 500)
    }, [])

    useEffect(() => {
        if (fetch) {
            setTimeout(() => {
                setReady(true)
            }, 500)
        }
    }, [fetch])

    const handleToggleAdmin = (id) => {
        if (!hasAccess) {
            api.refreshToken()
            setTimeout(() => {
                api.toggleAdmin(setToggleAdminLoading, setFetchingUser, setFetchingUserSuccess, setUser, id)
            }, 1000)
        }
        else {
            api.toggleAdmin(setToggleAdminLoading, setFetchingUser, setFetchingUserSuccess, setUser, id)
        }
    }

    const handleToggleAgent = (id) => {
        if (!hasAccess) {
            api.refreshToken()
            setTimeout(() => {
                api.toggleAgent(setToggleAgentLoading, setFetchingUser, setFetchingUserSuccess, setUser, id)
            }, 1000)
        }
        else {
            api.toggleAgent(setToggleAgentLoading, setFetchingUser, setFetchingUserSuccess, setUser, id)
        }
    }

    const handleDeleteAccount = (id) => {
        if (!hasAccess) {
            api.refreshToken()
            setTimeout(() => {
                api.deleteAccount(setDeletinguser, setUsers, id, setFetchingUsers, setFetchingUsersSuccess, router)
            }, 1000)
        }
        else {
            api.deleteAccount(setDeletinguser, setUsers, id, setFetchingUsers, setFetchingUsersSuccess, router)
        }
    }

    return (
        <Wrapper>

            {
                !ready || fetchingUser ? <div><Spinner type='dots' /></div> :
                    !fetchingUserSuccess ? <FetchError style={{ padding: '10px 0' }} /> :
                        <div className="main">
                            <Animate>
                                <ProfileInfo data={user} />
                            </Animate>

                            {
                                !user.isSupperAdmin ?
                                    <>
                                        <Animate>
                                            {
                                                (function () {
                                                    if (user.role.toLowerCase() !== 'admin') {
                                                        return <div
                                                            onClick={toggleAdminLoading ? () => { } : () => handleToggleAdmin(user._id)} className='container fn'
                                                        >
                                                            {toggleAdminLoading ? <Spinner type="dots" /> : "Make Admin"}
                                                        </div>
                                                    }
                                                    else if (user.role.toLowerCase() === 'admin') {
                                                        return <div
                                                            onClick={toggleAdminLoading ? () => { } : () => handleToggleAdmin(user._id)} className='container fn'
                                                        >
                                                            {toggleAdminLoading ? <Spinner type="dots" /> : "Remove Admin"}
                                                        </div>
                                                    }
                                                }())
                                            }
                                        </Animate>

                                        <Animate>
                                            {
                                                (function () {
                                                    if (user.role.toLowerCase() !== 'admin' && user.role.toLowerCase() === 'user') {
                                                        return <div
                                                            onClick={toggleAgentLoading ? () => { } : () => handleToggleAgent(user._id)} className='container fn'
                                                        >
                                                            {toggleAgentLoading ? <Spinner type="dots" /> : "Make Agent"}
                                                        </div>
                                                    }

                                                    if (user.role.toLowerCase() === 'agent') {
                                                        return <div
                                                            onClick={toggleAgentLoading ? () => { } : () => handleToggleAgent(user._id)} className='container fn'
                                                        >
                                                            {toggleAgentLoading ? <Spinner type="dots" /> : "Remove Agent"}
                                                        </div>
                                                    }
                                                }())
                                            }

                                        </Animate>

                                        <Animate>
                                            {

                                                user.role.toLowerCase() === 'user' ?
                                                    <div
                                                        onClick={deletinguser ? () => { } : () => handleDeleteAccount(user._id)}
                                                        className='container fn'
                                                        style={{ color: 'red' }}
                                                    >
                                                        {deletinguser ? <Spinner type="dots" /> : "Delete Account"}
                                                    </div> : ''
                                            }
                                        </Animate>

                                    </> : ''
                            }

                        </div>
            }

        </Wrapper>
    )
}


const Wrapper = styled.div`
    padding: 10px ${({ theme }) => theme.lg_padding};
    @media (max-width: ${({ theme }) => theme.md_screen}){
        padding: 10px ${({ theme }) => theme.md_padding};
    }
    @media (max-width: ${({ theme }) => theme.sm_screen}){
        padding: 10px ${({ theme }) => theme.sm_padding};
    }

    .container {
        width: 100%;
        padding: 15px;
        background: ${({ theme }) => theme.card};
        margin: 10px 0;
        color: var(--pri-darktheme);

    .fn {
        cursor: pointer;
        text-align: center;

        &:hover {
            opacity: .5
        }
    }
`