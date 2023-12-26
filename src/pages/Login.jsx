import React,{useEffect, useState} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {

    const firebase = useFirebase();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate=useNavigate();
    // console.log(firebase)
    useEffect(()=>{
        if(firebase.isLoggedIn){
            navigate("/")
        }
    },[firebase,navigate])

    const handleSubmit = async(e) => {
        e.preventDefault();
        // console.log("Login in a user")
        await firebase.signInUserWithEmailandPassword(email,password);
        alert("Login Successful ")
    };
    // console.log(firebase)

    return (
        <div className="container mt-5"> 
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onChange={e => setEmail(e.target.value)} value={email} type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder="Password" />
                </Form.Group>
                
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
            <h1 className="mt-5 mb-5">OR</h1>
            <Button variant="danger" onClick={firebase.signInUsingGoogle}>Signin with Google</Button>
            <hr></hr>
            if account is not created yet <a href="/register">Register here</a>
        </div>
    )
}

export default LoginPage;