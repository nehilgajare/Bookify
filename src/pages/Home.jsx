import React, { useState, useEffect } from "react";
import { useFirebase } from "../context/Firebase";
import BookCard from "../components/Card";
import { Container, Row, Col } from "react-bootstrap";

const HomePage = () => {
  const firebase = useFirebase();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    firebase.listAllBooks().then((books) => setBooks(books.docs));
  }, [firebase]);

  return (
    <div className="bg-gray-400 min-h-screen py-10">
      <div className="container mx-auto flex justify-center">
        <Container>
          <Row>
            {books.map((book) => (
              <Col sm={12} md={6} lg={4} key={book.id} className="flex justify-center">
                <BookCard link={`/book/view/${book.id}`} {...book.data()} />
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default HomePage;
