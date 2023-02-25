import styled from 'styled-components'
import UserLog from './UserLog';
import LightDarkBtn from '../../utils/components/LightDarkBtn';
import Logo from './Logo';
import Logout from './Logout';
import Carts from '../../utils/components/Carts';

const headerHeight = '100px'
const footerHeight = '100px'

export default function SideBarLayoutLanding({ children, toggleState, toggle }) {
    return (
        <Wrapper>
            <div className="header">
                <UserLog toggleState={toggleState} toggle={toggle} />
            </div>
            <div className="main">
                {children}
            </div>
            <div className="footer">
                <div className='carts'><Carts /></div>
                <div className="themeBtn">
                    <LightDarkBtn toggleState={toggleState} toggle={toggle} />
                    <Logout />
                </div>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.bg};

    .header {
        height: ${headerHeight};
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        box-shadow: -1px -1px 7px 4px rgb(0 0 0 / 82%);
    }

    .carts {
        padding: 10px 0;

        @media (min-width: ${({ theme }) => theme.sm_screen}){
            display: none
        };
    }

    .main {
        height: calc(100% - ${headerHeight} - ${footerHeight});
    }

    .footer {
        height: ${footerHeight};
        position: relative;
        padding: 0px ${({ theme }) => theme.lg_padding};
        @media (max-width: ${({ theme }) => theme.md_screen}){
            padding: 0px ${({ theme }) => theme.md_padding};
        }
        @media (max-width: ${({ theme }) => theme.sm_screen}){
            padding: 0px ${({ theme }) => theme.sm_padding};
        }

        .themeBtn {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
`