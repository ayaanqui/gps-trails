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
  search: `${base_url}search`, // GET,
  reviews: `${base_url}reviews/` // GET, POST, GET with park id
}

export const mapboxApiKey = 'pk.eyJ1IjoiYXlhYW5xdWkiLCJhIjoiY2tsNnRheWQ5MmVibzJvdWk3azJ0dm92ciJ9.Jt8MpRok1WY9aV3Yf26gRQ'

export default api