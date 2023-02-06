import { useState, createContext, useEffect } from 'react';
import Layout from '../layouts';
import Cookies from 'js-cookie';
import { useRouter } from "next/router";
import apiClass from '../utils/data/api';
import HomeIcon from '@mui/icons-material/Home';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import Groups2Icon from '@mui/icons-material/Groups2';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import staticDataClass from '../utils/data/staticDataClass';


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

    // profile

    const [fetchingProfile, setFetchingProfile] = useState(false);
    const [editProfileLoading, setEditProfileLoading] = useState(false);
    const [fetchingProfileSuccess, setFetchingProfileSuccess] = useState(false);
    const [profile, setProfile] = useState('');

    const links = [
        { name: "Home", url: '/', icon: HomeIcon, show: true },
        { name: "Contact", url: '/contact', icon: ContactPageIcon, show: true },
        { name: "About Us", url: '/about-us', icon: Groups2Icon, show: true },

        { name: "POS", url: '/pos', icon: WorkHistoryIcon, show: isAgent },
        { name: "Admin", url: '/admin/users', icon: PersonOutlineIcon, show: isAdmin },
        { name: "Config", url: '/admin/config', icon: SettingsIcon, show: isAdmin },
        { name: "Inventory", url: '/admin/Inventory', icon: AddBusinessIcon, show: isSupperAdmin },
    ]

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
        links
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