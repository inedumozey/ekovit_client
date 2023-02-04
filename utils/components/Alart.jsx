import React, { useEffect, useState } from 'react'
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import { useSnap } from '@mozeyinedu/hooks-lab';

export default function Alart({ children, type = "success", hide = true, onHide }) {
    const { snap } = useSnap(.5);
    const [show, setShow] = useState(hide)

    useEffect(() => {
        if (!show) {
            onHide(false)
        }
    }, [show])

    return show ?
        <div style={{
            width: '100%',
            padding: '12px',
            position: 'relative',
            background: (function () {
                if (type === 'warning') {
                    return '#ffff0230'
                }
                else if (type === 'error') {
                    return '#fb6c6c4d'
                }
                else {
                    return '#4caf504d'
                }
            }()),
            fontSize: '.8rem',
            color: (function () {
                if (type === 'warning') {
                    return '#b1a411'
                }
                else if (type === 'error') {
                    return '#f51717'
                }
                else {
                    return '#8bc34a'
                }
            }()),
            borderRadius: '5px',
            border: (function () {
                if (type === 'warning') {
                    return '1px solid #b1a411'
                }
                else if (type === 'error') {
                    return '1px solid #ff0808a1'
                }
                else {
                    return '1px solid #8bc34a'
                }
            }()),
            display: 'flex',
            alignItems: 'center'


        }}>
            <div style={{
                color: (function () {
                    if (type === 'warning') {
                        return '#b1a411'
                    }
                    else if (type === 'error') {
                        return '#ff0808a1'
                    }
                    else {
                        return '#87d5b8d1'
                    }
                }()),
                padding: '2px',
                cursor: 'pointer',
                borderRadius: '50%',
                position: 'absolute',
                right: '2px',
                top: '2px',
                userSelect: 'none'
            }}
                {...snap()}
                onClick={() => setShow(!show)}
            >
                X
            </div>
            <div style={{ marginRight: '5px' }}>
                {(function () {
                    if (type === 'warning') {
                        return <ReportGmailerrorredIcon />
                    }
                    else if (type === 'error') {
                        return <ReportGmailerrorredIcon />
                    }
                    else {
                        return <ReportGmailerrorredIcon />
                    }
                }())}
            </div>
            <div>{children}</div>
        </div> : ''
}
