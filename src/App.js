import './App.css';
import React, {useEffect, useState} from "react";
import './css/nav.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";
import Home from "./pages/home";
import Add from "./pages/add";
import Search from "./pages/search";
import Login from './pages/login';
import Signup from './pages/signup';
import AuthService from "./services/auth.service";
import EventBus from "./common/EventBus";

function App() {

  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMINEYJHBGCIOIJIUZI1NIISINR5CCI6IKPXVCJ9EYJLBWFPBCI6IM"));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
    
  };

  return (
    <div className="App">
      
      <Router>
            <div>
        <Navbar expand="lg" bg={"navbar navbar-expand-sm navbar-custom"} variant={"dark"} style={{paddingRight:"1%",paddingLeft:"1%"}}>
       
        <Navbar.Brand as={Link} to={"/oceandata"}>
          
          Ocean Data Explorer</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to={"/oceandata"}>Home</Nav.Link>
            {showAdminBoard && (
           <Nav.Link as={Link} to={"/oceandata/add"}>Add</Nav.Link>
          )}

            
           {/*<Nav.Link as={Link} to={"/oceandata/search"}>Request</Nav.Link>*/}
          </Nav>
          {currentUser ? (
             <Form inline="true">
             <Button variant="warning" className="mr-sm-4" as={Link} to={"/oceandata/login"} onClick={logOut}>Logout</Button>
           </Form>
         
        ) : (
          <Form inline="true">
            <Button variant="warning" className="mr-sm-4" as={Link} to={"/oceandata/login"}>Login</Button>&nbsp;
            <Button variant="warning" className="mr-sm-2" as={Link} to={"/oceandata/signup"} >Sign up!</Button>
          </Form>
          )}
        </Navbar.Collapse>
    </Navbar>
            </div>
            <div>

            <Routes>
            <Route path="/oceandata/home" element={<Home/>} />
          <Route path="/oceandata/add" element={<Add/>} />
          <Route path="/oceandata/search" element={<Search/>} />
          <Route path="/oceandata/login" element={<Login/>} />
          <Route path="/oceandata/signup" element={<Signup/>} />
          <Route path="/oceandata" element={<Home />} />
          <Route path="/" element={<Home />} />
        </Routes>
            </div>
  </Router>
    </div>
  );
}

export default App;