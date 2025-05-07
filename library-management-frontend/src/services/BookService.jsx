import axios from 'axios';
import authHeader from './AuthHeader';

const API_BASE_URL = "http://localhost:8080";
const API_URL = API_BASE_URL + "/api/books/";

class BookService {
  getAllBooks() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  getBookById(id) {
    return axios.get(API_URL + id, { headers: authHeader() });
  }

  createBook(book) {
    const headers = authHeader();
    console.log("Headers being sent:", headers);
    console.log("Book data being sent:", book);
    return axios.post(API_URL, book, { headers: headers });
  }

  updateBook(id, book) {
    return axios.put(API_URL + id, book, { headers: authHeader() });
  }

  deleteBook(id) {
    return axios.delete(API_URL + id, { headers: authHeader() });
  }

  searchBooksByTitle(title) {
    return axios.get(API_URL + `search/title?title=${encodeURIComponent(title)}`, { headers: authHeader() });
  }

  searchBooksByAuthor(author) {
    return axios.get(API_URL + `search/author?author=${encodeURIComponent(author)}`, { headers: authHeader() });
  }

  searchBooksByCategory(category) {
    return axios.get(API_URL + `search/category?category=${encodeURIComponent(category)}`, { headers: authHeader() });
  }
}

export default new BookService();