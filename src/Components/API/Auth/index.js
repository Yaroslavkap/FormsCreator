import EndPoints from "./endPoints";
import { axiosInstance } from "./instance";


export const login = (params) => axiosInstance.post(EndPoints.AUTH.Login, params)

//export const logout = () => axiosInstance.get(EndPoints.AUTH.Logout)
export const logout = () => axiosInstance.post(EndPoints.AUTH.Logout)

export const getProfile = () => axiosInstance.get(EndPoints.AUTH.Profile)

//export const logMyPage = () => axiosInstance.post(EndPoints.AUTH.MyPage)

