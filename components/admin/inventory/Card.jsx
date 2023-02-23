import React, { useContext } from 'react';
import styled from 'styled-components'
import { ContextData } from '../../../contextApi/ContextApi';
import { useSnap } from '@mozeyinedu/hooks-lab'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Image from 'next/image'
import { useRouter } from 'next/router';
import ResolveClass from '../../../utils/resolveClass';

const resolve = new ResolveClass()

export default function Card({ data, openProductAction, setOpenProductAction, setSelectedProduct, selectedProduct }) {
    const { snap } = useSnap(.5)
    const { carts, access } = useContext(ContextData);
    const router = useRouter();
    const homePage = router.pathname === '/'
    const {
        addToCart,
        cart,
        removeFromCart
    } = carts

    const { isLoggedin } = access

    const handleAddToCart = (id) => {
        addToCart(id)
    }

    const handleRemoveFromCart = (id) => {
        removeFromCart(id)
    }

    return (
        <Wrapper>
            <div className="line">
                <div className="dot"></div>
                <div className="dot-tail"></div>
            </div>
            <div className="date">
                <h2 className='type'>{resolve.capitalize(data.type)}</h2>
                {
                    !homePage ?
                        <>
                            <div className='expiry-date'>
                                <div style={{ fontWeight: 'bold' }}>Exp Date</div>
                                <div>{data.expiry_date}</div>
                            </div>
                            <div className="action">
                                <div onClick={(e) => { setSelectedProduct(data); setOpenProductAction(!openProductAction) }} className="actions">
                                    <MoreHorizIcon />
                                </div>
                            </div>
                        </> :
                        <div className="action">
                            <div
                                style={{ marginTop: '50px', cursor: 'pointer' }}
                                onClick={isLoggedin ? () => { cart.includes(data._id) ? handleRemoveFromCart(data._id) : handleAddToCart(data._id) } : () => router.push('/auth')}
                                {...snap()}
                                title={"Add to cart"}
                            >
                                {
                                    cart.includes(data._id) ?
                                        <RemoveShoppingCartIcon style={{ color: 'rgb(253 71 12)' }} /> : <AddShoppingCartIcon className='cart' />
                                }

                            </div>
                        </div>
                }
            </div>
            <div className="container">
                <div
                    className="data"
                    onClick={homePage ? () => router.push(`/${data._id}`) : () => router.push(`/admin/inventory/${data._id}`)}
                >
                    <div className="title">
                        <div className="img">
                            <Image src={"https://res.cloudinary.com/drmo/image/upload/v1676757806/EKOVIT/drugs/1553454-1676757792467.jpg"} width="400" height="200" alt="" />
                        </div>
                        <div className="category-wrapper">
                            <h2 className='data-title el' style={{ fontWeight: 'bold', textAlign: 'center' }}>
                                {data.category?.toUpperCase()}
                            </h2>
                            {
                                data.type?.toLowerCase() === 'drugs' ?
                                    <>
                                        <div className='el'><span style={{ fontWeight: 'bold' }}>Generic Name:</span> {data.generic_name}</div>

                                        <div className='el'><span style={{ fontWeight: 'bold' }}>Brand Name:</span> {data.brand_name}</div>

                                        <div className='el'><span style={{ fontWeight: 'bold' }}>Form:</span> {data.form}</div>
                                    </> :
                                    <>
                                        <div className='el'>{data.product_name ? `Product Name: ${data.product_name}` : ''}</div>
                                    </>
                            }
                        </div>
                    </div>

                    <div className="body">
                        {
                            !homePage ?
                                <>
                                    <div className='el'><span style={{ fontWeight: 'bold' }}>Purchased Price:</span> #{data.purchased_price}</div>
                                    <div className='el'><span style={{ fontWeight: 'bold' }}>Quantity:</span> {data.quantity}</div>
                                </> : ''
                        }
                        <div className='el'><span style={{ fontWeight: 'bold' }}>wholesale Price:</span> #{data.wholesale_price}</div>
                        <div className='el'><span style={{ fontWeight: 'bold' }}>Retail Price:</span> #{data.retaile_price}</div>
                    </div>
                </div>
                {data.createdAt && new Date(data.createdAt).toLocaleString()}
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 250px;
    height: 200px;
    min-height: 250px;
    position: relative;
    margin: 0 30px;
    display: flex;
    align-items: center;
    flex-flow;
    user-select: none;

    @media (max-width: ${({ theme }) => theme.sm_screen}){
        margin: 0 5px;
    }
  
    .cartIcon{
        color: ${({ theme }) => theme.title};       
    }

    &:hover {
        .data {
            opacity: .7   
        }
    }

    .date {
        height: 100%;
        font-size: .6rem;
        cursor: default;

        .type {
            color: ${({ theme }) => theme.title};
        }
        .expiry-date {
            line-height: .8rem;
            margin: 40px 0;
        }

        .actions {
            width: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            height: 15px;
            border-radius: 7px;
            border: 1px solid ${({ theme }) => theme.border};
        }
    }

    .line {
        height: 100%;
        width: 18px;
        position: relative;

        .dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: ${({ theme }) => theme.title};
            position: absolute;
            top: 3px;
            left: 50%;
            transform: translateX(-50%);

            &:before {
                content: "";
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 17px;
                height: 17px;
                border-radius: 50%;
                background: ${({ theme }) => theme.title_faint};
            }
        }

        .dot-tail {
            width: 5px;
            height: calc(100% - 15px);
            background: ${({ theme }) => theme.title_faint};
            position: absolute;
            top: 16px;
            left: 50%;
            transform: translateX(-50%);
        }
    }

    .container {
        height: 100%;
        padding: 0 0 20px 10px;
        width: calc(100% - 45px - 18px);

        .data {
            height: 90%;
            width: 100%;
            border-radius: 5px;
            background: ${({ theme }) => theme.card};
            color: var(--pri-darktheme);
            position: relative;
            cursor: pointer;
            padding: 10px;

            &:before {
                content: '';
                position: absolute;
                left: -15px;
                top: 20px;
                border-left: 8px solid transparent;
                border-right: 8px solid ${({ theme }) => theme.card};
                color: var(--pri-darktheme);
                border-top: 8px solid transparent;
                border-bottom: 8px solid transparent;
            };

            .title {
                width: 100%;
                height: 70px;
                display: flex;
                align-items: center;
                justify-content: center;


                .img {
                    width: 50px;
            
                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: contain;
                        
                    }
                }

                .category-wrapper {
                    width: calc(100% - 50px);
                    height: 100%;
                    padding-left: 5px;
                    font-size: .65rem;

                    .data-title {
                        color: var(--pri-darktheme);
                    }
                }
            }

            .body {
                padding: 15px 10px;
            }
        }
    }
`
