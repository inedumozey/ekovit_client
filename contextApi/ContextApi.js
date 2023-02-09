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

        // not seen in services
        { name: "Services", url: '/services/drugs', icon: ContactPageIcon, show: true && !router.pathname.includes('/services') },

        // only seen in services
        { name: "Provisions", url: '/services/provisions', icon: ContactPageIcon, show: true && router.pathname.includes('/services') },
        { name: "Drugs", url: '/services/drugs', icon: Groups2Icon, show: true && router.pathname.includes('/services') },

        // not seen in pos
        { name: "POS", url: '/pos', icon: WorkHistoryIcon, show: isAgent },

        // not seen in admin
        { name: "Admin", url: '/admin/inventory', icon: PersonOutlineIcon, show: isAdmin && !router.pathname.includes('/admin') },

        // only seen in admin
        { name: "Config", url: '/admin/config', icon: SettingsIcon, show: isAdmin && router.pathname.includes('/admin') },
        { name: "Users", url: '/admin/users', icon: SettingsIcon, show: isAdmin && router.pathname.includes('/admin') },

        // not seen in inventory
        { name: "Inventory", url: '/admin/inventory', icon: AddBusinessIcon, show: isAdmin && router.pathname.includes('/admin') },

        // only seen in inventory
        { name: "Add Inventory", url: '/admin/inventory/add', icon: AddBusinessIcon, show: isAdmin && router.pathname.includes('/admin/inventory') },
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