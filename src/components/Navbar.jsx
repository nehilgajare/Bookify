import React from "react";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useFirebase } from "../context/Firebase";

const MyNavbar = () => {
  const firebase = useFirebase();
  const sigNout = () => {
    alert("Logout successfull")
    firebase.sigNOut();
  }

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">Bookify</Navbar.Brand>
        <Nav className="me-auto">
          {!firebase.isLoggedIn && (
            <><Nav.Link href="/login">Login</Nav.Link><Nav.Link href="/register">Register</Nav.Link></>
          )}
          
          <Nav.Link href="/book/list">Add Listings</Nav.Link>
          <Nav.Link href="/book/orders">Orders</Nav.Link>

        </Nav>
        {
          firebase.isLoggedIn && (
            <Button onClick={sigNout} variant="primary" type="button">
              Logout
            </Button>
          )
        }

      </Container>
    </Navbar>
  )
}

export default MyNavbar;