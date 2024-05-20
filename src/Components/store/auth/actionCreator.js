import { Dispatch } from "@reduxjs/toolkit"
import { loginStart, loginSucess, loginSucessRefresh, idSucess, loginFailure, logoutSuccess,loadProfileStart, loadProfileFailure, loadProfileSucess } from "./authReducer"
import api from "../../API"
import { history } from "../../utils/history"
import { store } from ".."

export const loginUser =
  (data) =>
    async (dispatch) => {
      try {
        dispatch(loginStart())

        const res = await api.auth.login(data)

        //console.log(res.data.access)
        dispatch(loginSucess(res.data.access))
        //dispatch(getProfile())
        dispatch(loginSucessRefresh(res.data.refresh))
        dispatch(idSucess(res.data.user_id))
        
      } catch (e) {
        console.error(e)

        dispatch(loginFailure(e.message))
      }
    }

    export const logoutUser =
  () =>
  async (dispatch) => {
      try {
        await api.auth.logout()

        dispatch(logoutSuccess())

        history.push('/')
      } catch (e) {
          console.error(e)
      }
  }

  export const getAccessToken =
    () =>
    (dispatch) => {
        try {
            const accessToken = store.getState().auth.authData.access

            return accessToken
        } catch (e) {
            console.error(e)

            return null
        }
    }

    export const getRefToken =
    () =>
    (dispatch) => {
        try {
            const accessToken = store.getState().auth.authData.refresh

            return accessToken
        } catch (e) {
            console.error(e)

            return null
        }
    }

    export const getId =
    () =>
    (dispatch) => {
        try {
            const accessToken = store.getState().auth.authData.user_id

            return accessToken
        } catch (e) {
            console.error(e)

            return null
        }
    }

    export const getProfile = () =>
      async (dispatch) => {
        try {
          dispatch(loadProfileStart())
    
          const res = await api.auth.getProfile()
    
          dispatch(loadProfileSucess(res.data))
        } catch (e) {
          console.error(e)
    
          dispatch(loadProfileFailure(e.message))
        }
      }