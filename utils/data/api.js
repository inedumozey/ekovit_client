import axios from "axios";
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

class apiClass {
    constructor() { }

    setCookies = (
        accesstoken,
        refreshtoken,
        xxxxx1, // admin token
        xxxxx2, // agent token
        xxxxx3, // agent token
    ) => {
        Cookies.set("accesstoken", accesstoken, {
            expires: new Date(new Date().getTime() + 1000 * 60 * 3), // 3 minutes (this is the same time backend accesstoken expires))
            secure: true,
            sameSite: 'strict'
        })
        Cookies.set("refreshtoken", refreshtoken, {
            expires: 28, // 28 days (this is the same time backend refreshtoken expires)
            secure: true,
            sameSite: 'strict'
        })
        Cookies.set("xxxxx1", xxxxx1, {
            expires: 28, // 28 days (this is the same time backend refreshtoken expires)
            secure: true,
            sameSite: 'strict'
        })
        Cookies.set("xxxxx2", xxxxx2, {
            expires: 28, // 28 days (this is the same time backend refreshtoken expires)
            secure: true,
            sameSite: 'strict'
        })
        Cookies.set("xxxxx3", xxxxx3, {
            expires: 28, // 28 days (this is the same time backend refreshtoken expires)
            secure: true,
            sameSite: 'strict'
        })
    }

    logout = (router) => {
        router.push('/');
        Cookies.remove('refreshtoken');
        Cookies.remove('accesstoken')
        Cookies.remove('xxxxx1')
        Cookies.remove('xxxxx2')
        Cookies.remove('xxxxx3')
    }

    isLoggedin = () => {
        return Cookies.get('refreshtoken') ? true : false
    }

    hasAccess = () => {
        return Cookies.get('accesstoken') ? true : false
    }

    isSupperAdmin = () => {
        return Cookies.get('xxxxx1') ? true : false
    }

    isAdmin = () => {
        return Cookies.get('xxxxx2') ? true : false
    }

    isAgent = () => {
        return Cookies.get('xxxxx3') ? true : false
    }

    refreshToken = async () => {
        if (!Cookies.get('accesstoken') && Cookies.get('refreshtoken')) {
            try {
                const { data } = await axios.get(`${BASE_URL}/auth/generate-accesstoken`, {
                    headers: {
                        authorization: `Bearer ${Cookies.get('refreshtoken')}`
                    }
                })

                // log the user in
                this.setCookies(data.accesstoken, data.refreshtoken, data.xxxxx1, data.xxxxx2, data.xxxxx3)
            }
            catch (err) {
                return
            }
        }
        else {
            return;
        }
    }

    fetchProfile = async (
        setFetchingProfile,
        setFetchingProfileSuccess,
        setProfile,
        initial) => {
        initial ? setFetchingProfile(true) : ''
        try {
            const { data } = await axios.get(`${BASE_URL}/auth/fetch-profile`, {
                headers: {
                    'authorization-access': `Bearer ${Cookies.get('accesstoken')}`,
                }
            });
            setProfile(data.data);
            initial ? setFetchingProfile(false) : ''
            setFetchingProfileSuccess(true)
        }
        catch (err) {

            initial ? setFetchingProfile(false) : ''

            if (err.response) {
                setFetchingProfileSuccess(false)
            }
            else {
                setFetchingProfileSuccess(false)
            }
        }
    }

    fetchUsers = async (
        setFetchingUsers,
        setFetchingUsersSuccess,
        setUsers,
        initial) => {

        initial ? setFetchingUsers(true) : ''
        try {
            const { data } = await axios.get(`${BASE_URL}/auth/fetch-users`, {
                headers: {
                    'authorization-access': `Bearer ${Cookies.get('accesstoken')}`,
                    'authorization-admin': `Bearer ${Cookies.get('xxxxx2')}`,
                }
            });
            setUsers(data.data)
            initial ? setFetchingUsers(false) : ''
            setFetchingUsersSuccess(true)
        }
        catch (err) {
            initial ? setFetchingUsers(false) : ''

            if (err.response) {
                setFetchingUsersSuccess(false)
            }
            else {
                setFetchingUsersSuccess(false)
            }
        }
    }

