import React, { useContext } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <Container className="mt-4">
      <div className="jumbotron p-4 bg-light rounded-3 mb-4">
        <h1>Welcome to the Library Management System</h1>
        <p className="lead">
          This application allows you to manage books in a library catalog.
        </p>
        {!currentUser && (
          <p>
            <Link to="/login" className="btn btn-primary me-2">
              Login
            </Link>
            <Link to="/register" className="btn btn-success">
              Sign Up
            </Link>
          </p>
        )}
      </div>

      <Row>
        <Col md={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Manage Books</Card.Title>
              <Card.Text>
                Browse, add, edit, and remove books from the library collection.
              </Card.Text>
              {currentUser ? (
                <Link to="/books" className="btn btn-primary">
                  View Books
                </Link>
              ) : (
                <Button variant="secondary" disabled>
                  Login to Access
                </Button>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Search Books</Card.Title>
              <Card.Text>
                Search for books by title, author, or category.
              </Card.Text>
              {currentUser ? (
                <Link to="/books" className="btn btn-primary">
                  Search Books
                </Link>
              ) : (
                <Button variant="secondary" disabled>
                  Login to Access
                </Button>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>User Profile</Card.Title>
              <Card.Text>
                View and manage your profile information.
              </Card.Text>
              {currentUser ? (
                <Link to="/profile" className="btn btn-primary">
                  View Profile
                </Link>
              ) : (
                <Button variant="secondary" disabled>
                  Login to Access
                </Button>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;