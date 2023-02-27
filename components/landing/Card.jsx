import React, { useContext } from 'react';
import styled from 'styled-components'
import { ContextData } from '../../contextApi/ContextApi';
import { useSnap } from '@mozeyinedu/hooks-lab'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { useRouter } from 'next/router';
import ResolveClass from '../../utils/resolveClass';

const resolve = new ResolveClass()

export default function Card({ data, openProductAction, setOpenProductAction, setSelectedProduct, selectedProduct }) {
    const { snap } = useSnap(.5)
    const { carts, access } = useContext(ContextData);
    const router = useRouter();

    const {
        addToCart,
        cart,
        removeFromCart
    } = carts

    const handleAddToCart = (id) => {
        addToCart(id)
    }

    const handleRemoveFromCart = (id) => {
        removeFromCart(id)
    }

    return (
        <Wrapper
            onClick={() => router.push(`/${data._id}`)}
        >
            <div className="img">
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
                {
                    data.wholesale_price < data.retaile_price ?
                        <div>
                            <div># {data.wholesale_price}</div>
                            <small style={{ fontSize: '.85rem', textDecoration: 'line-through', fontWeight: 400, color: '#c30' }} className="strike"># {data.retaile_price}</small>
                        </div> :
                        <div># {data.retaile_price}</div>
                }
            </div>
            <div className="action"
                onClick={() => cart.includes(data._id) ? handleRemoveFromCart(data._id) : handleAddToCart(data._id)}
                {...snap()}
                title={cart.includes(data._id) ? "Remove from cart" : "Add to cart"}
            >
                {
                    cart.includes(data._id) ?
                        <RemoveShoppingCartIcon
                            style={{ color: 'rgb(253 71 12)', fontSize: '1.2rem' }}
                        /> :
                        <AddShoppingCartIcon
                            style={{ fontSize: '1.2rem', color: '#000' }}
                        />
                }

            </div>
            {
                data.form ? <div className='form el'><span style={{ fontWeight: 'bold' }}></span> {data.form}</div> : ''
            }

        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 160px;
    height: 220px;
    position: relative;
    margin: 10px 4px;
    user-select: none;
    cursor: pointer;
    background: ${({ theme }) => theme.card};
    transition: transform .09s;

    .img {
        width: 100%;
        height: 65%;

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
        height: 17%;
        font-weight: bold;
        text-align: center;
        font-size: 1rem;
        line-height: .9rem;
        padding: 5px 5px 10px 5px;
    };

    &:hover {
        opacity: .9;
        transform: scale(1.02);
    }

    .action {
        position: absolute;
        right: 0;
        top: 0;
        padding: 2px 2px 0 2px;
        cursor: default;
        background: gold;
        z-index: 2;
    }

    .form {
        position: absolute;
        left: 2px;
        top: 3px;
        padding: 5px;
        cursor: default;
        display: flex;
        z-index: 2;
        background: ${({ theme }) => theme.card};
    }
`