import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import BookService from '../services/BookService';

const BookForm = () => {
  const { id } = useParams();
  const isAddMode = !id;
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [categories] = useState([
    'FICTION',
    'NON_FICTION',
    'SCIENCE',
    'HISTORY',
    'BIOGRAPHY',
    'FANTASY',
    'MYSTERY',
    'THRILLER',
    'ROMANCE',
    'TECHNOLOGY',
    'OTHER'
  ]);

  useEffect(() => {
    if (!isAddMode) {
      setLoading(true);
      BookService.getBookById(id)
        .then(response => {
          const book = response.data;
          reset(book);
          setLoading(false);
        })
        .catch(error => {
          setError('Error loading book details. Please try again.');
          setLoading(false);
          console.error('Error loading book:', error);
        });
    }
  }, [isAddMode, id, reset]);

  const onSubmit = data => {
    setLoading(true);
    setError('');

    const bookData = {
      ...data,
      publicationYear: parseInt(data.publicationYear, 10),
      availableCopies: parseInt(data.availableCopies, 10)
    };

    if (isAddMode) {
      BookService.createBook(bookData)
        .then(() => {
          navigate('/books');
        })
        .catch(error => {
          setError('Error creating book. Please try again.');
          setLoading(false);
          console.error('Error creating book:', error);
        });
    } else {
      BookService.updateBook(id, bookData)
        .then(() => {
          navigate('/books');
        })
        .catch(error => {
          setError('Error updating book. Please try again.');
          setLoading(false);
          console.error('Error updating book:', error);
        });
    }
  };

  return (
    <Container className="mt-4">
      <h2>{isAddMode ? 'Add Book' : 'Edit Book'}</h2>
      
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            {...register('title', { required: 'Title is required' })}
            isInvalid={!!errors.title}
          />
          <Form.Control.Feedback type="invalid">
            {errors.title?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            {...register('author', { required: 'Author is required' })}
            isInvalid={!!errors.author}
          />
          <Form.Control.Feedback type="invalid">
            {errors.author?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>ISBN</Form.Label>
          <Form.Control
            type="text"
            {...register('isbn', { 
              maxLength: { value: 20, message: 'ISBN cannot exceed 20 characters' }
            })}
            isInvalid={!!errors.isbn}
          />
          <Form.Control.Feedback type="invalid">
            {errors.isbn?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Publication Year</Form.Label>
          <Form.Control
            type="number"
            {...register('publicationYear', { 
              required: 'Publication year is required',
              min: { value: 1000, message: 'Year must be at least 1000' },
              max: { value: new Date().getFullYear(), message: `Year cannot exceed ${new Date().getFullYear()}` }
            })}
            isInvalid={!!errors.publicationYear}
          />
          <Form.Control.Feedback type="invalid">
            {errors.publicationYear?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select
            {...register('category', { required: 'Category is required' })}
            isInvalid={!!errors.category}
          >
            <option value="">Select category</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category.replace('_', ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase())}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.category?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Available Copies</Form.Label>
          <Form.Control
            type="number"
            {...register('availableCopies', { 
              required: 'Available copies is required',
              min: { value: 0, message: 'Available copies cannot be negative' }
            })}
            isInvalid={!!errors.availableCopies}
          />
          <Form.Control.Feedback type="invalid">
            {errors.availableCopies?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            {...register('description')}
          />
        </Form.Group>

        <div className="d-flex gap-2">
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? 'Processing...' : (isAddMode ? 'Add Book' : 'Update Book')}
          </Button>
          
          <Button 
            variant="secondary" 
            onClick={() => navigate('/books')}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default BookForm;