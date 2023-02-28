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
        <Wrapper>
            <div className="image">
                <img src={data?.product_image_url} width="400" height="200" alt="" />
                {
                    data.form ? <div className='form el'><span style={{ fontWeight: 'bold' }}></span>{data.form}</div> : ''
                }
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
                <div className='el'><span style={{ fontWeight: 'bold' }}>Purchased Price:</span> # {data.purchased_price}</div>
                <div className='el'><span style={{ fontWeight: 'bold' }}>Quantity:</span> {data.quantity}</div>
                <div className='el'><span style={{ fontWeight: 'bold' }}>Selling Price:</span> # {data.selling_price}</div>
                <div className='el'><span style={{ fontWeight: 'bold' }}>Market Price:</span> # {data.market_price}</div>
            </div>
            <div className="action" {...snap()}>
                <div onClick={(e) => { setSelectedProduct(data); setOpenProductAction(!openProductAction) }} className="actions">
                    <MoreHorizIcon />
                </div>
            </div>

            <div onClick={() => router.push(`/admin/inventory/${data._id}`)} className="overlay"></div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 160px;
    height: 250px;
    position: relative;
    margin: 10px 4px;
    user-select: none;
    cursor: pointer;
    background: ${({ theme }) => theme.card};
    transition: transform .09s;
    padding: 10px;

    .overlay{
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
        background: transparent;
        z-index: 2;
    }

    .image {
        width: 100%;
        height: 55%;
        position: relative;

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }

        .form {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            max-width: 60%;
            padding: 5px;
            cursor: default;
            z-index: 2;
            background: rgb(0 0 1 / 55%);
            color: #fff;
        }
    }
    .name {
        height: 14%;
        padding: 5px 0;
        line-height: .9rem;
    }
    .price {
        height: 30%;
        line-height: 1.1rem;
        padding: 5px 0 10px 0;
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
        z-index: 3;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        height: 10px;
        border-radius: 7px;
        color: #000;
        background: gold;
    }
`