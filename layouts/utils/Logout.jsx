import { useContext } from 'react'
import { ContextData } from '../../contextApi/ContextApi';
import { useRouter } from 'next/router';
import apiClass from '../../utils/data/api';
const api = new apiClass()

export default function Logout({ toggleState }) {

    const router = useRouter();
    const { access } = useContext(ContextData)

    return (

        <div>
            {
                access.isLoggedin ?
                    <div style={{ padding: "10px" }} onClick={() => api.logout(router)}>LOGOUT</div> : ""
            }
        </div>
    )
}

