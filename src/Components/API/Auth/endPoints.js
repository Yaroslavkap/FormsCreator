// const source = "http://127.0.0.1:8000/"
// const source = "https://kvakywka.pythonanywhere.com/"
const source = "http://51.250.94.163:8000/"
//

const EndPoints = {
    AUTH: {
        Login: `${source}api/login/`,
        Refresh: "./refresh",
        Logout: `${source}api/logout/`,
        Profile: `${source}api/token/validate/`,
        // MyPage: "http://127.0.0.1:8000/show_votings/1/",

    }
}

export default EndPoints