import React, { useEffect, useState, useRef, useContext } from 'react';
import styled from 'styled-components'
import { ContextData } from '../../../contextApi/ContextApi';
import apiClass from '../../../utils/data/api';
import FetchError from '../../../utils/components/FetchError';
import filter from "@mozeyinedu/filter";
import Spinner from '../../../utils/components/Spinner';
import { Animate } from '../../../styles/globalStyles';
import Modal from '../../../utils/components/Modal';

import Select from 'react-select';
import { useRouter } from 'next/router';

const api = new apiClass()

export default function Carts() {
    const router = useRouter
    const { num, access, search, product, carts } = useContext(ContextData);
    const [ready, setReady] = useState(false)
    const [observing, setObserving] = useState(false)
    const [isScrolling, setIsScrolling] = useState(false)
    const [count, setCount] = useState(num);
    const [type, setType] = useState("All")
    const pageEnd = useRef()
    const { hasAccess } = access
    const { searchedData } = search

    const {
        fetchingCartsProducts,
        setFetchingCartsProducts,
        fetchingCartsProductsSuccess,
        setFetchingCartsProductsSuccess,
        cartsProductsData,
        setCartsProductsData,
    } = product;

    const {
        cart,
        setCart,
        addToCart,
        removeFromCart
    } = carts

    const [filteredData, setFilter] = useState(cartsProductsData);

    useEffect(() => {
        if (count < cartsProductsData.length && observing) {
            const observer = new IntersectionObserver((entries) => {

                if (entries[0].isIntersecting) {
                    setTimeout(() => {
                        setCount(prevState => prevState + num)
                    }, 500)
                }
            }, {
                threshold: .5
            })

            pageEnd.current ? observer.observe(pageEnd.current) : ''
        }

    }, [observing, count, isScrolling])

    useEffect(() => {
        setObserving(true)

        window.onscroll = (e) => {
            setIsScrolling(true)
        }
    }, [])

    useEffect(() => {
        if (cart.length) {
            if (!hasAccess) {
                api.refreshToken()
                setTimeout(() => {
                    api.fetchCartsProducts(setFetchingCartsProducts, setFetchingCartsProductsSuccess, setCartsProductsData, cart)
                }, 1000)
            }
            else {
                api.fetchCartsProducts(setFetchingCartsProducts, setFetchingCartsProductsSuccess, setCartsProductsData, cart)
            }
        }
    }, [cart])


    useEffect(() => {
        setTimeout(() => {
            setReady(true)
        }, 1000)


        console.log(cartsProductsData)
    }, [])


    useEffect(() => {
        const newData = filter({
            data: cartsProductsData,
            keys: [
                "brand_name",
                "category",
                'expiry_date',
                "form",
                "generic_name",
                "product_name",
                "purchased_price",
                "quantity",
                "retaile_price",
                "type",
                "wholesale_price"
            ],
            input: searchedData
        })

        setFilter(newData)

    }, [searchedData, cartsProductsData])


    return (
        <Wrapper>

            {
                cart.length ?
                    <>
                        {
                            !ready || fetchingCartsProducts ? <div><Spinner type='dots' /></div> :
                                !fetchingCartsProductsSuccess ? <FetchError style={{ padding: '10px 0' }} /> :
                                    <div className='container'>
                                        <div className="header">

                                        </div>
                                        <div className="main">
                                            {
                                                filteredData?.slice(0, count).map((data, i) => {

                                                    return (
                                                        <Animate key={i}>
                                                            {
                                                                JSON.stringify(cartsProductsData)
                                                            }
                                                        </Animate>
                                                    )
                                                })
                                            }
                                        </div>

                                    </div>
                        }
                        {


                            observing && ready && !fetchingCartsProducts && fetchingCartsProductsSuccess && count < cartsProductsData.length ?
                                <div style={{ height: '50px' }} ref={pageEnd}>
                                    <Spinner type="dots" />
                                </div> : ''
                        }
                    </>
                    :
                    <h2 style={{ padding: '30px', textAlign: 'center' }}>
                        Cart is Empty
                    </h2>
            }

        </Wrapper>
    )
}


const Wrapper = styled.div`
    position: relative;
    line-height: 1.3rem;
    padding: 20px;

    .container {
        min-height: 100%;
        .header {
            width: 100%;
            .header-content {
                position: relative;
                width: 100%;
                padding: 10px 0 30px 0;
                display: flex;
                align-items: flex-start;

                border-bottom: 1px solid #ccc;               
            }
            
            padding: 10px ${({ theme }) => theme.lg_padding};
            @media (max-width: ${({ theme }) => theme.md_screen}){
                padding: 10px ${({ theme }) => theme.md_padding};
            }
            @media (max-width: ${({ theme }) => theme.sm_screen}){
                padding: 10px ${({ theme }) => theme.sm_padding};
            }
        }

        .main {
            display: flex;
            justify-content: center;
            align-item: center;
            flex-flow: wrap;
            padding: 10px ${({ theme }) => theme.lg_padding};
            @media (max-width: ${({ theme }) => theme.md_screen}){
                padding: 10px ${({ theme }) => theme.md_padding};
            }
            @media (max-width: ${({ theme }) => theme.sm_screen}){
                padding: 10px ${({ theme }) => theme.sm_padding};
            }

        }
    }
`