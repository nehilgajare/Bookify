import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useFirebase } from '../context/Firebase';
import { useState } from 'react';
const BookDetailPage = () => {
    const params = useParams();
    const firebase = useFirebase();
    const [qty, setQty] = useState(1);
    const [data, setData] = useState(null);
    const [url, setURL] = useState(null);
    // console.log(data)
    useEffect(() => {
        firebase.getBookById(params.bookId).then(value => setData(value.data()))
    }, [])
    useEffect(() => {
        if (data) {
            const imageUrl = data.imageURL
            firebase.getImageURL(imageUrl).then(url => setURL(url))
        }
    }, [data])
    const placeOrder = async() => {
        await firebase.placeOrder(params.bookId,qty)
        alert("Order placed")
    }
    if (data == null) return <h1>Loading...</h1>
    return <div className='container mt-5'>
        <h1>{data.name}</h1>
        <img src={url} width="50%" style={{ borderRadius: "10px" }} />
        <h1>Details:</h1>
        <p>Price Rs. {data.price}</p>
        <p>ISBN No. {data.isbn}</p>
        <h1>Owner Details:</h1>
        <p>Name: {data.displayName}</p>
        <p>Email id: {data.userEmail}</p>
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Quantity</Form.Label>
            <Form.Control onChange={e => setQty(e.target.value)} value={qty} type="number" placeholder="Enter Qty" />
        </Form.Group>
        <Button onClick={placeOrder} variant='success'>Buy Now</Button>
    </div>

}

export default BookDetailPage