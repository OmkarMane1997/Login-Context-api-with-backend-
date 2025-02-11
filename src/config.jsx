const API_BASE_URL = 'https://api.escuelajs.co/api/v1';

const CONFIG = {
  LOGIN_ENDPOINT: `${API_BASE_URL}/auth/login`,
  PASSWORD_RESET: `${API_BASE_URL}/users/is-available`,
  SIGNUP_ENDPOINT: `${API_BASE_URL}/auth/signup`,
  CHECK_THE_EMAIL: `${API_BASE_URL}/users/is-available`,
  CREATE_USER_NEW: `https://api.escuelajs.co/api/v1/users/`,
  PROFILE_USER: `${API_BASE_URL}/auth/profile`,
  REFRESH_TOKEN: `${API_BASE_URL}auth/refresh-token`,
  GET_ALL_USERS: `${API_BASE_URL}/users`,
  GET_ALL_PRODUCTS: `${API_BASE_URL}/products`,
  TIMEOUT: 3000,
};

export default CONFIG;
