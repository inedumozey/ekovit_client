import React, { useState } from 'react';
import { useRouter } from "next/router";
import styled from 'styled-components';
import LockIcon from '@mui/icons-material/Lock';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import Btn from '../../utils/components/Btn';
import axios from 'axios'
import Spinner from '../../utils/components/Spinner';
import Alart from '../../utils/components/Alart';
import apiClass from '../../utils/data/api';
import { Form, InputWrapper, InputIcon, Title } from '../../styles/globalStyles';

const api = new apiClass()
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export default function VerifyForgotPassword() {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);
    const [sending, setSending] = useState(false);
    const [msg, setMsg] = useState({ msg: '', status: false });

    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");

    const { token } = router.query;

    // submit form
    const submit = async (e) => {
        e.preventDefault();

        setSending(true)
        const data_ = { cPassword, password }

        try {
            const { data } = await axios.put(`${BASE_URL}/auth/verify-forgot-password/?token=${token}`, { ...data_ });

            setSending(false);

            setMsg({ msg: data.msg, status: true })

            api.setCookies(data.accesstoken, data.refreshtoken)

            setSending(false);

            // redirect
            setTimeout(() => {
                router.push('/pos')
            }, 2000)

            // clear input
            setPassword("")
            setCPassword("")
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
                        <Title>RESET YOUR PASSWORD</Title>
                    </h2>
                    {
                        msg.msg ?
                            <div style={{ margin: '25px 0' }}>
                                <Alart onHide={setMsg} type={msg.status ? 'success' : 'error'}>{msg.msg}</Alart>
                            </div> : ''
                    }
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
                            color="var(--blue)"
                        >
                            {sending ? <Spinner size="sm" /> : "Reset Password"}
                        </Btn>
                    </InputWrapper>
                </div>
            </Form>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    margin-top: 100px;
`