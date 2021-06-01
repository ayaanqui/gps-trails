const base_url = 'http://localhost:3001/'

const api = {
  base: base_url,
  parks: `${base_url}parks/`, // GET, POST, UPDATE, DELETE
  trails: `${base_url}parks/`, // GET, POST, UPDATE, DELETE
  login: `${base_url}auth/login/`, // POST
  verify: `${base_url}auth/verify/`, // GET
  checkEmail: `${base_url}auth/check-email`, // POST
  register: `${base_url}register/`, // POST
  static: `${base_url}static/`,
}

export default api