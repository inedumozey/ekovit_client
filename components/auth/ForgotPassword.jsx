import React, { useState } from 'react';
import Link from "next/link";
import styled from 'styled-components';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import Btn from '../../utils/components/Btn';
import axios from 'axios'
import Spinner from '../../utils/components/Spinner';
import Alart from '../../utils/components/Alart';
import apiClass from '../../utils/data/api';
import { Form, InputWrapper, InputIcon, Title } from '../../styles/globalStyles';

const api = new apiClass()

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export default function ForgotPassword() {
    const [sending, setSending] = useState(false);
    const [token, setToken] = useState('');
    const [msg, setMsg] = useState({ msg: '', status: false });

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
            setMsg({ msg: data.msg, status: true })

            // clear input
            setEmail("");
        }
        catch (err) {
            if (err.response) {
                setMsg({ msg: err.response.data.msg, status: false })
            }
            else {
                setMsg({ msg: err.message, status: false })
            }

            setSending(false);
        }
    }

    return (
        <Wrapper>
            <Form onSubmit={submit}>
                <div>
                    <h2 className='title' style={{ textAlign: 'center', marginBottom: '10px', fontWeight: '600' }}>
                        <Title>FORGOT PASSWORD</Title>
                    </h2>
                    {
                        msg.msg ?
                            <div style={{ margin: '25px 0' }}>
                                <Alart onHide={setMsg} type={msg.status ? 'success' : 'error'}>{msg.msg}</Alart>
                            </div> : ''
                    }
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

                    <div style={{ padding: '0 0 5px 2px' }}>
                        <Link href='/auth/' >Login</Link>
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
                        token ? <Link href={`/auth/verify-forgot-password/${token}`}>Click to Reset Password</Link> : ''
                    }
                </div>
            </Form>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
`