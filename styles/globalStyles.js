import { style } from "@mui/system";
import styled, { createGlobalStyle, css } from "styled-components";

const pri_darktheme = "#ccc";
const pri_lighttheme = "#000";
const title_darktheme = "#ffc107";
const title_lighttheme = "#673ab7";
const subtitle_darktheme = "";
const subtitle_lighttheme = "";
const bg_darktheme = "linear-gradient(#20201f,#20201f,#101010, #101010, #20201f,#20201f)";
const bg_lighttheme = "#f5f5f5";
const theme_changer_btn_darktheme = "#fff";
const theme_changer_btn_lighttheme = "#000";
const border_darktheme = "#777";
const border_lighttheme = "#ccc";
const active_link_darktheme = "#fff";
const active_link_lighttheme = "#0c50e9";
const link_darktheme = "#9e9e9e";
const link_lighttheme = "#000";

const ScrollBar = () => css`
  &::-webkit-scrollbar-thumb {
    background-color: #333;
    border-radius: 50px;
  }
  &::-webkit-scrollbar-track {
    background-color: #555;
  }

  &::-webkit-scrollbar-corner {
    background-color: #555;
  }
  &::-webkit-scrollbar {
    width: .7rem;
    height: .6rem;
  }
  & {
    -ms-overflow-style: auto;
    scrollbar-color:#555;
    scrollbar-width: thin;
  }
`

const GlobalStyle = createGlobalStyle`
    :root{
      --pri-darktheme: ${pri_darktheme};
      --pri-lighttheme: ${pri_lighttheme};
      --title-darktheme: ${title_darktheme};
      --title-lighttheme: ${title_lighttheme};
      --subtitle-darktheme: ${subtitle_darktheme};
      --subtitle-lighttheme: ${subtitle_lighttheme};
      --bg-darktheme: ${bg_darktheme};
      --bg-lighttheme: ${bg_lighttheme};
      --theme-changer-btn-darktheme: ${theme_changer_btn_darktheme};
      --theme-changer-btn-lighttheme: ${theme_changer_btn_lighttheme};
      --border-darktheme: ${border_darktheme};
      --border-lighttheme: ${border_lighttheme};
      --active-link-darktheme: ${active_link_darktheme};
      --active-link-lighttheme: ${active_link_lighttheme};
      --link-darktheme: ${link_darktheme};
      --link-lighttheme: ${link_lighttheme};
    }

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

const ViewMore = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px;

    .more{
        user-select: none;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 90px;
        height: 30px;
        -webkit-user-select: none;
        font-size: .7rem;
        cursor: pointer;
        border: 1px solid;
        border-radius: 5px;

        &:hover{
            opacity: .3
        }
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
  ViewMore,
  Form,
  InputWrapper,
  InputIcon,
  Title,
};