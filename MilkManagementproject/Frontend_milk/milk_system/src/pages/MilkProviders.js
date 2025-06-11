import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Container, Modal, Form } from "react-bootstrap";

const MilkProviders = () => {
    const [providers, setProviders] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("Add Provider");
    const [providerData, setProviderData] = useState({ providerId: "", name: "", address: "", phone: "" });

    useEffect(() => {
        fetchProviders();
    }, []);

    // Fetch Providers
    const fetchProviders = () => {
        axios.get("http://localhost:8080/api/providers")
            .then(response => setProviders(response.data))
            .catch(error => console.error("Error fetching milk providers:", error));
    };

    // Open Modal (for Add/Edit)
    const handleShowModal = (provider = { providerId: "", name: "", address: "", phone: "" }) => {
        setProviderData(provider);
        setModalTitle(provider.providerId ? "Edit Provider" : "Add Provider");
        setShowModal(true);
    };

    // Close Modal
    const handleCloseModal = () => {
        setShowModal(false);
        setProviderData({ providerId: "", name: "", address: "", phone: "" });
    };

    // Handle Input Change
    const handleChange = (e) => {
        setProviderData({ ...providerData, [e.target.name]: e.target.value });
    };

    // Handle Add/Edit
    const handleSubmit = () => {
        if (providerData.providerId) {
            // Update Provider
            axios.put(`http://localhost:8080/api/providers/${providerData.providerId}`, providerData)
                .then(() => {
                    fetchProviders();
                    handleCloseModal();
                })
                .catch(error => console.error("Error updating provider:", error));
        } else {
            // Add New Provider
            axios.post("http://localhost:8080/api/providers", providerData)
                .then(() => {
                    fetchProviders();
                    handleCloseModal();
                })
                .catch(error => console.error("Error adding provider:", error));
        }
    };

    // Handle Delete
    const handleDelete = (providerId) => {
        if (window.confirm("Are you sure you want to delete this provider?")) {
            axios.delete(`http://localhost:8080/api/providers/${providerId}`)
                .then(() => fetchProviders())
                .catch(error => console.error("Error deleting provider:", error));
        }
    };

    return (
        <Container>
            <h1 className="my-4">Milk Providers</h1>
            <Button variant="primary" className="mb-3" onClick={() => handleShowModal()}>
                Add Provider
            </Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {providers.map(provider => (
                        <tr key={provider.providerId}>
                            <td>{provider.providerId}</td>
                            <td>{provider.name}</td>
                            <td>{provider.address}</td>
                            <td>{provider.phone}</td>
                            <td>
                                <Button variant="warning" size="sm" className="me-2" onClick={() => handleShowModal(provider)}>
                                    Edit
                                </Button>
                                <Button variant="danger" size="sm" onClick={() => handleDelete(provider.providerId)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal for Add/Edit Provider */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" value={providerData.name} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" name="address" value={providerData.address} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="text" name="phone" value={providerData.phone} onChange={handleChange} required />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        {providerData.providerId ? "Update" : "Add"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default MilkProviders;
