import axios from "axios";

const API_URL = "https://opmdata.gem.spc.int/api/auth/";

const register = (first_name, last_name, password, email, roles, country_id) => {
  return axios.post(API_URL + "signup", {
    first_name,
    last_name,
    password,
    email,
    roles,
    country_id
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "signin", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const forgot_password = (email) => {
  return axios
    .post(API_URL + "forgotpassword", {
      email
    })
    .then((response) => {
      return response.data;
    });
};


const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  forgot_password
};

export default AuthService;
