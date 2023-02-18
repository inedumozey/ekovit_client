import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components'
import { ContextData } from '../../../contextApi/ContextApi';
import apiClass from '../../../utils/data/api';
import FetchError from '../../../utils/components/FetchError';
import Spinner from '../../../utils/components/Spinner';
import { useRouter } from 'next/router';
import { Animate } from '../../../styles/globalStyles';
import UpdatedEmailPhone from './UpdatedEmailPhone';

const api = new apiClass()

export default function Config() {
    const router = useRouter()
    const [ready, setReady] = useState(false)
    const { access, config } = useContext(ContextData);
    const {
        fetchingConfig,
        setFetchingConfig,
        fetchingConfigSuccess,
        setFetchingConfigSuccess,
        configData,
        setConfigData,
    } = config

    const { hasAccess } = access


    useEffect(() => {
        if (!hasAccess) {
            api.refreshToken()
            setTimeout(() => {
                api.fetchConfig(setFetchingConfig, setFetchingConfigSuccess, setConfigData, true)
            }, 1000)
        }
        else {
            api.fetchConfig(setFetchingConfig, setFetchingConfigSuccess, setConfigData, true)
        }
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setReady(true)
        }, 1000)
    }, [])

    return (
        <Wrapper>

            {
                !ready || fetchingConfig ? <div><Spinner type='dots' /></div> :
                    !fetchingConfigSuccess ? <FetchError style={{ padding: '10px 0' }} /> :
                        <Animate>
                            <UpdatedEmailPhone initialState={configData} />
                        </Animate>
            }

        </Wrapper>
    )
}


const Wrapper = styled.div`
    position: relative;
    line-height: 1.3rem;

    padding: 10px ${({ theme }) => theme.lg_padding};
    @media (max-width: ${({ theme }) => theme.md_screen}){
        padding: 10px ${({ theme }) => theme.md_padding};
    }
    @media (max-width: ${({ theme }) => theme.sm_screen}){
        padding: 10px ${({ theme }) => theme.sm_padding};
    }
`
