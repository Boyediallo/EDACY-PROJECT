import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import AuthService from '../services/AuthService';

const Register = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const onSubmit = data => {
    setMessage('');
    setSuccessful(false);

    AuthService.register(data.username, data.email, data.password)
      .then(response => {
        // Si l'inscription réussit, le message sera dans response.data ou response.data.message
        let successMessage = "User registered successfully!";
        if (response.data && typeof response.data === 'object' && response.data.message) {
          successMessage = response.data.message;
        } else if (response.data && typeof response.data === 'string') {
          successMessage = response.data;
        }
        
        setMessage(successMessage);
        setSuccessful(true);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      })
      .catch(error => {
        // Gestion de l'erreur basée sur votre backend
        let errorMessage = "Registration failed!";
        
        if (error.response && error.response.data) {
          if (error.response.data.message) {
            errorMessage = error.response.data.message;
          } else if (error.response.data.localizedMessage) {
            errorMessage = error.response.data.localizedMessage;
          } else if (typeof error.response.data === 'string') {
            errorMessage = error.response.data;
          }
        }
        
        setMessage(errorMessage);
        setSuccessful(false);
      });
  };

  const password = watch('password', '');

  return (
    <Container className="col-md-6 offset-md-3 mt-5">
      <div className="card card-container">
        <h3 className="card-header text-center mb-4">Sign Up</h3>
        <Form onSubmit={handleSubmit(onSubmit)} className="card-body">
          {!successful && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  {...register('username', {
                    required: 'Username is required',
                    minLength: {
                      value: 3,
                      message: 'Username must be at least 3 characters'
                    },
                    maxLength: {
                      value: 20,
                      message: 'Username cannot exceed 20 characters'
                    }
                  })}
                  isInvalid={!!errors.username}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.username?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: 'Email address is invalid'
                    }
                  })}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters'
                    },
                    maxLength: {
                      value: 40,
                      message: 'Password cannot exceed 40 characters'
                    }
                  })}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: value => value === password || 'Passwords do not match'
                  })}
                  isInvalid={!!errors.confirmPassword}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Sign Up
              </Button>
            </>
          )}

          {message && (
            <Alert variant={successful ? 'success' : 'danger'} className="mt-3">
              {message}
            </Alert>
          )}
        </Form>
      </div>
    </Container>
  );
};

export default Register;