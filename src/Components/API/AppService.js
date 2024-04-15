import axios from 'axios';
import { getAccessToken, getRefToken } from '../store/auth/actionCreator';
import { logoutSuccess } from '../store/auth/authReducer';
import { store } from '../store';

export default class AppService {
    
    // static async fetchMyForms() {
    //     try {
    //         const response = await fetch("http://127.0.0.1:8000/show_votings/1/");
    //         if (!response.ok) {
    //             throw new Error('Failed to fetch data')
    //         }
    //         const data = await response.json()
    //         console.log(data)
    //         return data
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }

    // static async getMyForms() {
        
    //     const response = await axios.get("http://127.0.0.1:8000/show_votings/1/")
    //     return response;
    
    // }

    static async getMyForms(id) {
        const accessToken = await store.dispatch(getAccessToken())
        const config = {
            headers: {
                'authorization': `Bearer ${accessToken}`
            }
        };
    
        try {
            const response = await axios.get(`http://127.0.0.1:8000/show_votings/${id}/`, config);
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    // static async getFormById() {
        
    //     const response = await axios.get("http://127.0.0.1:8000/update/voting/2/")
    //     return response;
    
    // }

    static async getFormById(id) {
        const accessToken = await store.dispatch(getAccessToken())
        //console.log(accessToken)
    
        const config = {
            headers: {
                'authorization': `Bearer ${accessToken}`
            }
        };
    
        try {
            const response = await axios.get(`http://127.0.0.1:8000/update/voting/${id}/`, config);
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async PostForm(forms) {
        const accessToken = await store.dispatch(getAccessToken());
        //console.log(accessToken);
    
        const config = {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        };
    
        try {
            const response = await axios.post("http://127.0.0.1:8000/create/voting/", forms, config);
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async UpdateForm(form, id) {
        const accessToken = await store.dispatch(getAccessToken());
        //console.log(accessToken);
    
        const config = {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        };
    
        try {
            const response = await axios.put(`http://127.0.0.1:8000/update/voting/${id}/`, form, config);
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async delFormById(id) {
        const accessToken = await store.dispatch(getAccessToken())
        //console.log(accessToken)
    
        const config = {
            headers: {
                'authorization': `Bearer ${accessToken}`
            }
        };
    
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/delete/voting/${id}/`, config);
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    
    static async logOut() {
        const accessToken = await store.dispatch(getAccessToken())
        const refreshToken = await store.dispatch(getRefToken())
        //console.log(refreshToken)
        const refObj = {"refresh_token": refreshToken}
    
        const config = {
            headers: {
                'authorization': `Bearer ${accessToken}`
            }
        };
    
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/logout/`, refObj, config);
            store.dispatch(logoutSuccess())
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async getFormToAnsById(id) {
        const accessToken = await store.dispatch(getAccessToken())
        //console.log(accessToken)
    
        const config = {
            headers: {
                'authorization': `Bearer ${accessToken}`
            }
        };
    
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/response-voting/${id}/`, config);
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async AnsForm(answer, id) {
        const accessToken = await store.dispatch(getAccessToken());
        //console.log(accessToken);
    
        const config = {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        };
    
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/answer-voting/${id}/`, answer, config);
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
 
}


