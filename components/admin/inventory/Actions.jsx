import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components'
import { ContextData } from '../../../contextApi/ContextApi';
import apiClass from '../../../utils/data/api';
import Spinner from '../../../utils/components/Spinner';
import { useRouter } from 'next/router';


const api = new apiClass()


export default function Actions() {
    const router = useRouter();
    const { access, product } = useContext(ContextData);

    const { hasAccess } = access

    const {
        setFetchingProducts,
        setFetchingProductsSuccess,
        setProductsData,

        deletingProduct,
        setDeletingProduct,
        selectedProduct,
        setSelectedProduct,
        updatingProduct,
        setUpdatingProduct,
        openProductAction,
        setOpenProductAction,
    } = product


    const handleUpdate = () => {
        // console.log(selectedProduct)
        if (!hasAccess) {
            api.refreshToken()
            setTimeout(() => {
                // api.fetchProducts(setFetchingProducts, setFetchingProductsSuccess, setProductsData, true)
            }, 1000)
        }
        else {
            // api.fetchProducts(setFetchingProducts, setFetchingProductsSuccess, setProductsData, true)
        }
    }

    const handleDelete = () => {
        if (!hasAccess) {
            api.refreshToken()
            setTimeout(() => {
                api.deleteProduct(
                    setFetchingProducts,
                    setFetchingProductsSuccess,
                    setProductsData,
                    setDeletingProduct,
                    selectedProduct._id,
                    setOpenProductAction,
                    router,
                )
            }, 1000)
        }
        else {
            api.deleteProduct(
                setFetchingProducts,
                setFetchingProductsSuccess,
                setProductsData,
                setDeletingProduct,
                selectedProduct._id,
                setOpenProductAction,
                router
            )
        }
    }


    return (
        <Wrapper className='action'>
            <div onClick={handleUpdate} style={{ color: 'blue' }} className='action-btn'>
                {
                    updatingProduct ? <Spinner type="dots" /> : "Update"
                }
            </div>
            <div onClick={handleDelete} style={{ color: 'red' }} className='action-btn'>
                {
                    deletingProduct ? <Spinner type="dots" /> : "Delete"
                }
            </div>
        </Wrapper>
    )
}


const Wrapper = styled.div`
    padding: 10px;
    background: ${({ theme }) => theme.bg};

    .action-btn {
        cursor: pointer;
        padding: 10px;
        border: 1px solid ${({ theme }) => theme.border};
        font-size: 1rem;
        margin-bottom: 5px;

        &:hover {
            opacity: .4
        }
    }
`