    fetchUser = async (
        setFetchingUser,
        setFetchingUserSuccess,
        setUser,
        id,
        initial) => {
        initial ? setFetchingUser(true) : ''

        try {
            const { data } = await axios.get(`${BASE_URL}/auth/fetch-user/${id}`, {
                headers: {
                    'authorization-access': `Bearer ${Cookies.get('accesstoken')}`,
                    'authorization-admin': `Bearer ${Cookies.get('xxxxx2')}`,
                }
            });
            setUser(data.data);
            initial ? setFetchingUser(false) : ''
            setFetchingUserSuccess(true)
        }
        catch (err) {

            initial ? setFetchingUser(false) : ''

            if (err.response) {
                setFetchingUserSuccess(false)
            }
            else {
                setFetchingUserSuccess(false)
            }
        }
    }

    addUsername = async (
        setEditProfileLoading,
        setFetchingProfile,
        setFetchingProfileSuccess,
        setProfile,
        data_) => {
        setEditProfileLoading(true)
        try {
            if (!this.hasAccess()) {
                // refresh accesstoken
                await this.refreshToken()

                setTimeout(async () => {
                    const { data } = await axios.put(`${BASE_URL}/auth/update-username`, data_, {
                        headers: {
                            'authorization-access': `Bearer ${Cookies.get('accesstoken')}`
                        }
                    })
                    this.fetchProfile(setFetchingProfile, setFetchingProfileSuccess, setProfile, false)
                    toast(data.msg, { type: 'success' })
                })

            } else {
                const { data } = await axios.put(`${BASE_URL}/auth/update-username`, data_, {
                    headers: {
                        'authorization-access': `Bearer ${Cookies.get('accesstoken')}`,
                    }
                });
                toast(data.msg, { type: 'success' })
                this.fetchProfile(setFetchingProfile, setFetchingProfileSuccess, setProfile, false)
            }

            setEditProfileLoading(false);
        }
        catch (err) {

            if (err.response) {
                setEditProfileLoading(false);
                toast(err.response.data.msg, { type: 'error' })
            }
            else {
                setEditProfileLoading(false);
                toast(err.message, { type: 'error' })
            }
        }
    }

    resetPassword = async (
        setCurrentPassword,
        setNewPassword,
        setCPassword,
        setSending,
        data_) => {
        setSending(true)
        try {
            console.log(data_)
            if (!this.hasAccess()) {
                // refresh accesstoken
                await this.refreshToken()

                setTimeout(async () => {
                    const { data } = await axios.put(`${BASE_URL}/auth/reset-password`, data_, {
                        headers: {
                            'authorization-access': `Bearer ${Cookies.get('accesstoken')}`
                        }
                    })
                    toast(data.msg, { type: 'success' })
                })

            } else {
                const { data } = await axios.put(`${BASE_URL}/auth/reset-password`, data_, {
                    headers: {
                        'authorization-access': `Bearer ${Cookies.get('accesstoken')}`,
                    }
                });
                toast(data.msg, { type: 'success' })
            }

            setSending(false);
            setCurrentPassword("")
            setNewPassword("")
            setCPassword("")
        }
        catch (err) {
            setSending(false)

            if (err.response) {
                toast(err.response.data.msg, { type: 'error' })
            }
            else {
                toast(err.message, { type: 'error' })
            }
        }
    }

