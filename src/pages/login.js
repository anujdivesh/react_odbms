import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from "react-bootstrap";
import "../css/login.css";
import AuthService from "../services/auth.service";
import BackgroundImage from "../assets/images/oceanpic3.jpg";
import Logo from "../assets/images/spclogo.png";

const Login = () => {
  let navigate = useNavigate();
    const [inputUsername, setInputUsername] = useState("");
    const [inputPassword, setInputPassword] = useState("");
  
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      setLoading(true);
     await delay(500);
      console.log(`Username :${inputUsername}, Password :${inputPassword}`);
      AuthService.login(inputUsername, inputPassword).then(
        () => {
          console.log('success')
       //   navigate("/oceandata");
         // window.location.reload();
        },
        (error) => {
          console.log(error)
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
        //  setMessage(resMessage);
        }
      );

    //  if (inputUsername !== "admin" || inputPassword !== "admin") {
    //    setShow(true);
    //  }
      setLoading(false);
    };
  
    const handlePassword = () => {};
  
    function delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
  
    return (
     
         <main id="bodyWrapper">
        <div id="mapWrapper">
        <div id="map33">
        <div
        className="sign-in__wrapper"
        style={{ backgroundImage: `url(${BackgroundImage})` }}
      >
        {/* Overlay */}
        <div className="sign-in__backdrop"></div>
        {/* Form */}
        <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit} o>
          {/* Header */}
          <img
            className="img-thumbnail mx-auto d-block mb-2"
            src={Logo}
            alt="logo"
          />
          <div className="h4 mb-2 text-center">Sign In</div>
          {/* ALert */}
          {show ? (
            <Alert
              className="mb-2"
              variant="danger"
              onClose={() => setShow(false)}
              dismissible
            >
              Incorrect username or password.
            </Alert>
          ) : (
            <div />
          )}
          <Form.Group className="mb-2" controlId="username" style={{textAlign:'left'}}>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={inputUsername}
              placeholder="Username"
              onChange={(e) => setInputUsername(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="password" style={{textAlign:'left'}}>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={inputPassword}
              placeholder="Password"
              onChange={(e) => setInputPassword(e.target.value)}
              required
            />
          </Form.Group>
          {!loading ? (
            <Button className="w-100" variant="primary" type="submit">
              Log In
            </Button>
          ) : (
            <Button className="w-100" variant="primary" type="submit" disabled>
              Logging In...
            </Button>
          )}
          <div className="d-grid justify-content-end">
            <Button
              className="text-muted px-0"
              variant="link"
              onClick={handlePassword}
            >
              Forgot password?
            </Button>
          </div>
        </Form>
        {/* Footer */}
      
        </div>
        <div className="w-100 mb-2 position-absolute bottom-0 start-50 translate-middle-x text-white text-center">
          Pacific Community (SPC)| &copy;2024
        </div>
      </div>
      </div>
      </main>
    );
}

export default Login;