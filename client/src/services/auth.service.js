import axios from 'axios';

const API_URL = 'http://localhost:3036/';

class AuthService {
    login(user) {
        return axios
            .post(API_URL + 'login', {
                u_email: user.u_email,
                u_password: user.u_password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem('token', response.data.token);
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
    }

    /*register(user) {
      return axios.post(API_URL + 'signup', {
        username: user.username,
        email: user.email,
        password: user.password
      });
    }*/
}

export default new AuthService();