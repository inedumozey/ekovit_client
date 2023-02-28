import styled from 'styled-components'


export default function SideBarLayou({ children, toggleState, toggle, isExpanded }) {

    return (
        <Wrapper isExpanded={isExpanded}>
            <div className="main">
                {children}
            </div>
            <div className="footer">
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100%;
    height: 100%;

    .header {
        height: 63px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        box-shadow: -1px -1px 7px 4px rgb(0 0 0 / 82%);
    }

    .main {
        height: calc(100% - 63px);
    }

    .footer {
        height: 63px;
        position: relative;

        .themeBtn {
            display: flex;
            padding-left: 10px;
        }
    }
`