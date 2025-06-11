// import React from "react";
// import { Navbar, Nav, Container } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// const AppNavbar = () => {
//     return (
//         <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
//             <Container>
//                 <Navbar.Brand as={Link} to="/">
//                     Milk Management
//                 </Navbar.Brand>
//                 <Navbar.Toggle aria-controls="basic-navbar-nav" />
//                 <Navbar.Collapse id="basic-navbar-nav">
//                     <Nav className="ms-auto">
//                         <Nav.Link as={Link} to="/customers">
//                             Customers
//                         </Nav.Link>
//                         <Nav.Link as={Link} to="/providers">
//                             Milk Providers
//                         </Nav.Link>
//                         <Nav.Link as={Link} to="/sales">
//                             Monthly Sales
//                         </Nav.Link>
//                     </Nav>
//                 </Navbar.Collapse>
//             </Container>
//         </Navbar>
//     );
// };

// export default Navbar;


import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function AppNavbar() {
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="pages/MilkRecord">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <br />
            <Navbar bg="primary" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            <br />
            <Navbar bg="light" data-bs-theme="light">
                <Container>
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default Navbar;