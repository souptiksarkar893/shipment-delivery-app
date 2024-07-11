import React from 'react';
import { Container } from 'react-bootstrap';

function Home() {
  return (
    <Container className="mt-5">
      <h1>Welcome to the Shipment Delivery Application</h1>
      <p>Use the navigation bar to register, login, create a new shipment, or track an existing shipment.</p>
    </Container>
  );
}

export default Home;
