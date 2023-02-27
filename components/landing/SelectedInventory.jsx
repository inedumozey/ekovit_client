import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components'
import { ContextData } from '../../contextApi/ContextApi';
import apiClass from '../../utils/data/api';
import { useSnap } from '@mozeyinedu/hooks-lab'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import FetchError from '../../utils/components/FetchError';
import Spinner from '../../utils/components/Spinner';
import { useRouter } from 'next/router';
import { Animate } from '../../styles/globalStyles';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ResolveClass from '../../utils/resolveClass';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

const api = new apiClass()
const resolve = new ResolveClass()

export default function SelectedInventory() {
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
                                <div className="image">
                                    <img src={productData?.product_image_url} width="400" height="200" alt="" />
                                </div>
                                <div className="name">
                                    {
                                        productData.type?.toLowerCase() === 'drug' ?
                                            <>
                                                <div style={{ fontWeight: 'bold' }} className='el'>{productData.generic_name}</div>
                                                <div className='el'>{productData.brand_name}</div>
                                            </> :
                                            <div className='el'>{productData.product_name}</div>
                                    }
                                </div>
                                <div className="price">
                                    {
                                        productData.wholesale_price < productData.retaile_price ?
                                            <div>
                                                <div># {productData.wholesale_price}</div>
                                                <small style={{ fontSize: '.85rem', textDecoration: 'line-through', fontWeight: 400, color: '#c30' }} className="strike"># {productData.retaile_price}</small>
                                            </div> :
                                            <div># {productData.retaile_price}</div>
                                    }
                                </div>
                                <div className="action"
                                    onClick={() => cart.includes(productData._id) ? handleRemoveFromCart(productData._id) : handleAddToCart(productData._id)}
                                    {...snap()}
                                    title={cart.includes(productData._id) ? "Remove from cart" : "Add to cart"}
                                >
                                    {
                                        cart.includes(productData._id) ?
                                            <RemoveShoppingCartIcon
                                                style={{ color: 'rgb(253 71 12)', fontSize: '1.2rem' }}
                                            /> :
                                            <AddShoppingCartIcon
                                                style={{ fontSize: '1.2rem', color: '#000' }}
                                            />
                                    }

                                </div>
                                {
                                    productData.form ? <div className='form el'><span style={{ fontWeight: 'bold' }}></span> {productData.form}</div> : ''
                                }
                            </Card>
                        </Animate>
            }
            <div className="buy-wrapper">
                <h3 className='call'><LocalPhoneIcon /></h3>
                <h3 className='buy'>BUY</h3>
            </div>

            <SimilarItems>

            </SimilarItems>
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
    
    .buy-wrapper {
        position: fixed;
        bottom: 20px;
        right: 10px;
        left: 10px;
        height: 50px;
        background: ${({ theme }) => theme.title};
        display: flex;
        align-items center;
        padding: 5px 10px;


        .buy {
            flex-grow: 1;
            text-align: center;
            color: #fff;
            font-size: 1.2rem;
            padding: 15px;
            cursor: pointer;
        }

        .call {
            text-align: center;
            font-size: 1.2rem;
            padding: 10px 15px;
            margin-right: 5px;
            cursor: pointer;
            background: ${({ theme }) => theme.card};
        }
    }
`

const Card = styled.div`
    width: 100%;
    max-width: 600px;
    min-height: 320px;
    position: relative;
    margin: 10px auto;
    user-select: none;
    background: ${({ theme }) => theme.card};
    transition: transform .09s;
    font-size: 1.2rem;
    line-height: 2rem;    

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
        padding: 10px;
    }
    .price {
        padding: 10px;
    };

    .detail {
        padding: 10px;
        color: #ccc;
    };

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
        max-width: 70%;
        padding: 5px;
        cursor: default;
        display: flex;
        z-index: 2;
        background: ${({ theme }) => theme.card};
    }
`

const SimilarItems = styled.div`

`