import React, { useState } from 'react'
import styled from 'styled-components'
import Spinner from '../../../utils/components/Spinner';
import Btn from '../../../utils/components/Btn';
import { InputWrapper, InputIcon } from '../../../styles/globalStyles';
import LockIcon from '@mui/icons-material/Lock';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import apiClass from '../../../utils/data/api';

const api = new apiClass()

export default function ResetPassword() {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);
    const [sending, setSending] = useState(false);

    const [currentPassword, setCurrentPassword] = useState(currentPassword)
    const [newPassword, setNewPassword] = useState(newPassword);
    const [cPassword, setCPassword] = useState(cPassword);

    const submitForm = () => {
        api.resetPassword(setCurrentPassword, setNewPassword, setCPassword, setSending, { currentPassword, newPassword, cPassword })
    }
    return (
        <Wrapper>

            <h4>Reset Password <BorderColorIcon className='icon' /></h4>
            <InputWrapper>
                <InputIcon right="" left="0">
                    <LockIcon className='icon' />
                </InputIcon>
                <input
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword || ''}
                    placeholder="current Password"
                    onInput={(e) => setCurrentPassword(e.target.value)}
                />
                <InputIcon onClick={() => setShowCurrentPassword(!showCurrentPassword)} right="0" left="">
                    {showCurrentPassword ? <VisibilityOffRoundedIcon className='icon' /> : <RemoveRedEyeRoundedIcon className='icon' />}
                </InputIcon>
            </InputWrapper>

            <InputWrapper>
                <InputIcon right="" left="0">
                    <LockIcon className='icon' />
                </InputIcon>
                <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword || ''}
                    placeholder="Password"
                    onInput={(e) => setNewPassword(e.target.value)}
                />
                <InputIcon onClick={() => setShowNewPassword(!showNewPassword)} right="0" left="">
                    {showNewPassword ? <VisibilityOffRoundedIcon className='icon' /> : <RemoveRedEyeRoundedIcon className='icon' />}
                </InputIcon>
            </InputWrapper>

            <InputWrapper>
                <InputIcon right="" left="0">
                    <LockIcon className='icon' />
                </InputIcon>
                <input
                    type={showCPassword ? "text" : "password"}
                    value={cPassword || ''}
                    placeholder="Confirm Password"
                    onInput={(e) => setCPassword(e.target.value)}
                />
                <InputIcon onClick={() => setShowCPassword(!showCPassword)} right="0" left="">
                    {showCPassword ? <VisibilityOffRoundedIcon className='icon' /> : <RemoveRedEyeRoundedIcon className='icon' />}
                </InputIcon>
            </InputWrapper>

            <InputWrapper>
                <Btn
                    onClick={submitForm}
                    style={{ width: '100%' }}
                    disabled={sending}
                    color="var(--blue)">
                    {sending ? <Spinner size="sm" /> : "Reset"}
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