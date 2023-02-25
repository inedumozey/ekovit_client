import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components'
import { ContextData } from '../../../contextApi/ContextApi';
import apiClass from '../../../utils/data/api';
import { useSnap } from '@mozeyinedu/hooks-lab'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import FetchError from '../../../utils/components/FetchError';
import Spinner from '../../../utils/components/Spinner';
import { useRouter } from 'next/router';
import { Animate } from '../../../styles/globalStyles';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Image from 'next/image'
import ResolveClass from '../../../utils/resolveClass';
import Modal from '../../../utils/components/Modal';
import Actions from './Actions';

const api = new apiClass()
const resolve = new ResolveClass()

export default function Inventory() {
    const { snap } = useSnap(.5)
    const router = useRouter();
    const { id } = router.query
    const { access, product, carts } = useContext(ContextData);
    const [ready, setReady] = useState(false)
    const [fetch, setFetch] = useState(false)

    const {
        addToCart,
        cart,
        removeFromCart
    } = carts

    const homePage = !router.pathname.includes('admin/inventory')

    const { hasAccess, isLoggedin } = access

    const {
        fetchingProduct,
        setFetchingProduct,
        fetchingProductSuccess,
        setFetchingProductSuccess,
        productData,
        setProductData,
        selectedProduct,
        setSelectedProduct,
        setUpdatingProduct,
        openProductAction,
        setOpenProductAction,
    } = product

    useEffect(() => {
        setSelectedProduct('');
        setUpdatingProduct(false);
        setOpenProductAction(false)
    }, [])


    useEffect(() => {
        if (fetch) {
            if (!hasAccess) {
                api.refreshToken()
                setTimeout(() => {
                    api.fetchProduct(setFetchingProduct, setFetchingProductSuccess, setProductData, id, true)
                }, 1000)
            }
            else {
                api.fetchProduct(setFetchingProduct, setFetchingProductSuccess, setProductData, id, true)
            }
        }
    }, [ready])

    useEffect(() => {
        setTimeout(() => {
            setFetch(true)
        }, 500);
    }, [])

    useEffect(() => {
        if (fetch) {
            setTimeout(() => {
                setReady(true)
            }, 500)
        }
    }, [fetch])

    const handleAddToCart = (id) => {
        addToCart(id)
    }

    const handleRemoveFromCart = (id) => {
        removeFromCart(id)
    }

    return (
        <Wrapper>

            {
                !ready || fetchingProduct ? <div><Spinner type='dots' /></div> :
                    !fetchingProductSuccess ? <FetchError style={{ padding: '10px 0' }} /> :
                        <Animate>
                            <Card>
                                <h1 className='data-title'>
                                    {productData.category?.toUpperCase()}
                                </h1>
                                {
                                    homePage ?
                                        <div className="cart"
                                            onClick={isLoggedin ? () => { cart.includes(productData._id) ? handleRemoveFromCart(productData._id) : handleAddToCart(productData._id) } : () => router.push('/auth')}
                                            style={{ color: 'rgb(253 71 12)' }}
                                            {...snap()}
                                        >
                                            {
                                                cart.includes(productData._id) ?
                                                    <RemoveShoppingCartIcon title="Remove from Cart" style={{ color: 'rgb(253 71 12)' }} /> : <AddShoppingCartIcon className='add-to-cart' title="Add to Cart" />
                                            }
                                        </div> :
                                        <div onClick={(e) => { setSelectedProduct(productData); setOpenProductAction(!openProductAction) }} className="actions">
                                            <MoreHorizIcon />
                                        </div>
                                }
                                {
                                    !homePage ?
                                        (productData.expiry_date ? <div style={{ textAlign: 'center' }}>Exp Date: {productData.expiry_date}</div> : '') : ''
                                }
                                {
                                    productData.product_image_url ?
                                        <div className="img">
                                            <img src={productData?.product_image_url} width="400" height="200" alt="" />
                                        </div> : ''
                                }

                                <div className="category-wrapper">
                                    {
                                        productData.type?.toLowerCase() === 'drugs' ?
                                            <>
                                                <div ><span style={{ fontWeight: 'bold' }}>Generic Name:</span> {productData.generic_name}</div>

                                                <div ><span style={{ fontWeight: 'bold' }}>Brand Name:</span> {productData.brand_name}</div>

                                                <div ><span style={{ fontWeight: 'bold' }}>Form:</span> {productData.form}</div>
                                            </> :
                                            <>
                                                <div className='el'>{productData.product_name ? `Product Name: ${productData.product_name}` : ''}</div>
                                            </>
                                    }
                                </div>

                                <div className="body">
                                    <div className="meta-data">
                                        {
                                            !homePage ?
                                                <>
                                                    <div className='el'><span style={{ fontWeight: 'bold' }}>Purchased Price:</span> #{productData.purchased_price}</div>
                                                    <div className='el'><span style={{ fontWeight: 'bold' }}>Quantity:</span> {productData.quantity}</div>
                                                    <div className='el'><span style={{ fontWeight: 'bold' }}>wholesale Price:</span> #{productData.wholesale_price}</div>

                                                    <div className='el'><span style={{ fontWeight: 'bold' }}>Retail Price:</span> #{productData.retaile_price}</div>
                                                </> : <div className='el'><span style={{ fontWeight: 'bold' }}>Price:</span> #{productData.retaile_price}</div>
                                        }
                                    </div>
                                    <br />
                                    <div>
                                        {productData.other_details}
                                    </div>
                                </div>
                            </Card>
                        </Animate>
            }

            <Modal
                show={openProductAction}
                setShow={setOpenProductAction}
                title={selectedProduct.category?.toUpperCase()}
            >
                <Actions />
            </Modal>
        </Wrapper>
    )
}


