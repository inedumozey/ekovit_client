import React, { useContext, useEffect, useState } from 'react';
import { ContextData } from '../../../contextApi/ContextApi';
import apiClass from '../../../utils/data/api';
import styled from 'styled-components';
import ProfileInfo from './ProfileInfo';
import EditableProfileInfo from './EditableProfileInfo';
import ResetPassword from './ResetPassword';
import FetchError from '../../../utils/components/FetchError';
import Spinner from '../../../utils/components/Spinner';
import { Animate } from '../../../styles/globalStyles'

const api = new apiClass()

export default function Profile() {
    const { user, access } = useContext(ContextData)
    const [ready, setReady] = useState(false)
    const { hasAccess } = access
    const {
        fetchingProfile,
        setFetchingProfile,
        fetchingProfileSuccess,
        setFetchingProfileSuccess,
        profile,
        setProfile,
    } = user

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
    })

    return (
        <Wrapper>
            {
                !ready || fetchingProfile ? <Spinner type="dots" /> :
                    !fetchingProfileSuccess ? <FetchError /> :
                        <>
                            <Animate>
                                <ProfileInfo data={profile} />
                            </Animate>
                            <Animate>
                                <EditableProfileInfo initiastate={profile.username} />
                            </Animate>
                            <Animate>
                                <ResetPassword />
                            </Animate>
                        </>
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
`