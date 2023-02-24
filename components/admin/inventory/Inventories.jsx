import React, { useEffect, useState, useRef, useContext } from 'react';
import styled from 'styled-components'
import { ContextData } from '../../../contextApi/ContextApi';
import apiClass from '../../../utils/data/api';
import FetchError from '../../../utils/components/FetchError';
import filter from "@mozeyinedu/filter";
import Spinner from '../../../utils/components/Spinner';
import { Animate } from '../../../styles/globalStyles';
import Modal from '../../../utils/components/Modal';
import Actions from './Actions';

import Select from 'react-select'
import Card from './Card';
import { useRouter } from 'next/router';

const api = new apiClass()

export default function Inventories() {
    const router = useRouter
    const { num, access, search, product } = useContext(ContextData);
    const [ready, setReady] = useState(false)
    const [observing, setObserving] = useState(false)
    const [isScrolling, setIsScrolling] = useState(false)
    const [count, setCount] = useState(num);
    const [type, setType] = useState("All")
    const pageEnd = useRef()
    const { hasAccess } = access
    const { searchedData } = search

    const {
        fetchingProducts,
        setFetchingProducts,
        fetchingProductsSuccess,
        setFetchingProductsSuccess,
        productsData,
        setProductsData,
        openProductAction,
        setOpenProductAction,
        setUpdatingProduct,
        selectedProduct,
        setSelectedProduct,
    } = product;

    useEffect(() => {
        setSelectedProduct('');
        setUpdatingProduct(false);
        setOpenProductAction(false)
    }, [])


    const [filteredData, setFilter] = useState(productsData);

    useEffect(() => {
        if (count < productsData.length && observing) {
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
        if (!hasAccess) {
            api.refreshToken()
            setTimeout(() => {
                api.fetchProducts(setFetchingProducts, setFetchingProductsSuccess, setProductsData, true)
            }, 1000)
        }
        else {
            api.fetchProducts(setFetchingProducts, setFetchingProductsSuccess, setProductsData, true)
        }
    }, [])


    useEffect(() => {
        setTimeout(() => {
            setReady(true)
        }, 1000)
    }, [])


    useEffect(() => {
        const newData = filter({
            data: productsData,
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

    }, [searchedData, productsData])


    return (
        <Wrapper>

            {
                !ready || fetchingProducts ? <div><Spinner type='dots' /></div> :
                    !fetchingProductsSuccess ? <FetchError style={{ padding: '10px 0' }} /> :
                        <div className='container'>
                            <div className="header">
                                <div className='header-content'>
                                    <div>
                                        <Select
                                            options={[
                                                { value: 'all', label: 'All' },
                                                { value: 'drugs', label: 'Drugs' },
                                                { value: 'provisions', label: 'Provisions' },
                                            ]}
                                            defaultValue={{ value: 'all', label: "All" }}
                                            onChange={(selectedOption) => setType(selectedOption.value)}
                                        />
                                    </div>
                                </div>

                            </div>
                            <div className="main">
                                {
                                    filteredData?.slice(0, count).map((data, i) => {

                                        return (
                                            <Animate key={i}>
                                                {
                                                    (function () {
                                                        if (type.toLowerCase() === 'all') {
                                                            return <Card
                                                                data={data}
                                                                openProductAction={openProductAction}
                                                                setOpenProductAction={setOpenProductAction}
                                                                selectedProduct={selectedProduct}
                                                                setSelectedProduct={setSelectedProduct}
                                                            />
                                                        }
                                                        else if (type.toLowerCase() === 'drugs') {
                                                            if (data.type === 'drugs') {
                                                                return <Card
                                                                    data={data}
                                                                    openProductAction={openProductAction}
                                                                    setOpenProductAction={setOpenProductAction}
                                                                    selectedProduct={selectedProduct}
                                                                    setSelectedProduct={setSelectedProduct}
                                                                />
                                                            }

                                                        }
                                                        else if (type.toLowerCase() === 'provisions') {
                                                            if (data.type === 'provisions') {
                                                                return <Card
                                                                    data={data}
                                                                    openProductAction={openProductAction}
                                                                    setOpenProductAction={setOpenProductAction}
                                                                    selectedProduct={selectedProduct}
                                                                    setSelectedProduct={setSelectedProduct}
                                                                />
                                                            }
                                                        }
                                                    }())
                                                }
                                            </Animate>
                                        )
                                    })
                                }
                            </div>

                        </div>
            }
            {
                observing && ready && !fetchingProducts && fetchingProductsSuccess && count < productsData.length ?
                    <div style={{ height: '50px' }} ref={pageEnd}>
                        <Spinner type="dots" />
                    </div> : ''
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
    position: relative;
    line-height: 1.3rem;

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