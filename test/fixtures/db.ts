const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
import axios from 'axios';
import CircularJSON from "circular-json";

const userOne = {
    _id: "62f66f48cff3443f90e3cd90",
    tel: '906790008',
    password: '123456#',
    name: "Tamila Karimova",
    role: "admin"
}
const handle_axios_error = function(err: any) {

	if (err.response) {
		const custom_error: any = new Error(err.response.statusText || 'Internal server error');
		custom_error.status = err.response.status || 500;
		custom_error.description = err.response.data ? err.response.data.message : null;
		throw custom_error;
	}

}

const loginToken = async () => {
    axios.interceptors.response.use(r => r, handle_axios_error);
    let token: string | undefined = undefined;
    const response = await axios.post(`http://${process.env.APP_PATH}:${process.env.PORT}/api/auth/login`, {
        "tel": userOne.tel,
        "password": userOne.password
    });
    token = response.data.token;
    return token;
}

export { userOne, loginToken }