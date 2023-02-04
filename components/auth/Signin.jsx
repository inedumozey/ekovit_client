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

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export default function Signin() {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false);
    const [sending, setSending] = useState(false);
    const [msg, setMsg] = useState({ msg: '', status: false });

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // submit form
    const submit = async (e) => {
        e.preventDefault();

        setSending(true)
        const data_ = { email, password, }

        try {
            const { data } = await axios.post(`${BASE_URL}/auth/signin`, { ...data_ });

            setSending(false);

            setMsg({ msg: data.msg, status: true })

            api.setCookies(data.accesstoken, data.refreshtoken)

            // clear input
            setEmail("");
            setPassword("");

            // redirect
            setTimeout(() => {
                router.push('/pos')
            }, 2000)
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

        <Wrapper className="center">
            <Form onSubmit={submit}>
                <div>
                    <h2 className='title' style={{ textAlign: 'center', marginBottom: '10px', fontWeight: '600' }}>
                        <Title>SIGN IN</Title>
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
                            placeholder="Email/Username"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </InputWrapper>

                    <InputWrapper>
                        <InputIcon right="" left="0">
                            <LockIcon className='icon' />
                        </InputIcon>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password || ''}
                            placeholder="Password"
                            onInput={(e) => setPassword(e.target.value)}
                        />
                        <InputIcon onClick={() => setShowPassword(!showPassword)} right="0" left="">
                            {showPassword ? <VisibilityOffRoundedIcon className='icon' /> : <RemoveRedEyeRoundedIcon className='icon' />}
                        </InputIcon>
                    </InputWrapper>

                    <div style={{ padding: '0 0 5px 2px' }}>
                        <Link href='/auth/forgot-password' >Forgot Password</Link>
                    </div>

                    <InputWrapper>
                        <Btn
                            style={{ width: '100%' }}
                            disabled={sending}
                            color="var(--blue)">
                            {sending ? <Spinner size="sm" /> : "Sign In"}
                        </Btn>
                    </InputWrapper>

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>
                            Don&apos;t have an account? <Link href='/auth/signup' >Sign Up</Link>
                        </span>
                    </div>
                </div>
            </Form>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
`