import React from "react";
import { useFirebase } from "../context/Firebase";
import { useEffect } from "react";
import { useState } from "react";
import BookCard from "../components/Card";
import { Container, Row, Col, CardGroup } from 'react-bootstrap';

const HomePage = () => {
    const firebase = useFirebase();
    const [books, setBooks] = useState([]);

    useEffect(() => {
        firebase.listAllBooks().then((books) => setBooks(books.docs))
    })
    return <div className="container mt-5 justify-content-center">
        <Container>
            <Row>
                {books.map((book) => (
                    <Col sm={2} md={5} key={book.id}>
                        <BookCard link={`/book/view/${book.id}`} {...book.data()} />
                    </Col>
                ))}
            </Row>
        </Container>
    </div>;

}
export default HomePage;