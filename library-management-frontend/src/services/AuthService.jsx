import axios from "axios";

const API_BASE_URL = "http://localhost:8080";
const API_URL = API_BASE_URL + "/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password, roles = ["user"]) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
      roles
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  isAuthenticated() {
    const user = this.getCurrentUser();
    return !!user;
  }

  hasRole(role) {
    const user = this.getCurrentUser();
    if (!user) return false;
    return user.roles.includes(role);
  }

  isAdmin() {
    return this.hasRole("ROLE_ADMIN");
  }
}

export default new AuthService();