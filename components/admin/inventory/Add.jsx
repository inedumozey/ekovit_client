import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components'
import apiClass from '../../../utils/data/api';
import Spinner from '../../../utils/components/Spinner';
import { useRouter } from 'next/router';
import { Animate } from '../../../styles/globalStyles';
import axios from "axios";
import Btn from '../../../utils/components/Btn';
import Cookies from 'js-cookie';
import Select from 'react-select'
import { Title } from '../../../styles/globalStyles';
import Alart from '../../../utils/components/Alart';
import { ContextData } from '../../../contextApi/ContextApi';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

const api = new apiClass();

export default function Add() {
    const { access, product } = useContext(ContextData);
    const { hasAccess } = access
    const {
        fetchingProduct,
        setFetchingProduct,
        fetchingProductSuccess,
        setFetchingProductSuccess,
        ProductData,
        setProductData,
        updatingproduct,
        setUpdatingproduct,
    } = product

    const [sending, setSending] = useState(false);
    const [msg, setMsg] = useState({ msg: '', status: false });

    const [type, setType] = useState("drugs");
    const [category, setCategory] = useState("");
    const [generic_name, setGeneric_name] = useState("");
    const [brand_name, setBrand_name] = useState("");
    const [product_name, setProduct_name] = useState("");
    const [purchased_price, setPurchased_price] = useState("");
    const [wholesale_price, setWholesale_price] = useState("");
    const [retaile_price, setRetaile_price] = useState("");
    const [products_image, setProducts_image] = useState("");
    const [expiry_date, setExpiry_date] = useState("");
    const [form, setForm] = useState("");
    const [quantity, setQuantity] = useState("");
    const [other_details, setOther_details] = useState("");

    const handleSubmit = async (e) => {
        setSending(true);

        let formData = new FormData();
        formData.append('type', type)
        formData.append('category', category)
        formData.append('products_image', products_image)
        formData.append('purchased_price', purchased_price)
        formData.append('generic_name', generic_name)
        formData.append('brand_name', brand_name)
        formData.append('product_name', product_name)
        formData.append('wholesale_price', wholesale_price)
        formData.append('retaile_price', retaile_price)
        formData.append('expiry_date', expiry_date)
        formData.append('other_details', other_details)

        try {
            const { data } = await axios.post(`${BASE_URL}/products/add`, formData, {
                headers: {
                    'authorization-access': `Bearer ${Cookies.get('accesstoken')}`,
                    'authorization-admin': `Bearer ${Cookies.get('xxxxx2')}`,
                }
            });

            setSending(false);

            if (data.token) {
                setToken(data.token)
            }
            setMsg({ msg: data.msg, status: true })

            // clear input
            setCategory("");
            setGeneric_name("");
            setBrand_name("");
            setProduct_name("");
            setPurchased_price("");
            setWholesale_price("");
            setRetaile_price("");
            setProducts_image("");
            setExpiration_date("");
            setForm("");
            setQuantity("");
            setOther_details("");
        }
        catch (err) {
            if (err.response) {
                setMsg({ msg: err.response.data.msg, status: false })
            }
            else {
                setMsg({ msg: err.message, status: false })
            }

            setSending(false);
        }

    }

    const submit = (e) => {
        e.preventDefault();
        setSending(true);

        if (!hasAccess) {
            api.refreshToken()
            setTimeout(() => {
                handleSubmit()
            }, 1000)
        }
        else {
            handleSubmit()
        }
    }

    return (
        <Wrapper>
            <Title> Add a product</Title>
            {
                msg.msg ?
                    <div style={{ margin: '25px 0' }}>
                        <Alart onHide={setMsg} type={msg.status ? 'success' : 'error'}>{msg.msg}</Alart>
                    </div> : ''
            }
            <Animate>
                <Card>
                    <Form onSubmit={submit}>
                        <InputWrapper>
                            <div className='inp'>
                                <div style={{ width: '49%' }}>
                                    <label>
                                        Product Type:
                                    </label>
                                    <Select
                                        options={[
                                            { value: 'drugs', label: 'Drugs' },
                                            { value: 'provisions', label: 'Provisions' },
                                        ]}
                                        defaultValue={{ value: 'drugs', label: "Drugs" }}
                                        onChange={(selectedOption) => setType(selectedOption.value)}
                                    />
                                </div>
                                <div style={{ width: '49%' }}>
                                    <input
                                        placeholder="Category"
                                        autoFocus
                                        value={category || ''}
                                        onChange={(e) => setCategory(e.target.value)}
                                    />
                                </div>
                            </div>
                        </InputWrapper>

                        <InputWrapper>
                            {
                                type.toLowerCase() === 'drugs' ?
                                    <div className='inp'>
                                        <div style={{ width: '49%' }}>
                                            <input
                                                placeholder="Generic Name"
                                                value={generic_name || ''}
                                                onChange={(e) => setGeneric_name(e.target.value)}
                                            />
                                        </div>
                                        <div style={{ width: '49%' }}>
                                            <input
                                                placeholder="Brand Name"
                                                value={brand_name || ''}
                                                onChange={(e) => setBrand_name(e.target.value)}
                                            />
                                        </div>
                                    </div> :

                                    <div className='inp'>
                                        <div style={{ width: '49%' }}>
                                            <input
                                                placeholder="Product Name"
                                                value={product_name || ''}
                                                onChange={(e) => setProduct_name(e.target.value)}
                                            />
                                        </div>
                                        <div style={{ width: '49%' }}>
                                            <input
                                                type="number"
                                                placeholder="Quantity"
                                                value={quantity || ''}
                                                onChange={(e) => setQuantity(e.target.value)}
                                            />
                                        </div>
                                    </div>
                            }
                        </InputWrapper>

                        <InputWrapper>
                            {
                                type.toLowerCase() === 'drugs' ?
                                    <div className='inp'>
                                        <div style={{ width: '49%' }}>
                                            <input
                                                placeholder="Form"
                                                value={form || ''}
                                                onChange={(e) => setForm(e.target.value)}
                                            />
                                        </div>
                                        <div style={{ width: '49%' }}>
                                            <input
                                                type="number"
                                                placeholder="Quantity"
                                                value={quantity || ''}
                                                onChange={(e) => setQuantity(e.target.value)}
                                            />
                                        </div>
                                    </div> : ''
                            }
                        
                        </InputWrapper>

                        <InputWrapper>
                            <input
                                placeholder="Purchased Price"
                                type="number"
                                value={purchased_price || ''}
                                onChange={(e) => setPurchased_price(e.target.value)}
                            />
                        </InputWrapper>

                        <InputWrapper>
                            <div className='inp'>
                                <div style={{ width: '49%' }}>
                                    <input
                                        placeholder="Wholesale Price"
                                        type="number"
                                        value={wholesale_price || ''}
                                        onChange={(e) => setWholesale_price(e.target.value)}
                                    />
                                </div>
                                <div style={{ width: '49%' }}>
                                    <input
                                        placeholder="Retail Price"
                                        type="number"
                                        value={retaile_price || ''}
                                        onChange={(e) => setRetaile_price(e.target.value)}
                                    />
                                </div>
                            </div>
                        </InputWrapper>

                        <InputWrapper>
                            <div className='inp'>
                                <div style={{ width: '49%' }}>
                                <label>
                                    Expiry Date:
                                </label>
                                <input
                                    type="date"
                                    placeholder="Expiry Date"
                                    value={expiry_date || ''}
                                    onChange={(e) => setExpiry_date(e.target.value)}
                                />
                            </div>
                            <div style={{ width: '49%' }}>
                                <label>
                                    Product Image:
                                </label>
                                <input
                                    type="file"
                                    accept='image/*'
                                    onChange={(e) => setProducts_image(e.target.files[0])}
                                />
                            </div>
                            </div>
                        </InputWrapper>

                        <InputWrapper>
                            <textarea
                                placeholder="Other Details"
                                value={other_details || ''}
                                onChange={(e) => setOther_details(e.target.value)}
                            ></textarea>
                        </InputWrapper>

                        <InputWrapper>
                            <Btn
                                style={{ width: '100%' }}
                                disabled={sending}
                                color="var(--blue)">
                                {sending ? <Spinner type="dots" /> : "Save Product"}
                            </Btn>
                        </InputWrapper>
                    </Form>

                </Card>
            </Animate>
        </Wrapper>
    )
}


const Wrapper = styled.div`
    position: relative;
    line-height: 1.3rem;

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
    padding: 10px;
    margin: 3px auto;
    background: ${({ theme }) => theme.card};

    .inp {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`

const Form = styled.form`
    width: 100%;
    margin: auto;
`
const InputWrapper = styled.div`
    width: 100%;
    margin-bottom: 10px;
    position: relative;
    
    input, textarea {
        border:  ${({ theme }) => `1px solid ${theme.border}`};
        padding: 8px 5px;
        height: 100%;
        width: 100%;
        border-radius: 3px;
        display: block;
        font-size: .9rem;
        background: transparent;
        color: ${({ theme }) => theme.pri};
        
        &: focus{
            outline: none;
            border: ${({ theme }) => `2px solid ${theme.title}`};
        }
    }

    textarea {
        resize: vertical;
    }
`