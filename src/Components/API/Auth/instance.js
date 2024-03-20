import axios from "axios";
import EndPoints from "./endPoints";
import { getAccessToken } from "../../store/auth/actionCreator";
import { store } from "../../store";
import { logoutUser } from "../../store/auth/actionCreator";

export const axiosInstance = axios.create()

const urlsSkipAuth = [EndPoints.AUTH.Login]

axiosInstance.interceptors.request.use(async (config) => {
    if (config.url && urlsSkipAuth.includes(config.url)) {
        return config
    }

    const accessToken = await store.dispatch(getAccessToken())

    if (accessToken) {
        const autharization = `Bearer ${accessToken}`

        config.headers = {
            ...config.headers,
            authorization: autharization
        }
    }

    return config
})

///////
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const isLoggedIn = !!store.getState().auth.authData.accessToken
  
        if ((error.response?.status === 401) && isLoggedIn && error.request.url !== EndPoints.AUTH.Logout) {
            store.dispatch(logoutUser())
        }
  
        throw error
    }
  )