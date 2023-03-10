import { useState, createContext, useEffect } from 'react';
import Layout from '../layouts';
import Cookies from 'js-cookie';
import { useRouter } from "next/router";
import apiClass from '../utils/data/api';
import link from './link';
import staticDataClass from '../utils/data/staticDataClass';
import { toast } from 'react-toastify';
import mobileLink from './mobileLinks';

const api = new apiClass()
const staticData = new staticDataClass()

const ContextData = createContext()

function ContextApi({ children, toggleState, toggle }) {

    const router = useRouter()
    const [isLoggedin, setIsLoggedin] = useState(false)
    const [hasAccess, setHasAccess] = useState(false)
    const [isSupperAdmin, setIsSupperAdmin] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [isAgent, setIsAgent] = useState(false)
    const [searchedData, setSearchedData] = useState('')

    // links
    const links = link(router, isAdmin, isAgent)
    const mobileLinks = mobileLink(router, isAdmin, isAgent)

    // profile
    const [fetchingProfile, setFetchingProfile] = useState(false);
    const [editProfileLoading, setEditProfileLoading] = useState(false);
    const [fetchingProfileSuccess, setFetchingProfileSuccess] = useState(false);
    const [profile, setProfile] = useState('');

    useEffect(() => {
        if (!hasAccess) {
            api.refreshToken()
            setTimeout(() => {
                api.fetchProfile(setFetchingProfile, setFetchingProfileSuccess, setProfile, true)
            }, 1000)
        }
        else {
            api.fetchProfile(setFetchingProfile, setFetchingProfileSuccess, setProfile, true)
        }
    }, [])


    // users
    const [fetchingUsers, setFetchingUsers] = useState(false)
    const [fetchingUsersSuccess, setFetchingUsersSuccess] = useState(false)
    const [users, setUsers] = useState([])

    // user
    const [fetchingUser, setFetchingUser] = useState(false)
    const [fetchingUserSuccess, setFetchingUserSuccess] = useState(false)
    const [user, setUser] = useState("")

    //config
    const [fetchingConfig, setFetchingConfig] = useState(false)
    const [fetchingConfigSuccess, setFetchingConfigSuccess] = useState(false)
    const [configData, setConfigData] = useState("")
    const [updatingEmailPhone, setUpdatingEmailPhone] = useState(false)

    // products
    const [fetchingProducts, setFetchingProducts] = useState(false)
    const [fetchingProductsSuccess, setFetchingProductsSuccess] = useState(false)
    const [productsData, setProductsData] = useState([])
    const [updatingproducts, setUpdatingproducts] = useState(false)

    // carts products
    const [fetchingCartsProducts, setFetchingCartsProducts] = useState(false)
    const [fetchingCartsProductsSuccess, setFetchingCartsProductsSuccess] = useState(false)
    const [cartsProductsData, setCartsProductsData] = useState([])

    // product
    const [fetchingProduct, setFetchingProduct] = useState(false)
    const [fetchingProductSuccess, setFetchingProductSuccess] = useState(false)
    const [productData, setProductData] = useState("")
    const [deletingProduct, setDeletingProduct] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState("")
    const [updatingProduct, setUpdatingProduct] = useState(false)
    const [openProductAction, setOpenProductAction] = useState(false)
    const [cart, setCart] = useState([])

    // search products
    const [fetchingProductsSimilar, setFetchingProductsSimilar] = useState(false)
    const [fetchingProductsSimilarSuccess, setFetchingProductsSimilarSuccess] = useState(false)
    const [productsSimilarData, setProductsSimilarData] = useState([])


    useEffect(() => {
        // redirect
        if (router.pathname.includes('/pos')) {
            if (!Cookies.get('refreshtoken')) {
                router.push('/auth')
            }
        }
        else if (router.pathname == '/auth' || router.pathname == '/auth/signup') {
            if (Cookies.get('refreshtoken')) {
                router.push('/pos')
            }
        }

        // refresh setSelectedProduct 
        setSelectedProduct("")

        // refresh setOpenProductAction
        setOpenProductAction(false)
    }, [])

    // login
    useEffect(() => {
        api.isLoggedin() ? setIsLoggedin(true) : setIsLoggedin(false)
        api.hasAccess() ? setHasAccess(true) : setHasAccess(false)
        api.isSupperAdmin() ? setIsSupperAdmin(true) : setIsSupperAdmin(false)
        api.isAdmin() ? setIsAdmin(true) : setIsAdmin(false)
        api.isAgent() ? setIsAgent(true) : setIsAgent(false)
    })

    // add product to cart in local storage
    const addToCart = (id) => {
        let cartIds = [];
        if (localStorage.getItem("cart") != undefined) {
            cartIds = JSON.parse(localStorage.getItem("cart"));
        }
        cartIds.push(id);
        localStorage.setItem("cart", JSON.stringify(cartIds));
        setCart(cartIds)
    }

    // remove product from cart in local storage
    const removeFromCart = (id) => {
        // filter id from cart
        const newCartId = cart.filter(data => {
            return data !== id
        })
        localStorage.setItem("cart", JSON.stringify(newCartId));
        setCart(newCartId)
    }

    // get carts from local storage
    useEffect(() => {
        if (localStorage.getItem("cart") != undefined) {
            const id = JSON.parse(localStorage.getItem("cart"));
            setCart(id)
        }

    }, [])

    const state = {
        ...staticData,
        access: {
            isLoggedin,
            hasAccess,
            isSupperAdmin,
            isAdmin,
            isAgent,
        },
        user: {
            fetchingProfile,
            setFetchingProfile,
            fetchingProfileSuccess,
            setFetchingProfileSuccess,
            profile,
            setProfile,
            editProfileLoading,
            setEditProfileLoading
        },
        admin: {
            fetchingUsers,
            setFetchingUsers,
            fetchingUsersSuccess,
            setFetchingUsersSuccess,
            users,
            setUsers,

            fetchingUser,
            setFetchingUser,
            fetchingUserSuccess,
            setFetchingUserSuccess,
            user,
            setUser,
        },
        links,
        mobileLinks,
        search: {
            searchedData,
            setSearchedData
        },
        config: {
            fetchingConfig,
            setFetchingConfig,
            fetchingConfigSuccess,
            setFetchingConfigSuccess,
            configData,
            setConfigData,
            updatingEmailPhone,
            setUpdatingEmailPhone,
        },
        product: {
            fetchingProducts,
            setFetchingProducts,
            fetchingProductsSuccess,
            setFetchingProductsSuccess,
            productsData,
            setProductsData,
            updatingproducts,
            setUpdatingproducts,

            fetchingCartsProducts,
            setFetchingCartsProducts,
            fetchingCartsProductsSuccess,
            setFetchingCartsProductsSuccess,
            cartsProductsData,
            setCartsProductsData,

            fetchingProduct,
            setFetchingProduct,
            fetchingProductSuccess,
            setFetchingProductSuccess,
            productData,
            setProductData,

            deletingProduct,
            setDeletingProduct,
            selectedProduct,
            setSelectedProduct,
            updatingProduct,
            setUpdatingProduct,
            openProductAction,
            setOpenProductAction,

            fetchingProductsSimilar,
            setFetchingProductsSimilar,
            fetchingProductsSimilarSuccess,
            setFetchingProductsSimilarSuccess,
            productsSimilarData,
            setProductsSimilarData,
        },
        exp_date_ref: 100, //seconds
        carts: {
            cart,
            setCart,
            addToCart,
            removeFromCart
        }
    }

    return (
        <ContextData.Provider value={state}>
            <Layout toggleState={toggleState} toggle={toggle}>
                {children}
            </Layout>
        </ContextData.Provider>
    )
}

export { ContextApi, ContextData }