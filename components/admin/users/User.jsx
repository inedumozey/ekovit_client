import React, { useEffect, useState, useContext } from 'react';
import styled, { keyframes } from 'styled-components'
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
    const { hasAccess } = access

    const {
        fetchingUser,
        setFetchingUser,
        fetchingUserSuccess,
        setFetchingUserSuccess,
        user,
        setUser,
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


    return (
        <Wrapper>

            {
                !ready || fetchingUser ? <div><Spinner type='dots' /></div> :
                    !fetchingUserSuccess ? <FetchError style={{ padding: '10px 0' }} /> :
                        <div className="main">
                            <Animate>
                                <Card>
                                    <ProfileInfo data={user} />
                                </Card>
                            </Animate>
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
    line-height: 1.3rem;
`
const Card = styled.div`
    width: 100%;
    margin: auto;
    // display: flex;
    // justify-content: space-between;
    // align-items: center;


    padding: 10px ${({ theme }) => theme.lg_padding};
    @media (max-width: ${({ theme }) => theme.md_screen}){
        padding: 10px ${({ theme }) => theme.md_padding};
    }
    @media (max-width: ${({ theme }) => theme.sm_screen}){
        padding: 10px ${({ theme }) => theme.sm_padding};
    }
`
