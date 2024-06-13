import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useFirebase } from "../context/Firebase";
import { useEffect,useState } from "react";
import BookCard from "../components/Card";
const OrdersPage = () => {
    const firebase = useFirebase();
    const [books,setBooks] = useState([]);
    useEffect(()=>{
        if(firebase.isLoggedIn)
        firebase.fetchMyBooks(firebase.user.uid).then((books) => setBooks(books.docs));
    },[firebase]);
    // console.log(books) 
        if(!firebase.isLoggedIn){
            return <h1>Please Login</h1>
        }
    return(
        <div className="bg-gray-500 min-h-screen py-10">
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
    )
}
export default OrdersPage;