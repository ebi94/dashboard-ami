import axios from "axios";
import swal from "sweetalert";

const baseUrl = process.env.REACT_APP_BACKEND_API;

const login = (params) => {
    return axios.post(baseUrl + '/auth-user', {
        email: params && params.email,
        password: params && params.password
    })
        .then((response) => {
            return { ...response }
        })
        .catch(function (error) {
            console.log('error', error);
        });
};

const logout = () => {
    localStorage.clear()
    window.location.replace("/login");
};

export {
    login,
    logout
}