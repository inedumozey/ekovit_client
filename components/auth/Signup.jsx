import React, { useState, useEffect } from 'react';
import Link from "next/link";
import styled from 'styled-components';
import LockIcon from '@mui/icons-material/Lock';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import KeyIcon from '@mui/icons-material/Key';
import Btn from '../../utils/components/Btn';
import axios from 'axios'
import { useRouter } from "next/router";
import Spinner from '../../utils/components/Spinner';
import Alart from '../../utils/components/Alart';
import apiClass from '../../utils/data/api';
import { Form, InputWrapper, InputIcon, Title } from '../../styles/globalStyles';

const api = new apiClass()

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export default function Signup() {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false);
    const [showCpassword, setShowCpassword] = useState(false);
    const [sending, setSending] = useState(false);
    const [gettingCode, setGettingCode] = useState(false);
    const [token, setToken] = useState('');
    const [msg, setMsg] = useState({ msg: '', status: false });

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCpassword] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [showVerificationField, setShowVerificationField] = useState(false);

    // submit form
    const submit = async (e) => {
        e.preventDefault();

        setSending(true)
        const data_ = { verificationCode }

        try {
            const { data } = await axios.post(`${BASE_URL}/auth/signup`, { ...data_ });

            setSending(false);

            if (data.token) {
                setToken(data.token)
            }
            api.setCookies(data.accesstoken, data.refreshtoken, data.xxxxx1, data.xxxxx2, data.xxxxx3)

            setMsg({ msg: data.msg, status: true })

            // clear input
            setEmail("");
            setPassword("");
            setCpassword("");
            setVerificationCode("");
            setToken('')

            // redirect
            setTimeout(() => {
                router.push('/')
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
            setToken('')
        }
    }

    const getCode = async () => {
        setGettingCode(true)

        const data_ = { email, password, cPassword }

        try {

            const { data } = await axios.post(`${BASE_URL}/auth/get-code`, { ...data_ });

            setGettingCode(false);

            if (data.token) {
                setToken(data.token)
            }

            setMsg({ msg: data.msg, status: true })
        }
        catch (err) {
            if (err.response) {
                setMsg({ msg: err.response.data.msg, status: false })
            }
            else {
                setMsg({ msg: err.message, status: false })
            }

            setGettingCode(false);
            setToken('')
        }
    }

    useEffect(() => {
        email && password && cPassword ? setShowVerificationField(true) : setShowVerificationField(false)
    }, [email, password, cPassword])

    return (

        <Wrapper>
            <Form onSubmit={submit}>
                <div>
                    <h2 style={{ textAlign: 'center', marginBottom: '10px', fontWeight: '600', color: 'var(--blue)' }}>
                        <Title>SIGN UP</Title>
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

                    <InputWrapper>
                        <InputIcon right="" left="0">
                            <LockIcon className='icon' />
                        </InputIcon>
                        <input
                            type={showCpassword ? "text" : "password"}
                            value={cPassword || ''}
                            placeholder="Confirm Password"
                            onInput={(e) => setCpassword(e.target.value)}
                        />
                        <InputIcon onClick={() => setShowCpassword(!showCpassword)} right="0" left="">
                            {showCpassword ? <VisibilityOffRoundedIcon className='icon' /> : <RemoveRedEyeRoundedIcon className='icon' />}
                        </InputIcon>
                    </InputWrapper>

                    {
                        showVerificationField ?
                            <>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '2px 10px'
                                }}>
                                    {
                                        token ? <div>Verification Code: <span style={{ color: 'var(--blue-mid)' }}>{token}</span></div> : ''
                                    }
                                    <div>
                                        {
                                            gettingCode ? <Spinner size="sm" /> :
                                                <div
                                                    style={{ color: 'var(--blue-mid)', cursor: 'pointer' }}
                                                    onClick={getCode}
                                                >
                                                    Get Code
                                                </div>
                                        }

                                    </div>
                                </div>

                                <InputWrapper>
                                    <InputIcon right="" left="0">
                                        <KeyIcon className='icon' />
                                    </InputIcon>
                                    <input
                                        type="number"
                                        value={verificationCode || ''}
                                        placeholder="Verification Code"
                                        onInput={(e) => setVerificationCode(e.target.value)}
                                    />
                                </InputWrapper>
                            </> : ''

                    }

                    <InputWrapper>
                        <Btn
                            style={{ width: '100%' }}
                            disabled={sending}
                            color="var(--blue)">
                            {sending ? <Spinner size="sm" /> : "Sign Up"}
                        </Btn>
                    </InputWrapper>

                    <div style={{ textAlign: 'right' }}>
                        Have an account? <Link href='/auth' >Sign In</Link>
                    </div>

                    {/* <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        
                    </div> */}
                </div>
            </Form>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
`