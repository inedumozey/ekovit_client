import styled from 'styled-components';
import { useSnap } from '@mozeyinedu/hooks-lab';


export default function Btn({
    children,
    onClick,
    bg = "#0086d4",
    disabled = false,
    style,
    focus = true
}) {
    const { snap } = useSnap(.5);

    return (
        <Wrapper
            style={{ ...style }}
            disabled={disabled}
            className="btn"
            onClick={onClick}
            // {...snap()}
            bg={bg}
            focus={focus}
        >
            {children}
        </Wrapper>
    )
}

const Wrapper = styled.button`
    background: ${({ theme }) => theme.bg};
    border:  ${({ theme }) => `1px solid ${theme.border}`};
    color: #888;
    font-size: 15px;
    font-weight: 700;
    border-radius: 3px;
    outline: none;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding: 12px 30px;

    &:disabled {
        background: var(--blue-faint);
    }

    &:hover{
        opacity: .8;
    }

    &:focus {
        outline: none;
        opacity: 1;
        border: ${({ focus, theme }) => focus ? `2px solid ${theme.title}` : ''};
    }
`