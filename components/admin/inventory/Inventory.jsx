import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components'
import { ContextData } from '../../../contextApi/ContextApi';
import apiClass from '../../../utils/data/api';
import { useSnap } from '@mozeyinedu/hooks-lab'
import FetchError from '../../../utils/components/FetchError';
import Spinner from '../../../utils/components/Spinner';
import { useRouter } from 'next/router';
import { Animate } from '../../../styles/globalStyles';
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
    const { access, product, addToCart, removeFromCart } = useContext(ContextData);
    const [ready, setReady] = useState(false)
    const [fetch, setFetch] = useState(false)

    const homePage = !router.pathname.includes('admin/inventory')

    const { hasAccess, isLoggedin } = access

    const {
        fetchingProduct,
        setFetchingProduct,
        fetchingProductSuccess,
        setFetchingProductSuccess,
        productData,
        setProductData,

        deletingProduct,
        setDeletingProduct,
        selectedProduct,
        setSelectedProduct,
        updatingProduct,
        setUpdatingProduct,
        openProductAction,
        setOpenProductAction,
    } = product


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
        }, 500)
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

                                <div className="title">
                                    <h1 className='data-title'>
                                        {productData.category?.toUpperCase()}
                                    </h1>

                                    {
                                        homePage ?
                                            <div className="cart"
                                                onClick={isLoggedin ? () => handleAddToCart(productData._id) : () => router.push('/auth')}
                                                style={{ color: 'rgb(253 71 12)' }}
                                                {...snap()}
                                            >
                                                Add to Cart
                                            </div> :
                                            <div onClick={(e) => { setSelectedProduct(productData); setOpenProductAction(!openProductAction) }} className="actions">
                                                000
                                            </div>
                                    }
                                    {
                                        !homePage ?
                                            <div style={{ textAlign: 'center' }}>Exp Date: {productData.expiry_date}</div> : ''
                                    }
                                    <div className="img">
                                        <Image src={"https://res.cloudinary.com/drmo/image/upload/v1676757806/EKOVIT/drugs/1553454-1676757792467.jpg"} width="400" height="200" alt="" />
                                    </div>

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
                                </div>

                                <div className="body">
                                    {
                                        !homePage ?
                                            <>
                                                <div className='el'><span style={{ fontWeight: 'bold' }}>Purchased Price:</span> #{productData.purchased_price}</div>
                                                <div className='el'><span style={{ fontWeight: 'bold' }}>Quantity:</span> {productData.quantity}</div>
                                                <div className='el'><span style={{ fontWeight: 'bold' }}>wholesale Price:</span> #{productData.wholesale_price}</div>
                                                <div className='el'><span style={{ fontWeight: 'bold' }}>Retail Price:</span> #{productData.retaile_price}</div>
                                            </> : ''
                                    }
                                    <div className='el'><span style={{ fontWeight: 'bold' }}>Price:</span> #{productData.retaile_price}</div>
                                </div>
                                {/* {productData.createdAt && new Date(productData.createdAt).toLocaleString()} */}
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
    padding: 10px ${({ theme }) => theme.lg_padding};
    @media (max-width: ${({ theme }) => theme.md_screen}){
        padding: 10px ${({ theme }) => theme.md_padding};
    }
    @media (max-width: ${({ theme }) => theme.sm_screen}){
        padding: 10px ${({ theme }) => theme.sm_padding};
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
    color: var(--pri-darktheme);
    position: relative;
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
        min-height: 200px;
        position: relative;

        .cart {
            position: absolute;
            top: 0px;
            right: 0px;
            padding: 0 5px;
            display: flex;
            justify-content: center;
            user-select: none;
            align-items: center;
            cursor: pointer;
            height: 15px;
            border-radius: 7px;
        }

        .actions {
            position: absolute;
            top: 0px;
            right: 0px;
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
            color: var(--pri-darktheme);
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
    }

    .body {
        font-size: 1rem;
        margin-top: 10px;
        color: #ccc;
    }

`
