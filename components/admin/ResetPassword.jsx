import React, { useState, useContext } from 'react'
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import LockIcon from '@mui/icons-material/Lock';
import Btn from '../../utils/components/Btn';
import apiClass from '../../utils/data/api';
import Spinner from '../../utils/components/Spinner';
import Cookies from 'js-cookie';
import { ContextData } from '../../context/Context';
import { Form, InputWrapper, InputIcon, Title } from '../../styles/globalStyles';

const api = new apiClass()

export default function ResetPassword() {
    const { admin } = useContext(ContextData)
    const {
        resetingAdminPassword,
        setResetingAdminPassword
    } = admin.passwordReset

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [cPassword, setCPassword] = useState("");

    // submit form
    const submit = async (e) => {
        e.preventDefault();

        setResetingAdminPassword(true)
        const data_ = { currentPassword, newPassword, cPassword }

        if (!Cookies.get('accesstoken')) {
            // refresh token
            api.refreshToken()

            setTimeout(() => {
                api.adminResetPassword(data_, setCurrentPassword, setNewPassword, setCPassword, setResetingAdminPassword)
            }, 500)
        }
        else {
            api.adminResetPassword(data_, setCurrentPassword, setNewPassword, setCPassword, setResetingAdminPassword)
        }
    }

    return (

        <Form onSubmit={submit}>
            <div>
                <h4 style={{ textAlign: 'center', marginBottom: '10px', fontWeight: '600', color: 'var(--blue-deep)' }}>RESET ADMIN PASSWORD</h4>
                <InputWrapper>
                    <InputIcon right="" left="0">
                        <LockIcon className='icon' />
                    </InputIcon>
                    <input
                        type={showCurrentPassword ? "text" : "password"}
                        value={currentPassword || ''}
                        placeholder="Current Password"
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
                        placeholder="New Password"
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
                        type={showConfirmPassword ? "text" : "password"}
                        value={cPassword || ''}
                        placeholder="Conform Password"
                        onInput={(e) => setCPassword(e.target.value)}
                    />
                    <InputIcon onClick={() => setShowConfirmPassword(!showConfirmPassword)} right="0" left="">
                        {showConfirmPassword ? <VisibilityOffRoundedIcon className='icon' /> : <RemoveRedEyeRoundedIcon className='icon' />}
                    </InputIcon>
                </InputWrapper>

                <InputWrapper>
                    <Btn
                        style={{ width: '100%' }}
                        disabled={resetingAdminPassword}
                        color="var(--blue)">
                        {resetingAdminPassword ? <Spinner size="sm" /> : "Reset"}
                    </Btn>
                </InputWrapper>
            </div>
        </Form>
    )
}
