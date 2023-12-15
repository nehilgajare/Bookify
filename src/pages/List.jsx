import React,{useState,useEffect} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from "../context/Firebase";

const ListingPage = () =>{
    const firebase = useFirebase();
    const [name,setName] = useState("");
    const [isbnNumber,setIsbnNumber] = useState("");
    const [price,setPrice] = useState("");
    const [coverPic,setCoverPic] = useState("");
    useEffect(()=>{
        if(firebase.isLoggedIn)
        handleSubmit();
    },[firebase]);
    // console.log(books) 
        if(!firebase.isLoggedIn){
            return <h1>Please Login</h1>
        }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        await firebase.handleCreateNewListing(name,isbnNumber,price,coverPic)
    }
    return(
        <div className="container mt-5"> 
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control onChange={e => setName(e.target.value)} value={name} type="text" placeholder="Book Name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>ISBN Number</Form.Label>
                    <Form.Control onChange={e => setIsbnNumber(e.target.value)} value={isbnNumber} type="text" placeholder="ISBN Number" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Price</Form.Label>
                    <Form.Control onChange={e => setPrice(e.target.value)} value={price} type="text" placeholder="Enter Price" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Cover Pic</Form.Label>
                    <Form.Control onChange={e => setCoverPic(e.target.files[0])} type="file"  />
                </Form.Group>
                
                
                <Button variant="primary" type="submit">
                    Create
                </Button>
            </Form>
           
        </div>
    )
}

export default ListingPage;