import React, { useContext, useEffect, useState } from 'react';
import { ContextData } from '../../../contextApi/ContextApi';
import apiClass from '../../../utils/data/api';
import styled from 'styled-components';
import ProfileInfo from './ProfileInfo';
import Skeletons from './Skeletons';
import EditableProfileInfo from './EditableProfileInfo';
import ResetPassword from './ResetPassword';
import FetchError from '../../../utils/components/FetchError';
const api = new apiClass()

export default function Profile() {
    const { user } = useContext(ContextData)
    const [ready, setReady] = useState(false)
    const {
        fetchingProfile,
        setFetchingProfile,
        fetchingProfileSuccess,
        setFetchingProfileSuccess,
        profile,
        setProfile,
    } = user

    useEffect(() => {
        api.fetchProfile(setFetchingProfile, setFetchingProfileSuccess, setProfile, true)
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setReady(true)
        }, 500)
    })

    return (
        <Wrapper>
            {
                !ready || fetchingProfile ? <Skeletons /> :
                    !fetchingProfileSuccess ? <FetchError /> :
                        <>
                            <ProfileInfo data={profile} />
                            <EditableProfileInfo initiastate={profile.username} />
                            <ResetPassword />
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