import ScrollToTop from "react-scroll-to-top";
import NextProgress from 'nextjs-progressbar';
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useToggle } from '@mozeyinedu/hooks-lab'
import { ContextApi } from "../contextApi/ContextApi";
import { ThemeProvider } from 'styled-components'
import Cookies from 'js-cookie';
import { useState, useEffect } from "react";
import { GlobalStyle } from "../styles/globalStyles";

function MyApp({ Component, pageProps }) {
  const { toggle, toggleState } = useToggle()
  const router = useRouter()
  const [loggedin, setLoggedin] = useState(false)

  useEffect(() => {
    Cookies.get('refreshtoken') ? setLoggedin(true) : setLoggedin(false)
  }, [])
  const theme = {
    sm_screen: '600px',
    md_screen: '900px',
    lg_screen: '1000px',
    xl_screen: '1500px',

    pri: toggleState ? '#000;' : '#ccc',
    title: toggleState ? '#5d7c89' : '#c9b168',
    subtitle: toggleState ? '' : '',
    bg: toggleState ? '#607d8b36' : 'linear-gradient(#20201f,#20201f,#101010, #101010, #20201f,#20201f)',
    border: '#acada7',

    lg_padding: '60px',
    md_padding: '25px',
    sm_padding: '15px',

    transition: '.4s',
    opacity: '.5',

    card: {
      shadow: '1px 1px 17px 1px rgb(0 0 0 / 10%), -1px -1px 17px 1px rgb(0 0 0 / 10%)',
      hover: {
        bg: '#f7f6f6',
        shadow: '3px 4px 3px 0px rgb(0 0 0 / 18%), -1px -1px 17px 1px rgb(0 0 0 / 10%)'
      }
    }
  }

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
        />
        <title>EKOVITE</title>
      </Head>
      <GlobalStyle />
      <ScrollToTop smooth color="var(--major-color-purest)" style={{ background: 'rgba(0,0,0,.2)' }} />

      <NextProgress options={{ showSpinner: false }} />
      <ThemeProvider theme={theme}>

        <ContextApi>
          <div onClick={toggle} style={{ cursor: 'pointer', zIndex: 1000000, position: 'fixed', top: '10px', right: '10px' }}>theme</div>
          {
            loggedin ?
              <span style={{ border: '2px solid #666', display: 'inline-block', padding: '20px' }}>
                <div onClick={() => { Cookies.remove('refreshtoken'); Cookies.remove('accesstoken'); router.push('/auth') }} style={{ cursor: 'pointer' }}>Logout</div>
                <div onClick={() => router.push('/auth/reset-password')} style={{ cursor: 'pointer' }}>Reset Password</div>
              </span> : ''
          }
          <Component {...pageProps} />
        </ContextApi>
      </ThemeProvider>

    </>
  )
}

export default MyApp
