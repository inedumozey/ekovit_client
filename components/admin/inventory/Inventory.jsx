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
        if (ready) {
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
    console.log(productData)

    return (
        <Wrapper>

            {
                !ready || fetchingProduct ? <div><Spinner type='dots' /></div> :
                    !fetchingProductSuccess ? <FetchError style={{ padding: '10px 0' }} /> :
                        <>
                            <Animate>
                                <CardStyle>
                                    <div className="image">
                                        <img src={productData?.product_image_url} width="400" height="200" alt="" />
                                    </div>
                                    <div className="name">
                                        {
                                            productData.type?.toLowerCase() === 'drug' ?
                                                <>
                                                    <div style={{ fontWeight: 'bold' }}>{productData.generic_name}</div>
                                                    <div>{productData.brand_name}</div>
                                                    <div>{productData.form}</div>
                                                </> :
                                                <div>{productData.product_name}</div>
                                        }
                                    </div>
                                    <div className="price">
                                        <div><span style={{ fontWeight: 'bold' }}>Purchased Price:</span> # {productData.purchased_price}</div>
                                        <div><span style={{ fontWeight: 'bold' }}>Quantity:</span> {productData.quantity}</div>
                                        <div><span style={{ fontWeight: 'bold' }}>Market Price:</span> # {productData.market_price}</div>
                                        <div><span style={{ fontWeight: 'bold' }}>Selling Price:</span> # {productData.selling_price}</div>
                                    </div>
                                    <div className="action" {...snap()}>
                                        <div onClick={(e) => { setSelectedProduct(productData); setOpenProductAction(!openProductAction) }} className="actions">
                                            <MoreHorizIcon />
                                        </div>
                                    </div>
                                </CardStyle>
                            </Animate>
                            <Animate>
                                <div>Product Details</div>
                                <CardStyle>
                                    {productData.other_details}
                                </CardStyle>
                            </Animate>
                        </>
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

const CardStyle = styled.div`
    width: 100%;
    max-width: 600px;
    min-height: 320px;
    position: relative;
    margin: 10px auto;
    user-select: none;
    background: ${({ theme }) => theme.card};
    transition: transform .09s;
    font-size: 1rem;
    line-height: 1.5rem;   
    padding: 10px; 

    .image {
        width: 100%;
        height: 300px;

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
    .name {
        padding: 10px 0;
    }
    .price {
        padding: 10px 0;
    };

    .detail {
        padding: 10px 0;
        color: #ccc;
    };

    .action {
        position: absolute;
        right: 2px;
        top: 3px;
        padding: 8px 2px 0 2px;
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
        top: 10px;
        max-width: 70%;
        padding: 5px;
        cursor: default;
        display: flex;
        z-index: 2;
        background: ${({ theme }) => theme.card};
    }
`

