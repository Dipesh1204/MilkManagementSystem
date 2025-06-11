
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Table, Button, Container } from "react-bootstrap";

// const Customers = () => {
//     const [customers, setCustomers] = useState([]);

//     useEffect(() => {
//         axios.get("http://localhost:8080/api/customers")
//             .then(response => setCustomers(response.data))
//             .catch(error => console.error("Error fetching customers:", error));
//     }, []);

//     return (
//         <Container>
//             <h1 className="my-4">Customers</h1>
//             <Table striped bordered hover>
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Name</th>
//                         <th>Address</th>
//                         <th>Phone</th>
//                         <th>Email</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {customers.map(customer => (
//                         <tr key={customer.customerId}>
//                             <td>{customer.customerId}</td>
//                             <td>{customer.name}</td>
//                             <td>{customer.address}</td>
//                             <td>{customer.phone}</td>
//                             <td>{customer.email}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>
//         </Container>
//     );
// };

// export default Customers;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Container, Modal, Form } from "react-bootstrap";

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("Add Customer");
    const [customerData, setCustomerData] = useState({ customerId: "", name: "", address: "", phone: "", email: "" });

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = () => {
        axios.get("http://localhost:8080/api/customers")
            .then(response => setCustomers(response.data))
            .catch(error => console.error("Error fetching customers:", error));
    };

    const handleShowModal = (customer = { customerId: "", name: "", address: "", phone: "", email: "" }) => {
        setCustomerData(customer);
        setModalTitle(customer.customerId ? "Edit Customer" : "Add Customer");
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setCustomerData({ customerId: "", name: "", address: "", phone: "", email: "" });
    };

    const handleChange = (e) => {
        setCustomerData({ ...customerData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        if (customerData.customerId) {
            // Update Customer
            axios.put(`http://localhost:8080/api/customers/${customerData.customerId}`, customerData)
                .then(() => {
                    fetchCustomers();
                    handleCloseModal();
                })
                .catch(error => console.error("Error updating customer:", error));
        } else {
            // Add New Customer
            axios.post("http://localhost:8080/api/customers", customerData)
                .then(() => {
                    fetchCustomers();
                    handleCloseModal();
                })
                .catch(error => console.error("Error adding customer:", error));
        }
    };

    const handleDelete = (customerId) => {
        if (window.confirm("Are you sure you want to delete this customer?")) {
            axios.delete(`http://localhost:8080/api/customers/${customerId}`)
                .then(() => fetchCustomers())
                .catch(error => console.error("Error deleting customer:", error));
        }
    };

    return (
        <Container>
            <h1 className="my-4">Customers</h1>
            <Button variant="primary" className="mb-3" onClick={() => handleShowModal()}>
                Add Customer
            </Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(customer => (
                        <tr key={customer.customerId}>
                            <td>{customer.customerId}</td>
                            <td>{customer.name}</td>
                            
                            <td>{customer.phone}</td>
                            <td>{customer.email}</td>
                            <td>{customer.address}</td>
                            <td>
                                <Button variant="warning" size="sm" className="me-2" onClick={() => handleShowModal(customer)}>
                                    Edit
                                </Button>
                                <Button variant="danger" size="sm" onClick={() => handleDelete(customer.customerId)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal for Add/Edit Customer */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" value={customerData.name} onChange={handleChange} required />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="text" name="phone" value={customerData.phone} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" value={customerData.email} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" name="address" value={customerData.address} onChange={handleChange} required />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        {customerData.customerId ? "Update" : "Add"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Customers;
