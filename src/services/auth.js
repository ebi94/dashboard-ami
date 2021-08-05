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

const logout = (data, idMuthowif) => {
    const bodyReq = {
        firstName: data.firstName,
        email: data.email,
        phone: data.phone,
        address: data.address,
    }
    return axios.patch(baseUrl + '/muthowif/' + idMuthowif, bodyReq)
        .then((response) => {
            const data = response && response.data;
            return data;
        })
        .catch((response) => {
            return response;
        });
};

export {
    login,
    logout
}