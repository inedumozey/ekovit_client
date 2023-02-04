import React, { useState } from 'react';
import Link from "next/link";
import { useRouter } from "next/router";
import styled from 'styled-components';
import LockIcon from '@mui/icons-material/Lock';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import Btn from '../../utils/components/Btn';
import axios from 'axios'
import Spinner from '../../utils/components/Spinner';
import Alart from '../../utils/components/Alart';
import apiClass from '../../utils/data/api';
import { Form, InputWrapper, InputIcon, Title } from '../../styles/globalStyles';

const api = new apiClass()
const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

export default function VerifyForgotPassword() {
    const router = useRouter()

    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);
    const [sending, setSending] = useState(false);

    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");

    // submit form
    const submit = async (e) => {
        e.preventDefault();

        setSending(true)
        const data_ = { cPassword, password }

        try {
            const { data } = await axios.put(`${BASE_URL}/auth/verify-forgot-password/?token=${token}`, { ...data_ });

            // log the user in
            api.setCookies(data.accesstoken, data.refreshtoken)

            // redirect the user home after some time (at home, he will be redirected to dashboard if refreshtoken exist in cookies)
            setTimeout(() => {
                router.push('/admin')
            }, 1000)

            setSending(false);

            // clear input
            setPassword("")
            setCPassword("")
        }
        catch (err) {
            if (err.response) {
                toast(err.response.data.msg, { type: 'error' })
            }
            else {
                toast(err.message, { type: 'error' })
            }

            setSending(false)
        }
    }

    return (

        <Form onSubmit={submit}>
            <div>
                <h4 style={{ textAlign: 'center', marginBottom: '10px', fontWeight: '600', color: 'var(--blue-deep)' }}>RESET PASSWORD</h4>
                <InputWrapper>
                    <InputIcon right="" left="0">
                        <LockIcon className='icon' />
                    </InputIcon>
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password || ''}
                        placeholder="New Password"
                        onInput={(e) => setPassword(e.target.value)}
                    />
                    <InputIcon onClick={() => setShowPassword(!showPassword)} right="0" left="">
                        {showPassword ? <VisibilityOffRoundedIcon className='icon' /> : <RemoveRedEyeRoundedIcon className='icon' />}
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
                        style={{ width: '100%' }}
                        disabled={sending}
                        color="var(--blue)">
                        {sending ? <Spinner size="sm" /> : "Login"}
                    </Btn>
                </InputWrapper>
            </div>
        </Form>
    )
}
