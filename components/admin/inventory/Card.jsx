import React, { useContext } from 'react';
import styled from 'styled-components'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useSnap } from '@mozeyinedu/hooks-lab'
import { useRouter } from 'next/router';
import ResolveClass from '../../../utils/resolveClass';
import { ContextData } from '../../../contextApi/ContextApi';

const resolve = new ResolveClass()

export default function Card({ data, openProductAction, setOpenProductAction, setSelectedProduct }) {
    const { snap } = useSnap(.5)
    const router = useRouter();
    return (
        <Wrapper
            onClick={() => router.push(`/admin/inventory/${data._id}`)}
        >
            <div className="image">
                <img src={data?.product_image_url} width="400" height="200" alt="" />
            </div>
            <div className="name">
                {
                    data.type?.toLowerCase() === 'drug' ?
                        <>
                            <div style={{ fontWeight: 'bold' }} className='el'>{data.generic_name}</div>
                            <div className='el'>{data.brand_name}</div>
                        </> :
                        <div className='el'>{data.product_name}</div>
                }
            </div>
            <div className="price">
                <div className='el'><span style={{ fontWeight: 'bold' }}>Purchased Price:</span> #{data.purchased_price}</div>
                <div className='el'><span style={{ fontWeight: 'bold' }}>Quantity:</span> {data.quantity}</div>
                <div className='el'><span style={{ fontWeight: 'bold' }}>Selling Price:</span> #{data.wholesale_price}</div>
                <div className='el'><span style={{ fontWeight: 'bold' }}>Market Price:</span> #{data.retaile_price}</div>
            </div>
            <div className="action" {...snap()}>
                <div onClick={(e) => { setSelectedProduct(data); setOpenProductAction(!openProductAction) }} className="actions">
                    <MoreHorizIcon />
                </div>
            </div>
            {
                data.form ? <div className='form el'><span style={{ fontWeight: 'bold' }}></span>{data.form}</div> : ''
            }
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 140px;
    height: 240px;
    position: relative;
    margin: 10px 2px;
    user-select: none;
    cursor: pointer;
    background: ${({ theme }) => theme.card};
    transition: transform .09s;

    .image {
        width: 100%;
        height: 55%;

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
    .name {
        height: 18%;
        padding: 5px;
        line-height: .9rem;
    }
    .price {
        height: 27%;
        line-height: 1.1rem;
        padding: 5px 5px 10px 5px;
    };

    &:hover {
        opacity: .9;
        transform: scale(1.02);
    }

    .action {
        position: absolute;
        right: 2px;
        top: 3px;
        padding: 6px 2px 0 2px;
        cursor: default;
        width: 25px;
        display: flex;
        z-index: 2;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        height: 10px;
        border-radius: 7px;
        color: #000;
        background: gold;
    }

    .form {
        position: absolute;
        left: 2px;
        top: 3px;
        max-width: 70%;
        padding: 5px;
        cursor: default;
        display: flex;
        z-index: 2;
        background: ${({ theme }) => theme.card};
    }
`