import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Container, Navbar as BootstrapNavbar, Nav } from 'react-bootstrap';

function Navbar() {
  const { currentUser, logout } = useAuth();

  return (
    <BootstrapNavbar bg="light" expand="lg">
      <Container>
        <BootstrapNavbar.Brand as={NavLink} to="/">Shipment Delivery</BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            {currentUser && <Nav.Link as={NavLink} to="/new-shipment">New Shipment</Nav.Link>}
            {currentUser && <Nav.Link as={NavLink} to="/track-shipment">Track Shipment</Nav.Link>}
          </Nav>
          <Nav>
            {currentUser ? (
              <Nav.Link onClick={logout}>Logout</Nav.Link>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;
