import React, { useContext } from 'react';
import styled from 'styled-components'
import { ContextData } from '../../contextApi/ContextApi';
import { useRouter } from 'next/router';
// import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function Carts() {
    const { carts } = useContext(ContextData);
    const router = useRouter()

    const {
        cart
    } = carts

    return (
        <Wrapper onClick={() => router.push('/products/carts')} title="Open Carts" cart={cart}>
            <ShoppingCartIcon className='cart-icon' />
        </Wrapper>
    )
}


const Wrapper = styled.div`
    cursor: pointer;

    .cart-icon {
        color: ${({ theme, cart }) => cart.length ? '#c30' : theme.pri}
    }
`