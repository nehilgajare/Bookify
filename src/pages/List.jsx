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
        alert("Added book to Listings")
    }
    return(
        <div className="bg-gray-500 min-h-screen py-10">
        <div className="container mt-5"> 
            <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control onChange={e => setName(e.target.value)} value={name} type="text" placeholder="Book Name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicISBN">
                    <Form.Label>ISBN Number</Form.Label>
                    <Form.Control onChange={e => setIsbnNumber(e.target.value)} value={isbnNumber} type="text" placeholder="ISBN Number" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control onChange={e => setPrice(e.target.value)} value={price} type="text" placeholder="Enter Price" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCoverPic">
                    <Form.Label>Cover Pic</Form.Label>
                    <Form.Control onChange={e => setCoverPic(e.target.files[0])} type="file"  />
                </Form.Group>
                
                
                <Button variant="primary" type="submit">
                    Create
                </Button>
            </Form>
            </div>   
        </div>
    )
}

export default ListingPage;