import React, { useEffect, useState, useRef, useContext } from 'react';
import styled from 'styled-components'
import { ContextData } from '../../../contextApi/ContextApi';
import apiClass from '../../../utils/data/api';
import FetchError from '../../../utils/components/FetchError';
import filter from "@mozeyinedu/filter";
import Image from 'next/image'
import Spinner from '../../../utils/components/Spinner';
import { useRouter } from 'next/router';
import { Animate } from '../../../styles/globalStyles';
import Select from 'react-select'
import { Title } from '../../../styles/globalStyles';
import ResolveClass from '../../../utils/resolveClass';
const api = new apiClass()
const resolve = new ResolveClass()

export default function Inventory() {
    const router = useRouter()
    const { num, access, search, product, exp_date_ref } = useContext(ContextData);
    const [ready, setReady] = useState(false)
    const [observing, setObserving] = useState(false)
    const [type, setType] = useState("All")
    const [count, setCount] = useState(num);
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
    } = product;

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
    }, [observing, count])

    useEffect(() => {
        setObserving(true)
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
                                                            return <CardComp data={data} />
                                                        }
                                                        else if (type.toLowerCase() === 'drugs') {
                                                            if (data.type === 'drugs') {
                                                                return <CardComp data={data} />
                                                            }

                                                        }
                                                        else if (type.toLowerCase() === 'provisions') {
                                                            if (data.type === 'provisions') {
                                                                return <CardComp data={data} />
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

            <div ref={pageEnd}>
                {
                    (observing || ready || !fetchingProducts) && fetchingProductsSuccess && count < productsData.length ? <Spinner type="dots" /> : ''
                }
            </div>

        </Wrapper>
    )
}

const CardComp = ({ data }) => {

    return (
        <Card>
            <div className="date">
                {data.createdAt && new Date(data.createdAt).toLocaleString()}
                <div className='type'>{resolve.capitalize(data.type)}</div>
                <div className='expiry-date'>
                    <div style={{ fontWeight: 'bold' }}>Exp Date</div>
                    <div>{data.expiry_date}</div>
                </div>
            </div>
            <div className="line">
                <div className="dot"></div>
                <div className="dot-tail"></div>
            </div>
            <div className="container">
                <div className="data">
                    <div className="title">
                        <div className="img">
                            <Image src={"https://res.cloudinary.com/drmo/image/upload/v1676757806/EKOVIT/drugs/1553454-1676757792467.jpg"} width="400" height="200" alt="" />
                        </div>
                        <div className="category-wrapper">
                            <h3 className='data-title el' style={{ fontWeight: 'bold' }}>
                                {data.category?.toUpperCase()}
                            </h3>
                            {
                                data.type?.toLowerCase() === 'drugs' ?
                                    <>
                                        <div className='el'><span style={{ fontWeight: 'bold' }}>Generic Name:</span> {data.generic_name}</div>

                                        <div className='el'><span style={{ fontWeight: 'bold' }}>Brand Name:</span> {data.brand_name}</div>

                                        <div className='el'><span style={{ fontWeight: 'bold' }}>Form:</span> {data.form}</div>
                                    </> :
                                    <>
                                        <div className='el'>{data.product_name}</div>
                                    </>
                            }
                        </div>
                    </div>

                    <div className="body">
                        <div className='el'><span style={{ fontWeight: 'bold' }}>Purchased Price:</span> {data.purchased_price}</div>
                        <div className='el'><span style={{ fontWeight: 'bold' }}>Quantity:</span> {data.quantity}</div>
                        <div className='el'><span style={{ fontWeight: 'bold' }}>wholesale Price:</span> {data.wholesale_price}</div>
                        <div className='el'><span style={{ fontWeight: 'bold' }}>Retail Price:</span> {data.retaile_price}</div>
                    </div>
                </div>
            </div>
        </Card>
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

const Card = styled.div`
    width: 100%;
    max-width: 700px;
    height: 200px;
    margin: auto;
    display: flex;
    align-items: center;

    .date {
        height: 100%;
        width: 50px;

        .type {
            color: ${({ theme }) => theme.title};
            margin: 20px 0;
        }

        .expiry-date {

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
        padding: 0 0 30px 10px;
        width: calc(100% - 50px - 18px);

        .data {
            height: 100%;
            width: 100%;
            border-radius: 5px;
            background: ${({ theme }) => theme.card};
            position: relative;
            cursor: pointer;
            padding: 10px;

            &:hover {
                opacity: .7
            }

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

            .title {
                width: 100%;
                height: 70px;
                display: flex;
                align-items: center;
                justify-content: center;


                .img {
                    width: 50px;
                    height: 70px;
            
                    img {
                        width: 100%;
                        height: 100%;
                        
                    }
                }

                .category-wrapper {
                    width: calc(100% - 50px);
                    height: 100%;
                    padding-left: 5px;

                    .data-title {
                        color: ${({ theme }) => theme.title};
                    }
                }
            }

            .body {
                padding: 15px 10px;
            }
        }
    }
`