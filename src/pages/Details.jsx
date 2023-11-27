import React from 'react'
import Button from 'react-bootstrap/Button';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useFirebase } from '../context/Firebase';
import { useState } from 'react';
const BookDetailPage = () => {
    const params = useParams();
    const firebase = useFirebase();
    const [data,setData] = useState(null);
    const [url,setURL] = useState(null);
    console.log(data)
    useEffect(()=>{
        firebase.getBookById(params.bookId).then(value => setData(value.data()))
    },[])
    useEffect(()=>{
        if(data){
            const imageUrl = data.imageURL
            firebase.getImageURL(imageUrl).then(url => setURL(url))
        }
    },[data])
    if(data==null) return <h1>Loading...</h1>
  return <div className='container mt-5'>
      <h1>{data.name}</h1>
      <img src={url} width="50%" style={{borderRadius:"10px"}}/>
      <h1>Details:</h1>
      <p>Price Rs. {data.price}</p>
      <p>ISBN No. {data.isbn}</p>
      <h1>Owner Details:</h1>
      <p>Name: {data.displayName}</p>
      <p>Email id: {data.userEmail}</p>
      <Button variant='success'>Buy Now</Button>
  </div>
  
}

export default BookDetailPage