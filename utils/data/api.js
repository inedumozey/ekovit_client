import axios from "axios";
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

class apiClass {
    constructor() { }

    setCookies = (
        accesstoken,
        refreshtoken,
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
    }

    setAdminCookies = (
        admintoken
    ) => {
        Cookies.set("admintoken", admintoken, {
            // expires: new Date(new Date().getTime() + 1000 * 60 * 3), // 3 minutes (this is the same time backend accesstoken expires))
            secure: true,
            sameSite: 'strict'
        })
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
                this.setCookies(data.accesstoken, data.refreshtoken)
            }
            catch (err) {
                return
            }
        }
        else {
            window.location.reload();
        }
    }

    adminResetPassword = async (
        data_,
        setCurrentPassword,
        setNewPassword,
        setCPassword,
        setResetingAdminPassword
    ) => {
        try {
            const { data } = await axios.put(`${BASE_URL}/auth/admin/reset-password`, { ...data_ }, {
                headers: {
                    'authorization': `Bearer ${Cookies.get('accesstoken')}`,
                }
            });

            setResetingAdminPassword(false)
            toast(data.msg, { type: 'success' });

            // clear input
            setCurrentPassword("");
            setNewPassword("");
            setCPassword("");

        }
        catch (err) {
            if (err.response) {
                toast(err.response.data.msg, { type: 'error' })
            }
            else {
                toast(err.message, { type: 'error' })
            }

            setResetingAdminPassword(false)
        }
    }
}


export default apiClass;