const Wrapper = styled.div`
    padding: 30px ${({ theme }) => theme.lg_padding};
    @media (max-width: ${({ theme }) => theme.md_screen}){
        padding: 30px ${({ theme }) => theme.md_padding};
    }
    @media (max-width: ${({ theme }) => theme.sm_screen}){
        padding: 30px ${({ theme }) => theme.sm_padding};
    }    
`

const Card = styled.div`
    width: 100%;
    max-width: 700px;
    min-height: 200px;
    margin: auto;
    line-height: 2rem;
    border-radius: 5px;
    background: ${({ theme }) => theme.card};
    position: relative;
    padding: 10px;

    &:before {
        content: '';
        position: absolute;
        left: -15px;
        top: 20px;
        border-left: 8px solid transparent;
        border-right: 8px solid ${({ theme }) => theme.card};
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
    };
    
    .cart {
        position: absolute;
        top: 10px;
        right: 10px;
        padding: 0 5px;
        display: flex;
        justify-content: center;
        user-select: none;
        align-items: center;
        cursor: pointer;
        height: 15px;
        border-radius: 7px;

        .add-to-cart {
            color:  ${({ theme }) => theme.pri};
        }
    }

    .actions {
        position: absolute;
        top: 10px;
        right: 10px;
        padding: 0 5px;
        display: flex;
        justify-content: center;
        user-select: none;
        align-items: center;
        cursor: pointer;
        height: 15px;
        border-radius: 7px;
        border: 1px solid ${({ theme }) => theme.border};
    }

    .data-title {
        color: ${({ theme }) => theme.title};
        text-align: center;
        padding: 10px;
    }

    .img {
        width: 100%;
        margin: 5px 0;


        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            
        }
    }

    .category-wrapper {
        width: calc(100% - 50px);
        height: 100%;
        font-size: 1rem;
    }

    .body {
        font-size: 1rem;
        margin-top: 10px;

        .meta-data {
            color: ${({ theme }) => theme.title};
        }
    }

`
