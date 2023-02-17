import styled from 'styled-components'
import UserLog from './UserLog';
import LightDarkBtn from '../../utils/components/LightDarkBtn';
import Logo from './Logo';

const headerHeight = '100px'
const footerHeight = '100px'

export default function SideBarLayoutLanding({ children, toggleState, toggle }) {
    return (
        <Wrapper>
            <div className="header">
                <Logo />
            </div>
            <div className="main">
                {children}
            </div>
            <div className="footer">
                <div className="themeBtn">
                    <LightDarkBtn toggleState={toggleState} toggle={toggle} />
                    <UserLog toggleState={toggleState} toggle={toggle} />
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

    .main {
        height: calc(100% - ${headerHeight} - ${footerHeight});
    }

    .footer {
        height: ${footerHeight};
        position: relative;

        .themeBtn {
            display: flex;
            padding: 0 20px;
            justify-content: space-between;
            align-items: center;
        }
    }
`