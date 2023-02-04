import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search';

export default function Search({ onSearch, placeholder, minimizeAt = "600px" }) {
    const [showSearch, setShowSearch] = useState(false)
    const [inp, setInp] = useState('');

    const handleChange = () => {
        onSearch(inp)
        console.log(inp)
    }

    useEffect(() => {
        handleChange()
    }, [inp])



    return (
        <Wrapper minimizeAt={minimizeAt} showSearch={showSearch}>
            <div className='search'>
                <SearchIcon onClick={() => setShowSearch(!showSearch)} style={{ fontSize: '2rem' }} />
                <input
                    placeholder={placeholder}
                    value={inp || ''}
                    onChange={(e) => setInp(e.target.value)}
                />
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    .search {
        height: 40px;
        width: 40vw;
        transition: .3s;
        display: flex;
        align-items: center;
        border: 1px solid #Ccc;
        border-radius: 6px;
        background: #fff;
        z-index: 2;
        position: absolute;
        right 0px;
        top: 50%;
        transform: translateY(-50%);

        @media (max-width: ${({ minimizeAt }) => minimizeAt}){
            width: ${({ showSearch }) => showSearch ? '100%' : '25px'};
            border: 1px solid ${({ showSearch }) => showSearch ? '#ccc' : 'transparent'};
            background: ${({ showSearch }) => showSearch ? '#fff' : 'transparent'};
        }
    }

    input {
        height: 100%;
        width: 100%;
        padding: 0 10px 0 0;
        display: inline-block;
        font-size: 1rem;
        border: none;
        border-radius: 0 6px 6px 0;

        &: focus {
            outline: none;
        }

        @media (max-width: ${({ theme }) => theme.sm_screen}){
            display: ${({ showSearch }) => showSearch ? 'block' : 'none'};
        }
    }
`