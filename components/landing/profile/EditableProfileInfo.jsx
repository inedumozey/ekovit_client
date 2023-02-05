import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { ContextData } from '../../../contextApi/ContextApi';
import Spinner from '../../../utils/components/Spinner';
import apiClass from '../../../utils/data/api';
import Btn from '../../../utils/components/Btn';
import { InputWrapper, InputIcon } from '../../../styles/globalStyles';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import BorderColorIcon from '@mui/icons-material/BorderColor';

const api = new apiClass()

export default function EditableProfileInfo({ initiastate }) {
    const { user } = useContext(ContextData);

    const {
        editProfileLoading,
        setEditProfileLoading,
        setFetchingProfile,
        setFetchingProfileSuccess,
        setProfile
    } = user;

    const [inp, setInp] = useState({ username: initiastate });

    const submitForm = () => {
        api.addUsername(setEditProfileLoading, setFetchingProfile, setFetchingProfileSuccess, setProfile, inp)
    }

    return (
        <Wrapper>

            <h4>Updated Username <BorderColorIcon className='icon' /></h4>
            <InputWrapper>
                <InputIcon right="" left="0">
                    <PersonOutlineIcon className='icon' />
                </InputIcon>
                <input
                    type="text"
                    value={inp.username || ''}
                    onChange={(e) => setInp({ ...inp, username: e.target.value })}
                />
            </InputWrapper>

            <InputWrapper>
                <Btn
                    onClick={submitForm}
                    style={{ width: '100%' }}
                    disabled={editProfileLoading}
                    color="var(--blue)">
                    {editProfileLoading ? <Spinner size="sm" /> : "Update"}
                </Btn>
            </InputWrapper>

        </Wrapper>
    )
}


const Wrapper = styled.div`
    h4 {
        color: ${({ theme }) => theme.title};
        padding: 20px 0 5px 2px;
        display: flex;
        align-items: center;
    }
`