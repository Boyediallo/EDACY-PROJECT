import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Container, Table, Button, Form, Row, Col, Spinner, Alert } from 'react-bootstrap';
import BookService from '../services/BookService';
import { AuthContext } from '../context/AuthContext';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('title');
  const { currentUser } = useContext(AuthContext);
  const isAdmin = currentUser?.roles.includes('ROLE_ADMIN');

  const fetchBooks = () => {
    setLoading(true);
    BookService.getAllBooks()
      .then(response => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching books. Please try again later.');
        setLoading(false);
        console.error('Error fetching books:', error);
      });
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      BookService.deleteBook(id)
        .then(() => {
          fetchBooks();
        })
        .catch(error => {
          setError('Error deleting book. Please try again.');
          console.error('Error deleting book:', error);
        });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (!searchTerm.trim()) {
      fetchBooks();
      return;
    }

    let searchPromise;
    
    switch (searchBy) {
      case 'title':
        searchPromise = BookService.searchBooksByTitle(searchTerm);
        break;
      case 'author':
        searchPromise = BookService.searchBooksByAuthor(searchTerm);
        break;
      case 'category':
        searchPromise = BookService.searchBooksByCategory(searchTerm.toUpperCase());
        break;
      default:
        searchPromise = BookService.searchBooksByTitle(searchTerm);
    }

    searchPromise
      .then(response => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error searching books. Please try again.');
        setLoading(false);
        console.error('Error searching books:', error);
      });
  };

  const resetSearch = () => {
    setSearchTerm('');
    fetchBooks();
  };

  const filteredBooks = books.filter(book => {
    const searchTermLower = searchTerm.toLowerCase();
    
    switch (searchBy) {
      case 'title':
        return book.title.toLowerCase().includes(searchTermLower);
      case 'author':
        return book.author.toLowerCase().includes(searchTermLower);
      case 'category':
        return book.category.toLowerCase().includes(searchTermLower);
      default:
        return true;
    }
  });

  return (
    <Container className="mt-4">
      <h2>Book List</h2>
      
      <Row className="mb-3">
        <Col md={12}>
          <Form onSubmit={handleSearch} className="d-flex">
            <Form.Select 
              className="me-2" 
              style={{ width: '150px' }}
              value={searchBy}
              onChange={(e) => setSearchBy(e.target.value)}
            >
              <option value="title">Title</option>
              <option value="author">Author</option>
              <option value="category">Category</option>
            </Form.Select>
            <Form.Control
              type="text"
              placeholder="Search books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="me-2"
            />
            <Button type="submit" variant="primary" className="me-2">Search</Button>
            <Button variant="secondary" onClick={resetSearch}>Reset</Button>
          </Form>
        </Col>
      </Row>

      <div className="mb-3">
        <Link to="/books/add" className="btn btn-success">
          Add New Book
        </Link>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Year</th>
              <th>Available Copies</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.length > 0 ? (
              books.map((book) => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.category}</td>
                  <td>{book.publicationYear}</td>
                  <td>{book.availableCopies}</td>
                  <td>
                    <Link to={`/books/${book.id}`} className="btn btn-info btn-sm me-2">
                      View
                    </Link>
                    <Link to={`/books/edit/${book.id}`} className="btn btn-primary btn-sm me-2">
                      Edit
                    </Link>
                    {isAdmin && (
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(book.id)}
                      >
                        Delete
                      </Button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No books found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default BookList;