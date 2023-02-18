import { useState, createContext, useEffect } from 'react';
import Layout from '../layouts';
import Cookies from 'js-cookie';
import { useRouter } from "next/router";
import apiClass from '../utils/data/api';
import link from './link';
import staticDataClass from '../utils/data/staticDataClass';
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
        // else if (router.pathname.includes('/admin')) {
        //     if (!Cookies.get('admintoken')) {
        //         router.push('/pos')
        //     }
        // }
    }, [])

    // login
    useEffect(() => {
        api.isLoggedin() ? setIsLoggedin(true) : setIsLoggedin(false)
        api.hasAccess() ? setHasAccess(true) : setHasAccess(false)
        api.isSupperAdmin() ? setIsSupperAdmin(true) : setIsSupperAdmin(false)
        api.isAdmin() ? setIsAdmin(true) : setIsAdmin(false)
        api.isAgent() ? setIsAgent(true) : setIsAgent(false)
    })

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