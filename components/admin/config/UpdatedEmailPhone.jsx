import CreatableSelect from 'react-select/creatable';
import Select from 'react-select'
import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components'
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import { ContextData } from '../../../contextApi/ContextApi';
import { Title } from '../../../styles/globalStyles';
import Btn from '../../../utils/components/Btn';
import ResolveClass from '../../../utils/resolveClass';
import Spinner from '../../../utils/components/Spinner';
import apiClass from '../../../utils/data/api';

const api = new apiClass()

const resolve = new ResolveClass()

export default function UpdatedEmailPhone({ initialState }) {
    const { access, config } = useContext(ContextData);
    const {
        setFetchingConfig,
        setUpdatingEmailPhone,
        updatingEmailPhone,
        setFetchingConfigSuccess,
        setConfigData,
    } = config

    const { hasAccess } = access

    const [inp, setInp] = useState({
        emails: initialState.emails,
        phones: initialState.phones
    });

    const submitForm = () => {
        if (!hasAccess) {
            api.refreshToken()
            setTimeout(() => {
                api.updateEmailPhone(setUpdatingEmailPhone, setFetchingConfig, setFetchingConfigSuccess, setConfigData), inp;
            }, 1000)
        }
        else {
            api.updateEmailPhone(setUpdatingEmailPhone, setFetchingConfig, setFetchingConfigSuccess, setConfigData, inp);
        }
    }

    const reactSelectStyles = {
        option: (styles, isFocused, isSelected) => ({
            ...styles,
            background: isFocused ? 'teal' : isSelected ? 'red' : undefined,
            // zIndex: 1
        })
    }
    return (
        <Wrapper>
            <InputWrapper>
                <label>
                    Email:
                </label>
                <CreatableSelect
                    isMulti
                    isClearable
                    styles={reactSelectStyles}
                    options={[]}
                    defaultValue={resolve.makeReactSelectOptions(inp.emails)}
                    onChange={(value => {
                        const option = value.map(value => value.value);
                        setInp({ ...inp, emails: option })
                    })}
                />
            </InputWrapper>

            <InputWrapper>
                <label>
                    Phone Contacts:
                </label>
                <CreatableSelect
                    isMulti
                    isClearable
                    styles={reactSelectStyles}
                    options={[]}
                    defaultValue={resolve.makeReactSelectOptions(inp.phones)}
                    onChange={(value => {
                        const option = value.map(value => value.value);
                        setInp({ ...inp, phones: option })
                    })}
                />
            </InputWrapper>

            <InputWrapper>
                <Btn
                    onClick={updatingEmailPhone ? () => { } : () => submitForm()}
                    style={{ width: '100%' }}
                    disabled={updatingEmailPhone}
                    color="var(--blue)">
                    {updatingEmailPhone ? <Spinner type="dots" /> : "Update"}
                </Btn>
            </InputWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.div``


const InputWrapper = styled.div`
    width: 100%;
    min-height: 45px;
    margin-bottom: 15px;    
    font-size: .8rem;

    .tag {
        color: #c30;
        font-size: .7rem;
    }
    
    input {
        padding: 8px 12px;
        height: 100%;
        width: 100%;
        border: 1px solid #ccc;
        display: block;
        font-size: .9rem;
        border-radius: 5px;

        &: focus{
            outline: none;
            border: 3px solid var(--blue);
        }
    } 
`