import { useEffect } from 'react';
import styled from "styled-components";

export default function Modal({
    children,
    show,
    setShow,
    from = 'left',
    drawal = false,
    title,
    disappearDrawalOnResize = true,
    modalWidth = '95vw',
    modalMaxWidth = "800px",
    modalHeight = 'auto',
    modalSpeed = '.4s'
}) {

    const closeMenu = (e) => {
        if (e.target === e.currentTarget) {
            setShow(false)
        }

    }
    const closeMenu2 = (e) => {
        e.stopPropagation()
        setShow(false)
    }

    useEffect(() => {
        if (show) {
            // get the body and set overflow to hidden
            document.body.style.overflow = 'hidden'
        } else {
            // get the body and set overflow to auto
            document.body.style.overflow = 'auto'
        }

    }, [show])

    return (
        <Wrapper show={show} onClick={closeMenu} drawal={drawal} disappearDrawalOnResize={disappearDrawalOnResize}>
            {
                drawal ?
                    <Drawal show={show} from={from}>{children}</Drawal> :
                    <Modal_
                        show={show}
                        from={from}
                        modalWidth={modalWidth}
                        modalMaxWidth={modalMaxWidth}
                        modalHeight={modalHeight}
                        modalSpeed={modalSpeed}
                    >
                        <ToggleMenu onClick={closeMenu2}>
                            <CloseBtn></CloseBtn>
                        </ToggleMenu>

                        <Title>{title}</Title>
                        <Body>{children}</Body>

                    </Modal_>
            }
        </Wrapper>
    )
}

const Wrapper = styled.div`
    background: rgba(0,0,0,.6);
    z-index: 1000000000;
    transition: all .6s;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    opacity: ${({ show }) => show ? 1 : 0};
    visibility: ${({ show }) => show ? 'visible' : 'hidden'};

    @media (min-width: 920px){
      display: ${({ drawal, disappearDrawalOnResize }) => drawal ? (disappearDrawalOnResize ? 'none' : 'block') : 'block'};
    }
`
const Drawal = styled.div`
    transition: all .5s;
    transform: translate(${({ show, from }) => show ? 0 : (function () {
        if (from === 'left') return '-100%, 0'
        else if (from === 'right') return '100%, 0'
        else if (from === 'top') return '0, -100%'
        else if (from === 'bottom') return '0, 100%'
        else return '-100%, 0'
    }())});
    position: fixed;
    left: ${({ from }) => from === 'left' ? 0 : ''};
    right: ${({ from }) => from === 'right' ? 0 : ''};
    top: ${({ from }) => from === 'top' ? 0 : ''};
    bottom: ${({ from }) => from === 'bottom' ? 0 : ''};
    box-shadow: 1px 1px 20px 20px rgb(2 2 2 / 9%), -1px -1px 20px 20px rgb(2 2 2 / 9%);

    .content{
      transition: all .4s;
      opacity: ${({ show }) => show ? 1 : 0};
      visibility: ${({ show }) => show ? 'visible' : 'hidden'};
      width: 100%;
      height: 100%;
    }
`
const Modal_ = styled.div`
    background: #fff;
    transition: all ${({ modalSpeed }) => modalSpeed};
    left: 50%;
    bottom: ${({ show }) => show ? '50%' : '-100%'};
    transform: translate(${({ show }) => show ? '-50%, 50%' : '-50%, -50%'});
    position: absolute;
    width: ${({ modalWidth }) => modalWidth};
    max-width: ${({ modalMaxWidth }) => modalMaxWidth};
    box-shadow: 1px 1px 20px 20px rgb(2 2 2 / 9%), -1px -1px 20px 20px rgb(2 2 2 / 9%);
    padding: 20px 10px;
    height: ${({ modalHeight }) => modalHeight};

    .content {
    transition: all .4s;
    opacity: ${({ show }) => show ? 1 : 0};
    visibility: ${({ show }) => show ? 'visible' : 'hidden'};
    display: ${({ show }) => show ? 'block' : 'none'};
    width: 100 %;
    height: 100 %;
}
`
const Title = styled.h2`
    padding: 0px 2px;
    border-bottom: 1px solid rgba(0,0,0,.2);
    margin-bottom: 10px;
`
const Body = styled.div`
    padding: 0px 8px;
`
const ToggleMenu = styled.div`
    position: absolute;
    right: 0px;
    top: 0px;
    padding: 10px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
`
const CloseBtn = styled.div`
    width: 13px;
    position: absolute;
    transform: rotate(45deg);
    height: 2px;
    background: rgba(0,0,0,.2);

    &:before {
        content: '';
        width: 13px;
        position: absolute;
        transform: rotate(270deg);
        height: 2px;
        background: rgba(0,0,0,.2);
    }
`