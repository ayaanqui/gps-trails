const base_url = 'http://localhost:3001/'

const api = {
  base: base_url,
  parks: `${base_url}parks/`, // GET, POST, UPDATE, DELETE
  trails: `${base_url}parks/`, // GET, POST, UPDATE, DELETE
  login: `${base_url}auth/login/`, // POST
  verify: `${base_url}auth/verify/`, // GET
  register: `${base_url}register/` // POST
}

export default api