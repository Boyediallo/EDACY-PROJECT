import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Card, Button, Spinner, Alert } from 'react-bootstrap';
import BookService from '../services/BookService';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    BookService.getBookById(id)
      .then(response => {
        setBook(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error loading book details. Please try again.');
        setLoading(false);
        console.error('Error loading book:', error);
      });
  }, [id]);

  const formatCategory = (category) => {
    if (!category) return '';
    return category.replace('_', ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
  };

  if (loading) {
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error}</Alert>
        <Button variant="primary" onClick={() => navigate('/books')}>
          Back to Book List
        </Button>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header as="h3">{book.title}</Card.Header>
        <Card.Body>
          <Card.Title>by {book.author}</Card.Title>
          <Card.Text>
            <strong>ISBN:</strong> {book.isbn || 'N/A'}
          </Card.Text>
          <Card.Text>
            <strong>Publication Year:</strong> {book.publicationYear}
          </Card.Text>
          <Card.Text>
            <strong>Category:</strong> {formatCategory(book.category)}
          </Card.Text>
          <Card.Text>
            <strong>Available Copies:</strong> {book.availableCopies}
          </Card.Text>
          <Card.Text>
            <strong>Added By:</strong> {book.addedBy || 'N/A'}
          </Card.Text>
          {book.description && (
            <Card.Text>
              <strong>Description:</strong><br />
              {book.description}
            </Card.Text>
          )}
          <div className="d-flex gap-2 mt-3">
            <Link to={`/books/edit/${book.id}`} className="btn btn-primary">
              Edit
            </Link>
            <Button variant="secondary" onClick={() => navigate('/books')}>
              Back to Book List
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BookDetails;