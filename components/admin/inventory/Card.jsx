import React from 'react';
import styled from 'styled-components'
import Image from 'next/image'
import { useRouter } from 'next/router';
import ResolveClass from '../../../utils/resolveClass';

const resolve = new ResolveClass()

export default function Card({ data, openProductAction, setOpenProductAction, setSelectedProduct, selectedProduct }) {
    const router = useRouter()

    return (
        <Wrapper>
            <div className="date">
                <div className='type'>{resolve.capitalize(data.type)}</div>
                <div className='expiry-date'>
                    <div style={{ fontWeight: 'bold' }}>Exp Date</div>
                    <div>{data.expiry_date}</div>
                </div>
                <div className="action">
                    <div onClick={(e) => { setSelectedProduct(data); setOpenProductAction(!openProductAction) }} className="actions">
                        000
                    </div>
                </div>
            </div>

            <div className="line">
                <div className="dot"></div>
                <div className="dot-tail"></div>
            </div>
            <div className="container">
                <div
                    className="data"
                    onClick={() => router.push(`/admin/inventory/${data._id}`)}
                >
                    <div className="title">
                        <div className="img">
                            <Image src={"https://res.cloudinary.com/drmo/image/upload/v1676757806/EKOVIT/drugs/1553454-1676757792467.jpg"} width="400" height="200" alt="" />
                        </div>
                        <div className="category-wrapper">
                            <h4 className='data-title el' style={{ fontWeight: 'bold' }}>
                                {data.category?.toUpperCase()}
                            </h4>
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
                {data.createdAt && new Date(data.createdAt).toLocaleString()}
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100%;
    max-width: 700px;
    height: 200px;
    min-height: 250px;
    position: relative;
    margin: auto;
    display: flex;
    align-items: center;

    .date {
        height: 100%;
        width: 55px;
        font-size: .6rem;

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
            user-select: none;
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
        width: calc(100% - 55px - 18px);

        .data {
            height: 90%;
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
