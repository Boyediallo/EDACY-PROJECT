import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import AuthService from '../services/AuthService';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = data => {
    setMessage('');
    setLoading(true);

    AuthService.login(data.username, data.password)
      .then(response => {
        setCurrentUser(response);
        navigate('/profile');
      })
      .catch(error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
      });
  };

  return (
    <Container className="col-md-6 offset-md-3 mt-5">
      <div className="card card-container">
        <h3 className="card-header text-center mb-4">Login</h3>
        <Form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              {...register('username', { required: 'Username is required' })}
              isInvalid={!!errors.username}
            />
            <Form.Control.Feedback type="invalid">
              {errors.username?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              {...register('password', { required: 'Password is required' })}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit" disabled={loading} className="w-100">
            {loading ? (
              <span className="spinner-border spinner-border-sm"></span>
            ) : (
              <span>Login</span>
            )}
          </Button>

          {message && (
            <Alert variant="danger" className="mt-3">
              {message}
            </Alert>
          )}
        </Form>
      </div>
    </Container>
  );
};

export default Login;