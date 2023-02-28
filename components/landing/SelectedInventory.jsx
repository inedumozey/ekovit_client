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
import ResolveClass from '../../utils/resolveClass';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Card from './Card';

const api = new apiClass()
const resolve = new ResolveClass()

export default function SelectedInventory() {
    const { snap } = useSnap(.5)
    const router = useRouter();
    const { id } = router.query
    const { access, product, carts } = useContext(ContextData);
    const [ready, setReady] = useState(false)
    const [fetch, setFetch] = useState(false)
    const [fetchSimilar, setFetchSimilar] = useState(false)

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


        fetchingProductsSimilar,
        setFetchingProductsSimilar,
        fetchingProductsSimilarSuccess,
        setFetchingProductsSimilarSuccess,
        productsSimilarData,
        setProductsSimilarData,
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
    }, [ready, id])

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

    // fetch all data with similar product, type, generic name, brand name, categories,
    useEffect(() => {
        if (ready) {
            setTimeout(() => {
                setFetchSimilar(true)
            }, 500)
        }
    }, [ready])

    useEffect(() => {
        const keyword = {
            product_name: productData.product_name,
            brand_name: productData.brand_name,
            generic_name: productData.generic_name,
            form: productData.form,
            category: productData.category,
            id: productData._id
        }

        if (productData) {
            if (!hasAccess) {
                api.refreshToken()
                setTimeout(() => {
                    api.fetchSimilarProdutcs(setFetchingProductsSimilar, setFetchingProductsSimilarSuccess, setProductsSimilarData, keyword)
                }, 1000)
            }
            else {
                api.fetchSimilarProdutcs(setFetchingProductsSimilar, setFetchingProductsSimilarSuccess, setProductsSimilarData, keyword)
            }
        }
    }, [productData])

    return (
        <Wrapper>

            {
                !ready || fetchingProduct || !fetchingProductSuccess ? <div><Spinner type='dots' /></div> :
                    <Animate>
                        <CardStyle>
                            <div className="image">
                                <img src={productData?.product_image_url} width="400" height="200" alt="" />
                            </div>
                            <div className="name">
                                {
                                    productData?.type?.toLowerCase() === 'drug' ?
                                        <>
                                            <div style={{ fontWeight: 'bold' }} className='el'>{productData.generic_name}</div>
                                            <div className='el'>{productData.brand_name}</div>
                                        </> :
                                        <div className='el'>{productData.product_name}</div>
                                }
                            </div>
                            <div className="price">
                                {
                                    productData.market_price > productData.selling_price ?
                                        <div>
                                            <div># {productData.selling_price}</div>
                                            <small style={{ fontSize: '.7rem', textDecoration: 'line-through', fontWeight: 400, color: '#c30' }} className="strike"># {productData.market_price}</small>
                                        </div> :
                                        <div># {productData.selling_price}</div>
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
                        </CardStyle>
                    </Animate>
            }
            <div className="buy-wrapper">
                <h3 className='call'><LocalPhoneIcon /></h3>
                <h3 className='buy'>BUY</h3>
            </div>

            {
                ready ?
                    <SimilarItems>
                        {
                            productData ?
                                fetchingProductsSimilar || !fetchingProductsSimilarSuccess ? <div><Spinner type='dots' /></div> :
                                    !productsSimilarData?.length ? "" :
                                        <>
                                            <h2 className="Container">You may also like</h2>
                                            <div className="main">
                                                {
                                                    productsSimilarData?.map((data, i) => {
                                                        return (
                                                            <Animate key={i}>
                                                                <Card
                                                                    data={data}
                                                                    openProductAction={openProductAction}
                                                                    setOpenProductAction={setOpenProductAction}
                                                                    selectedProduct={selectedProduct}
                                                                    setSelectedProduct={setSelectedProduct}
                                                                />
                                                            </Animate>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </> : ''
                        }
                    </SimilarItems> : ''
            }
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
        z-index: 4;


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

const CardStyle = styled.div`
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
        top: 10px;
        max-width: 70%;
        padding: 5px;
        cursor: default;
        display: flex;
        z-index: 2;
        background: ${({ theme }) => theme.card};
    }
`

const SimilarItems = styled.div`
    margin-top: 40px;
    margin-bottom: 60px;
    
    .main {
        display: flex;
        // justify-content: center;
        align-item: center;
        flex-flow: wrap;
        margin-bottom: 20px;
    }
`