    toggleAdmin = async (
        setToggleAdminLoading,
        setFetchingUser,
        setFetchingUserSuccess,
        setUser,
        id
    ) => {
        setToggleAdminLoading(true);

        try {
            const { data } = await axios.get(`${BASE_URL}/auth/toggle-admin/${id}`, {
                headers: {
                    'authorization-access': `Bearer ${Cookies.get('accesstoken')}`,
                    'authorization-supperadmin': `Bearer ${Cookies.get('xxxxx1')}`,
                }
            });
            this.fetchUser(setFetchingUser, setFetchingUserSuccess, setUser, id, false);

            setToggleAdminLoading(false);
            toast(data.msg, { type: 'success' })
        }
        catch (err) {

            if (err.response) {
                setToggleAdminLoading(false);
                toast(err.response.data.msg, { type: 'error' })
            }
            else {
                setToggleAdminLoading(false);
                toast(err.message, { type: 'error' })
            }
        }
    }

    toggleAgent = async (
        setToggleAgentLoading,
        setFetchingUser,
        setFetchingUserSuccess,
        setUser,
        id
    ) => {
        setToggleAgentLoading(true);

        try {
            const { data } = await axios.get(`${BASE_URL}/auth/toggle-agent/${id}`, {
                headers: {
                    'authorization-access': `Bearer ${Cookies.get('accesstoken')}`,
                    'authorization-admin': `Bearer ${Cookies.get('xxxxx2')}`,
                }
            });
            this.fetchUser(setFetchingUser, setFetchingUserSuccess, setUser, id, false);

            setToggleAgentLoading(false);
            toast(data.msg, { type: 'success' })
        }
        catch (err) {

            if (err.response) {
                setToggleAgentLoading(false);
                toast(err.response.data.msg, { type: 'error' })
            }
            else {
                setToggleAgentLoading(false);
                toast(err.message, { type: 'error' })
            }
        }
    }

    deleteAccount = async (
        setDeletinguser,
        setUsers,
        id,
        setFetchingUsers,
        setFetchingUsersSuccess,
        router
    ) => {
        setDeletinguser(true);

        try {
            const { data } = await axios.delete(`${BASE_URL}/auth/delete-account/${id}`, {
                headers: {
                    'authorization-access': `Bearer ${Cookies.get('accesstoken')}`,
                    'authorization-supperadmin': `Bearer ${Cookies.get('xxxxx1')}`,
                }
            });
            this.fetchUsers(setFetchingUsers, setFetchingUsersSuccess, setUsers, false);

            setDeletinguser(false);
            toast(data.msg, { type: 'success' })

            //redirect to user list
            setTimeout(() => {
                router.push('/admin/users')
            }, 1000)
        }
        catch (err) {

            if (err.response) {
                setDeletinguser(false);
                toast(err.response.data.msg, { type: 'error' })
            }
            else {
                setDeletinguser(false);
                toast(err.message, { type: 'error' })
            }
        }
    }

    fetchConfig = async (
        setFetchingConfig,
        setFetchingConfigSuccess,
        setConfigData,
        initial
    ) => {
        initial ? setFetchingConfig(true) : ''

        try {
            const { data } = await axios.get(`${BASE_URL}/config`);

            initial ? setFetchingConfig(false) : ''
            setFetchingConfigSuccess(true);

            setConfigData(data.data)
        }
        catch (err) {

            if (err.response) {
                initial ? setFetchingConfig(false) : '';
                setFetchingConfigSuccess(true)
            }
            else {
                initial ? setFetchingConfig(false) : '';
                setFetchingConfigSuccess(true)
            }
        }
    }

    updateEmailPhone = async (
        setUpdatingEmailPhone,
        setFetchingConfig,
        setFetchingConfigSuccess,
        setConfigData,
        inp
    ) => {
        setUpdatingEmailPhone(true)

        try {
            const { data } = await axios.put(`${BASE_URL}/config/update`, { ...inp }, {
                headers: {
                    'authorization-access': `Bearer ${Cookies.get('accesstoken')}`,
                    'authorization-admin': `Bearer ${Cookies.get('xxxxx2')}`,
                }
            });

            // refresh config
            this.fetchConfig(setFetchingConfig, setFetchingConfigSuccess, setConfigData, false);

            setUpdatingEmailPhone(false);
            toast(data.msg, { type: 'success' })
        }
        catch (err) {

            if (err.response) {
                setUpdatingEmailPhone(false);
                toast(err.response.data.msg, { type: 'error' })
            }
            else {
                setUpdatingEmailPhone(false);
                toast(err.message, { type: 'error' })
            }
        }
    }

