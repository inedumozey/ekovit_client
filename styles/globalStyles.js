import { style } from "@mui/system";
import styled, { createGlobalStyle, css } from "styled-components";

const ScrollBar = () => css`
  &::-webkit-scrollbar-thumb {
    background-color: #e5e3e3;
    border-radius: 50px;
  }
  &::-webkit-scrollbar-track {
    background-color: #F0F4F5;
  }
  &::-webkit-scrollbar-corner {
    background-color: #00415D30;
  }
  &::-webkit-scrollbar {
    width: .7rem;
    height: .7rem;
  }
  & {
    -ms-overflow-style: auto;
    scrollbar-color:#00415D30;
    scrollbar-width: thin;
  }
`

const GlobalStyle = createGlobalStyle`
    *{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
      }
    
    body{
        transition: background .3s ease-in;
        position: relative;
        min-height: 100vh;
        min-height: auto;
        overflow-x: hidden;
        font-size: .8rem;
        

        .center {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0
        }
        input[type=number] {
          -moz-appearance: textfield;
        } 

        ${ScrollBar()}

        .swiper-button-next, .swiper-button-prev {
            color: var(--major-cclicked={clicked} index={index} isActive={isActive}olor-purest);
        };
    }
`

const Table = styled.div`
    width: 100%;
    // max-height: 63vh;
    overflow: auto;
    margin: 0px auto 10px auto;

    ${ScrollBar()}

    table{
        font-size: .7rem;
        margin: auto;
        border-spacing: 0.5rem;
        height: 100%;
        border-collapse: collapse;
        text-align: left;
        cursor: default;
        color: #000;
    }

    td, th {
        border: 1px solid #999;
        padding: 0.5rem;
        text-align: left;
        padding: 10px;
    }

    th{
        background: #00a5ef;
        color: #fff;
    }

    tr:nth-child(even) {

      &:hover {
        opacity: .7;
    }
  }

    tbody tr:hover {
        opacity: .5;
    }

`

const Form = styled.form`
    width: 100%;
    max-width: 450px;
    margin: auto;
    padding: 0 10px;

    .title {
        color: ${({ theme }) => theme.title}
    }
`
const InputWrapper = styled.div`
    width: 100%;
    height: 46px;
    margin-bottom: 15px;
    position: relative;
    
    input {
        border:  ${({ theme }) => `1px solid ${theme.border}`};
        padding: 12px 30px 12px 30px;
        height: 100%;
        width: 100%;
        border-radius: 3px;
        display: block;
        font-size: .9rem;
        background: transparent;
        color: ${({ theme }) => theme.pri};
        
        &: focus{
            outline: none;
            border: ${({ theme }) => `2px solid ${theme.title}`};
        }
    }
`

const InputIcon = styled.div`
    position: absolute;
    padding: 3px;
    width: 30px;
    z-index: 1;
    color: #555;
    bottom: 0;
    left: ${({ left }) => left};
    right: ${({ right }) => right};
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;


    .icon {
        color: var(--pri);
    }
`

const Title = styled.div`
  color: ${({ theme }) => theme.title};
`

export {
  GlobalStyle,
  ScrollBar,
  Table,
  Form,
  InputWrapper,
  InputIcon,
  Title,
};