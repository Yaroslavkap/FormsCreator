import axios from 'axios';
import { getAccessToken, getRefToken } from '../store/auth/actionCreator';
import { logoutSuccess } from '../store/auth/authReducer';
import { store } from '../store';

// const source = "http://127.0.0.1:8000/"
// const source = "https://kvakywka.pythonanywhere.com/"
const source = "http://51.250.94.163:8000/"

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
            const response = await axios.get(`${source}show_votings/${id}/`, config);
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
            const response = await axios.get(`${source}/update/voting/${id}/`, config);
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
            const response = await axios.post(`${source}create/voting/`, forms, config);
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
            const response = await axios.put(`${source}update/voting/${id}/`, form, config);
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
            const response = await axios.delete(`${source}delete/voting/${id}/`, config);
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
            const response = await axios.post(`${source}api/logout/`, refObj, config);
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
            const response = await axios.get(`${source}api/response-voting/${id}/`, config);
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
            const response = await axios.post(`${source}api/answer-voting/${id}/`, answer, config);
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async getStat(id) {
        const accessToken = await store.dispatch(getAccessToken())
        //console.log(accessToken)
    
        const config = {
            headers: {
                'authorization': `Bearer ${accessToken}`
            }
        };
    
        try {
            const response = await axios.get(`${source}api/poll-statistic/${id}/`, config);
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async addLogic(logic, id) {
        const accessToken = await store.dispatch(getAccessToken());
        //console.log(accessToken);
    
        const config = {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        };
    
        try {
            const response = await axios.patch(`${source}api/add_logic/${id}/`, logic, config);
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async register(post) {
        // const accessToken = await store.dispatch(getAccessToken())
        // //console.log(accessToken)
    
        // const config = {
        //     headers: {
        //         'authorization': `Bearer ${accessToken}`
        //     }
        // };
    
        try {
            const response = await axios.post(`${source}api/register/`, post);
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async checkToken() {
        const accessToken = await store.dispatch(getAccessToken())
        //console.log(accessToken)
    
        const config = {
            headers: {
                'authorization': `Bearer ${accessToken}`
            }
        };
    
        try {
            const response = await axios.get(`${source}api/token/validate/`, config);
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async makePublic(sub, id) {
        const accessToken = await store.dispatch(getAccessToken());
        //console.log(accessToken);
    
        const config = {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        };
    
        try {
            const response = await axios.patch(`${source}api/submit/${id}/`, sub, config);
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async exportStatistic(id) {
        const accessToken = await store.dispatch(getAccessToken());
        //console.log(accessToken);
    
        const config = {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        };
    
        try {
            const response = await axios.get(`${source}api/export-votes/${id}/`, config);
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    // static async exportStatistic(id) {
    //     try {
    //       const accessToken = await store.dispatch(getAccessToken());
    //       const config = {
    //         headers: {
    //           'Authorization': `Bearer ${accessToken}`
    //         }
    //       };
    //       const response = await axios.get(`${source}api/export-votes/${id}/`, config);
    //       const blob = await response.data;
    //       const url = window.URL.createObjectURL(blob);
    //       const link = document.createElement('a');
    //       link.href = url;
    //       link.setAttribute('download', 'statistics.xlsx');
    //       document.body.appendChild(link);
    //       link.click();
    //       link.parentNode.removeChild(link);
    //     } catch (error) {
    //       console.error('Error exporting statistics:', error);
    //     }
    //   };
      

 
}


