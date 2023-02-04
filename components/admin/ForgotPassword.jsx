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

const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

export default function ForgotPassword() {
    const router = useRouter()
    const [sending, setSending] = useState(false);
    const [token, setToken] = useState('');

    const [email, setEmail] = useState("");

    // submit form
    const submit = async (e) => {
        e.preventDefault();

        setSending(true)
        const data_ = { email }

        try {
            const { data } = await axios.post(`${BASE_URL}/auth/forgot-password`, { ...data_ });

            setSending(false);

            if (data.token) {
                setToken(data.token)
            }

            console.log({ data })

            toast(data.msg, { type: 'success' })

            // clear input
            setEmail("");
        }
        catch (err) {
            console.log(err)
            if (err.response) {
                toast(err.response.data.msg, { type: 'error' })
            }
            else {
                toast(err.message, { type: 'error' })
            }

            setSending(false);
            setToken('')
        }
    }

    return (

        <Form onSubmit={submit}>
            <div>
                <h4 style={{ textAlign: 'center', marginBottom: '10px', fontWeight: '600', color: 'var(--blue-deep)' }}>FORGET PASSWORD</h4>
                <InputWrapper>
                    <InputIcon right="" left="0">
                        <EmailRoundedIcon className='icon' />
                    </InputIcon>
                    <input
                        autoFocus
                        type="text"
                        value={email || ''}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </InputWrapper>

                <div>
                    <Link to="/admin/signin">Login</Link>
                </div>

                <InputWrapper>
                    <Btn
                        style={{ width: '100%' }}
                        disabled={sending}
                        color="var(--blue)">
                        {sending ? <Spinner size="sm" /> : "Continue"}
                    </Btn>
                </InputWrapper>

                {
                    token ? <Link to={`/admin/verify-forgot-password/${token}`}>Click to Reset Password</Link> : ''
                }
            </div>
        </Form>
    )
}