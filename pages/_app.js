import ScrollToTop from "react-scroll-to-top";
import NextProgress from 'nextjs-progressbar';
import Head from 'next/head'
import { useToggle } from '@mozeyinedu/hooks-lab'
import { ContextApi } from "../contextApi/ContextApi";
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from "../styles/globalStyles";
import ToastContainer_ from "../utils/components/ToastContainer";


function MyApp({ Component, pageProps }) {
  const { toggle, toggleState } = useToggle()

  const theme = {
    sm_screen: '600px',
    md_screen: '900px',
    lg_screen: '1000px',
    xl_screen: '1500px',

    bg_image: toggleState ? 'url(/images/2b.png)' : 'url(/images/2a.png)',
    bg_image_aside: toggleState ? 'url(/images/4b.png)' : 'url(/images/4a.png)',
    bg_image_auth: toggleState ? 'url(/images/5a.png)' : 'url(/images/5b.png)',

    pri: toggleState ? 'var(--pri-lighttheme);' : 'var(--pri-darktheme)',
    title: toggleState ? 'var(--title-lighttheme)' : 'var(--title-darktheme)',
    subtitle: toggleState ? 'var(--subtitle-lighttheme)' : 'var(--subtitle-darktheme)',
    bg: toggleState ? 'var(--bg-lighttheme)' : 'var(--bg-darktheme)',
    light_dark_btn_color: toggleState ? 'var(--theme-changer-btn-lighttheme)' : 'var(--theme-changer-btn-darktheme)',
    border: toggleState ? "var(--border-lighttheme)" : 'var(--border-darktheme)',

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
        <title>EKOVIT</title>
      </Head>
      <GlobalStyle />
      <ScrollToTop smooth color="var(--major-color-purest)" style={{ background: 'rgba(0,0,0,.2)' }} />
      <ToastContainer_ />
      <NextProgress options={{ showSpinner: false }} />
      <ThemeProvider theme={theme}>

        <ContextApi toggle={toggle} toggleState={toggleState}>
          <Component {...pageProps} />
        </ContextApi>
      </ThemeProvider>

    </>
  )
}

export default MyApp