    fetchProducts = async (
        setFetchingProducts,
        setFetchingProductsSuccess,
        setProductsData,
        initial) => {

        initial ? setFetchingProducts(true) : ''
        try {
            const { data } = await axios.get(`${BASE_URL}/products`, {
                headers: {
                    'authorization-access': `Bearer ${Cookies.get('accesstoken')}`,
                    'authorization-admin': `Bearer ${Cookies.get('xxxxx2')}`,
                }
            });
            setProductsData(data.data)
            initial ? setFetchingProducts(false) : ''
            setFetchingProductsSuccess(true)
        }
        catch (err) {
            initial ? setFetchingProducts(false) : ''

            if (err.response) {
                setFetchingProductsSuccess(false)
            }
            else {
                setFetchingProductsSuccess(false)
            }
        }
    }

    fetchProduct = async (
        setFetchingProduct,
        setFetchingProductSuccess,
        setProduct,
        id,
        initial) => {
        initial ? setFetchingProduct(true) : ''

        try {
            const { data } = await axios.get(`${BASE_URL}/products/${id}`, {
                headers: {
                    'authorization-access': `Bearer ${Cookies.get('accesstoken')}`,
                    'authorization-admin': `Bearer ${Cookies.get('xxxxx2')}`,
                }
            });
            setProduct(data.data);
            initial ? setFetchingProduct(false) : ''
            setFetchingProductSuccess(true)
        }
        catch (err) {

            initial ? setFetchingProduct(false) : ''

            if (err.response) {
                setFetchingProductSuccess(false)
            }
            else {
                setFetchingProductSuccess(false)
            }
        }
    }

    updateProduct = async (
        setFetchingProducts,
        setFetchingProductsSuccess,
        setProductsData,
        setUpdatingProducts,
        setSelectedProduct,
        inp,
        id) => {
        setUpdatingProducts(true)

        try {
            const { data } = await axios.put(`${BASE_URL}/products/${id}`, { ...inp }, {
                headers: {
                    'authorization-access': `Bearer ${Cookies.get('accesstoken')}`,
                    'authorization-admin': `Bearer ${Cookies.get('xxxxx2')}`,
                }
            });
            this.fetchProducts(setFetchingProducts, setFetchingProductsSuccess, setProductsData, false)
            setUpdatingProducts(false)
            toast(data.msg, { type: 'success' });
            setSelectedProduct("")
        }
        catch (err) {

            setUpdatingProducts(false)

            if (err.response) {
                stoast(err.response.data.msg, { type: 'error' })
            }
            else {
                stoast(err.message, { type: 'error' })
            }
        }
    }

    deleteProduct = async (
        setFetchingProducts,
        setFetchingProductsSuccess,
        setProductsData,
        setDeletingProducts,
        id) => {
        setDeletingProducts(true)

        try {
            const { data } = await axios.delete(`${BASE_URL}/products/${id}`, {
                headers: {
                    'authorization-access': `Bearer ${Cookies.get('accesstoken')}`,
                    'authorization-admin': `Bearer ${Cookies.get('xxxxx2')}`,
                }
            });
            this.fetchProducts(setFetchingProducts, setFetchingProductsSuccess, setProductsData, false)
            setDeletingProducts(false)
            toast(data.msg, { type: 'success' })
        }
        catch (err) {

            setDeletingProducts(false)

            if (err.response) {
                stoast(err.response.data.msg, { type: 'error' })
            }
            else {
                stoast(err.message, { type: 'error' })
            }
        }
    }


}



export default apiClass;