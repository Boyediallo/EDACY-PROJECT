import React, { useContext } from 'react';
import { Container, Card } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header as="h3">User Profile</Card.Header>
        <Card.Body>
          <Card.Title>Profile Info</Card.Title>
          <Card.Text>
            <strong>Username:</strong> {currentUser.username}
          </Card.Text>
          <Card.Text>
            <strong>Email:</strong> {currentUser.email}
          </Card.Text>
          <Card.Text>
            <strong>Roles:</strong>
            <ul>
              {currentUser.roles.map((role, index) => (
                <li key={index}>{role}</li>
              ))}
            </ul>
          </Card.Text>
          <Card.Text>
            <strong>Token:</strong> {currentUser.token.substring(0, 20)} ... {' '}
            {currentUser.token.substring(currentUser.token.length - 20)}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Profile;