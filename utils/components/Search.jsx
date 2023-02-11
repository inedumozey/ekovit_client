import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search';

export default function Search({ onSearch, placeholder, minimizeAt = "600px" }) {
    const [showSearch, setShowSearch] = useState(false)
    const [inp, setInp] = useState('');

    const handleChange = () => {
        onSearch(inp)
    }

    useEffect(() => {
        handleChange()
    }, [inp])



    return (
        <Wrapper minimizeAt={minimizeAt} showSearch={showSearch}>
            <div className='search'>
                <SearchIcon onClick={() => { setShowSearch(!showSearch); setInp("") }} style={{ fontSize: '2rem' }} />
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
        z-index: 2;
        position: absolute;
        right 0px;
        

        @media (max-width: ${({ minimizeAt }) => minimizeAt}){
            width: ${({ showSearch }) => showSearch ? '100%' : '25px'};
            border: 1px solid ${({ showSearch }) => showSearch ? '#ccc' : 'transparent'};
            background: ${({ showSearch, theme }) => showSearch ? theme.bg : 'transparent'};
        }
    }

    input {
        height: 100%;
        width: 100%;
        padding: 0 10px 0 0;
        display: inline-block;
        font-size: 1rem;
        background: ${({ theme }) => theme.bg};
        border: none;
        color: inherit;
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