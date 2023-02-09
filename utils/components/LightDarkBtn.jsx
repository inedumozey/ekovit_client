import React from 'react'
import styled from 'styled-components'
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

export default function LightDarkBtn({ toggleState, toggle }) {

  return (
    <ToggleBtn toggleState={toggleState} onClick={toggle}>
      {
        toggleState ? <DarkModeIcon className='icon' /> : <LightModeIcon className='icon' />
      }

    </ToggleBtn>
  )
}

const ToggleBtn = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 5px;

  .icon {
    color: ${({ theme }) => theme.light_dark_btn_color}
  }
`
